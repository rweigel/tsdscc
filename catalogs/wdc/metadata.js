var cadence = process.argv[2] || "PT1M";

var fs = require('fs');
var zlib = require('zlib');
var xml2js = require('xml2js');
var admzip = require('adm-zip');

var cadencestr1 = "1-minute";
var cadencestr2 = "1minval";
var cadencestr3 = "m";
if (cadence === "PT1H") {
	cadencestr1 = "1-hour";
	cadencestr2 = "hourval/single_year";
	cadencestr3 = "";
}

var dir = "ftp.nmh.ac.uk/wdc/obsdata/"+cadencestr2
var url = "ftp://"+dir;

// Get years where data are available for each magnetometer by inspecting directory.
var MAGS = {};
var dir = "./"+dir;
if (fs.existsSync(dir)) {
	files = fs.readdirSync(dir);
	for (var k = 0;k<files.length;k++) { // Loop over directories
		if (files[k].match(/^[0-9]/)) { // Year directory
			console.log(dir+"/"+files[k]);
			files2 = fs.readdirSync(dir+"/"+files[k]);
			for (var k2 = 0;k2<files2.length;k2++) { 
				if (cadence == "PT1H") {
					if (files2[k2].match(/wdc$/)) {
						//if (files2[k2].match(/drv/)) { // for testing metadata creation
							//console.log(dir+"/"+files[k]+"/"+files2[k2]);
							mag = files2[k2].substring(0,3);
							if (!MAGS[mag]) {
								MAGS[mag] = [];
							}
							MAGS[mag].push(files[k])
						//}
					}
				} else {
					if (files2[k2].match(/zip$/)) {
						//if (files2[k2].match(/drv/)) { // for testing metadata creation
							//console.log(dir+"/"+files[k]+"/"+files2[k2]);
							mag = files2[k2].substring(0,3);
							if (!MAGS[mag]) {
								MAGS[mag] = [];
							}
							MAGS[mag].push(files[k])
						//}
					}
				}
			}

		}
	}
}
var STARTS = {};
var STOPS = {};

// Extract start/stop year.
for (var key in MAGS) {

	STARTS[key] = MAGS[key][0];
	STOPS[key]  = MAGS[key][MAGS[key].length-1];

	//console.log(MAGS[key]);	
}

// Extract start/stop month, day and coordinate system information from first and last files for each magnetometer.
STARTS = extractinfo(STARTS,true);
STOPS = extractinfo(STOPS,false);
//console.log(STARTS)
//console.log(STOPS)
// Combine information.
var z = 0;
var info = [];
for (key in STARTS) {
	info[z] = key + "," + STARTS[key] + "," + STOPS[key];
	z = z+1;
}

console.log(info.join("\n"))
createtsml(info);

function extractinfo(LIST,start) {
	for (var key in LIST) {
		if (cadence == "PT1H") {
			fname = dir + "/" + LIST[key] + "/" + key + LIST[key] + ".wdc";
			lines = fs.readFileSync(fname).toString().split("\n");
			if (start) {ln = 0;} else {ln = lines.length-2;}
			month = lines[ln].substring(5,7);
			day = lines[ln].substring(8,10);
			lat = "";
			lon = "";
		} else {
			fname = dir + "/" + LIST[key] + "/" + key + LIST[key] + "m.zip";

			var zip = new admzip(fname);
			console.log("Reading entries in "+fname)
			var zipEntries = zip.getEntries();

			if (start) {en = 0;} else {en = zipEntries.length-2;}

			lines = zipEntries[en].getData().toString('utf8').split("\n");
			month =	zipEntries[en].entryName.substring(5,7);
			day   = lines[en].substring(16,18);

			if (start) {ln = 0;} else {ln = lines.length-2;}

			lat = lines[ln].substring(0,6);
			lon = lines[ln].substring(6,12);
		}

		var COMPS = {};

		for (var i = 0;i<lines.length;i++) {
			//if (lines[i].match(/^[0-9]|^[A-Z]/)) {
				if (cadence == "PT1H") {
					comp = lines[i].substring(7,8);	
					if (comp.match("N")) {
						console.log(lines[i]);
					}
				} else {
					comp = lines[i].substring(18,19);				
				}
				if (comp.match(/[A-Z]/))
					COMPS[comp] = true;
			//}
		}
		comps = "";
		for (keyc in COMPS) {
			comps = comps + keyc;		
		}

		month = month.replace(/ ([0-9])/,'0$1')
		day = day.replace(/ ([0-9])/,'0$1')

		LIST[key] = LIST[key] + "-" + month + "-" + day + "," + comps + "," + lat + "," + lon;

	}
	return LIST;
}

function createtsml(list) {

	// http://stackoverflow.com/a/15912608
	function arrayUnique(array) {
	    var a = array.concat();
	    for(var i=0; i<a.length; ++i) {
	        for(var j=i+1; j<a.length; ++j) {
	            if(a[i] === a[j])
	                a.splice(j--, 1);
	        }
	    }

	    return a;
	}

	var root = {};
	root.catalog = {};
	root.catalog["$"] = {};
	root.catalog["$"]["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
	root.catalog["$"]["id"]          = "WDC/"+cadence;
	root.catalog["$"]["name"]        = "WDC magnetometer data at " + cadencestr1 + " cadence";

	root.catalog["documentation"] = [];
	root.catalog["documentation"][0] = {};
	root.catalog["documentation"][0]["$"] = {};
	root.catalog["documentation"][0]["$"]["xlink:href"] = "http://www.wdc.bgs.ac.uk/catalog/master.html";
	root.catalog["documentation"][0]["$"]["xlink:title"] = "WDC master catalog web page";
	
	root.catalog["documentation"][1] = {};
	root.catalog["documentation"][1]["$"] = {};
	root.catalog["documentation"][1]["$"]["xlink:href"] = "http://github.com/tsds/tsds2/tsdscc/catalogs/wdc";
	root.catalog["documentation"][1]["$"]["xlink:title"] = "Catalog generation software";

	root.catalog["documentation"][2] = {};
	root.catalog["documentation"][2]["$"] = {};
	root.catalog["documentation"][2]["$"]["xlink:href"] = "/";
	root.catalog["documentation"][2]["$"]["xlink:title"] = "Catalog generation date: "+(new Date()).toISOString();

	root.catalog["documentation"][3] = {};
	root.catalog["documentation"][3]["$"] = {};
	root.catalog["documentation"][3]["$"]["xlink:href"] = "http://www.wdc.bgs.ac.uk/catalog/observatory-metadata.html";
	root.catalog["documentation"][3]["$"]["xlink:title"] = "WDC data providers";

	root.catalog["dataset"] = [];


	for (var i = 0;i < list.length;i++) {
		var iv     = list[i].split(",");
		var MAG    = iv[0].toUpperCase();
		var mag    = MAG.toLowerCase();
		var Start  = iv[1];
		var End    = iv[5];
		var CSYS   = iv[2].split('').sort().join(''); // Alphabetical sort
		var CSYS2  = iv[6].split('').sort().join('');

		console.log("Creating tsml for " + list[i])

		if (CSYS !== CSYS2) {
			// Coordinate system may have changed between first and last file.
			// May also have changed in between.
			//console.log("Not creating tsml for " + mag + " because coordinate system changed.")
			console.log(mag + " coordinate system changed from " + CSYS + " to " + CSYS2)
			//console.log(CSYS)
			//console.log(CSYS2)
			var CSYS = arrayUnique(CSYS.split("").concat(CSYS2.split(""))).join("")
			//continue;
		}
		var found = false;
		for (var z = 0; z < CSYS.split("").length; z++) {
  			if (CSYS[z] === "N") {
    			found = true;
    			break
  			}
		}
		if (found) {
  			console.log("Ignoring data from " + mag + " because it contains N as a component.")
  			continue;
		}
		var LAT = iv[3];
		if (LAT.match("-99990")) {
			LAT = iv[7];
		}
		if (LAT.match("-99990")) {
			LAT = "";
		} else {
			LAT = parseInt(LAT)/1000;
		}

		var LON = iv[4];
		if (LON.match("-99999")) {
			LON = iv[8];
		}
		if (LON.match("-99999")) {
			LON = "";
		} else {
			LON = parseInt(LON)/1000;
		}

		var SOURCE = url + "/" + End.substring(0,4) + "/" + mag + ".ack";

		ack = dir + "/" + End.substring(0,4) + "/" + mag + ".ack";
		if (fs.existsSync(ack)) {
			data = fs.readFileSync(ack).toString().split("\n");
			//console.log(data[0])
			NAME = data[0].replace(/:.*\r|:.*$/,"");
		} else {
			console.log("Could not find " + ack);
			ack = dir + "/" + Start.substring(0,4)+"/"+mag+".ack";
			if (fs.existsSync(ack)) {
				data = fs.readFileSync(ack).toString().split("\n");
				//console.log(data[0])
				NAME = data[0].replace(/:.*\r|:.*$/,"");				
			} else {
				console.log("Could not find "+ack);
			}
			var NAME   = MAG;			
		}


		root.catalog["dataset"][i] = {};
		root.catalog["dataset"][i]["$"] = {};
		root.catalog["dataset"][i]["$"]["id"] = MAG;
		root.catalog["dataset"][i]["$"]["name"] = NAME;
		//root.catalog["dataset"][i]["$"]["label"] = "Data source institute: " + SOURCE;
		root.catalog["dataset"][i]["$"]["timecolumns"] = "1";
		root.catalog["dataset"][i]["$"]["timeformat"] = "$Y-$m-$dT$H:$M:$S";
		if (cadence == "PT1H") {
			root.catalog["dataset"][i]["$"]["urltemplate"] = "mirror:"+url+"/$Y/"+mag+"$Y"+cadencestr3+".wdc";
			root.catalog["dataset"][i]["$"]["urlprocessor"]='wdchr';
		} else {
			root.catalog["dataset"][i]["$"]["urltemplate"] = "mirror:"+url+"/$Y/"+mag+"$Y$m"+cadencestr3+".zip";
			root.catalog["dataset"][i]["$"]["urlprocessor"]='wdcmn';
		}

		root.catalog["dataset"][i]["documentation"] = [];
		root.catalog["dataset"][i]["documentation"][i] = {};
		root.catalog["dataset"][i]["documentation"][i]["$"] = {};
		root.catalog["dataset"][i]["documentation"][i]["$"]["xlink:href"] = SOURCE;
		root.catalog["dataset"][i]["documentation"][i]["$"]["xlink:title"] = "Observatory Acknowledgement Information";

		root.catalog["dataset"][i]["timeCoverage"] = {};
		root.catalog["dataset"][i]["timeCoverage"]["Start"] = Start;
		root.catalog["dataset"][i]["timeCoverage"]["End"] = End;
		root.catalog["dataset"][i]["timeCoverage"]["Cadence"] = cadence;

		if (0) {
			if (CSYS.substring(0,3).match("XYZ")) {
				root.catalog["dataset"][i]["groups"] = {};
				root.catalog["dataset"][i]["groups"]["group"] = [];
				root.catalog["dataset"][i]["groups"]["group"][i] = {};
				root.catalog["dataset"][i]["groups"]["group"][i]["$"] = {};
				root.catalog["dataset"][i]["groups"]["group"][i]["$"]["id"] = CSYS.substring(0,3).toUpperCase();
				root.catalog["dataset"][i]["groups"]["group"][i]["$"]["name"] = CSYS.substring(0,3).toUpperCase() + " components";
				root.catalog["dataset"][i]["groups"]["group"][i]["$"]["type"] = "vector";
			}
		}

		root.catalog["dataset"][i]["variables"] = {};
		root.catalog["dataset"][i]["variables"]["variable"] = [];

		root.catalog["dataset"][i]["variables"]["variable"][0] = {};
		root.catalog["dataset"][i]["variables"]["variable"][0]["$"] = {};
		root.catalog["dataset"][i]["variables"]["variable"][0]["$"]["id"] = "Time";
		root.catalog["dataset"][i]["variables"]["variable"][0]["$"]["name"] = "Time";
		root.catalog["dataset"][i]["variables"]["variable"][0]["$"]["label"] = "Time";
		root.catalog["dataset"][i]["variables"]["variable"][0]["$"]["type"] = "scalar";
		root.catalog["dataset"][i]["variables"]["variable"][0]["$"]["columns"] = 1;

		var CSYSv = CSYS.split("");
		for (var j = 0;j < CSYSv.length;j++) {
			root.catalog["dataset"][i]["variables"]["variable"][j] = {};
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"] = {};
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["id"] = CSYSv[j].toUpperCase();
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["name"] = CSYSv[j];
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["label"] = MAG + " " + CSYSv[j].toUpperCase();
			if ((CSYSv[j] == "D") || (CSYSv[j] == "I")) {
				root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["units"] = "tenth-minutes";
			} else {
				root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["units"] = "nT";
			}
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["type"] = "scalar";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["fillvalue"] = "999999";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["rendering"] = "%d";
			if (CSYSv[j] === "X")
				root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columns"] = "2"
			if (CSYSv[j] === "Y")
				root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columns"] = "3"
			if (CSYSv[j] === "Z")
				root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columns"] = "4"
			if (CSYSv[j] === "F")
				root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columns"] = "5"
			if (CSYSv[j] === "H")
				root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columns"] = "6"
			if (CSYSv[j] === "D")
				root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columns"] = "7"
			if (CSYSv[j] === "I")
				root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columns"] = "I"

		}

	}
	// Convert JSON object to XML.
	var builder = new xml2js.Builder();
	var xml = builder.buildObject(root);
	fs.writeFileSync('WDC_'+cadence+"-tsml.xml",xml);
	console.log("Wrote WDC_"+cadence+"-tsml.xml");
}
