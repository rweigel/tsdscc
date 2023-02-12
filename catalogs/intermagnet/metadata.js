var cadence = process.argv[2] || "PT1M";

var fs = require('fs');
var zlib = require('zlib');
var xml2js = require('xml2js');

// timecolumns="1,2" timeformat="$Y-$m-$d,$H:$M:$S.$(millis)" urltemplate="" timecolumns="1,2,3,4,5,6" timeformat="$Y,$m,$d,$H,$M,$S" 

var cadencestr1 = "1-minute";
var cadencestr2 = "min";
if (cadence === "PT1S") {
	cadencestr1  = "1-second";
	cadencestr2 = "sec";
}

var list  = fs.readFileSync("catalog_"+cadence+".txt").toString();
var lista = list.split("\n"); // List all

var listi = []; // First file for each magnetometer
var listf = []; // Last file for each magnetometer
var listihead = []; // Header information for each file in listi

// Find first magnetometer file for each file in list
for (var i = 0;i<lista.length;i++) {
    dir = "./data/"+lista[i].split(" ")[0]+"/"+cadence;
    listi[i] = "";
    if (fs.existsSync(dir)) {
		files = fs.readdirSync(dir);
		for (var k = 0;k<files.length;k++) {
			var re = new RegExp("^"+lista[i].split(" ")[0].substr(0,3).toLowerCase());
			if (!files[k].match(re)) {
				if (!files[k].match(/^conditions_of_use\.txt|^log\.txt/)) {
					console.log("Ignoring misplaced file " + dir + "/" + files[k]);
				}
				continue;
			}
			if (files[k].match(/vmin\.min\.gz$|vsec\.sec\.gz$/) && listi[i] == "") {
				// Initial file
				listi[i] = dir+"/"+files[k];
			    listf[i] = dir+"/"+files[k];
			}
			if (files[k].match(/vmin\.min\.gz$|vsec\.sec\.gz$/)) {
				// Final file
				listf[i] = dir+"/"+files[k];
			}
		}
	} else {
		console.log("Directory " + dir + " does not exist (" + lista[i] + ")");
	}
}

//console.log(listi)
//console.log(listf)

// Remove undefined elements.
listi = listi.filter(function(n){return n}); 
listf = listf.filter(function(n){return n}); 

// Extract metadata in first file for each station
unz(0,listi.length);

function unz(i,N) {

	gzipBuffer = fs.readFileSync(listi[i]);
    
    zlib.gunzip(gzipBuffer, function(err, result) {

		process.stdout.write("Extracting info from " + listi[i]);

	    if (err) {
	    	console.log("Problem with " + listi[i]);
			console.error(err);
			return;
	    }

	    var mag = listi[i].replace(/.*\//,"").substring(0,3);
	    var start = listi[i].replace(/.*\//,"").substring(3,11);
	    var start = start.substring(0,4) + "-" + start.substring(4,6) + "-" + start.substring(6,8);
	    var stop = listf[i].replace(/.*\//,"").substring(3,11);
	    var stop = stop.substring(0,4) + "-" + stop.substring(4,6) + "-" + stop.substring(6,8);

	    var file = result.toString().split(/\n|\r\n/);
	    var coordsys = file.filter(function(line){return line.search(/^ Reported/)!=-1;}).join("").replace(" Reported","");
	    var source = file.filter(function(line){return line.search(/^ Source of Data/)!=-1;}).join("").replace(" Source of Data","");
	    var name = file.filter(function(line){return line.search(/^ Station Name/)!=-1;}).join("").replace(" Station Name","");
	    var lat = file.filter(function(line){return line.search(/^ Geodetic Latitude/)!=-1;}).join("").replace(" Geodetic Latitude","");
	    var long = file.filter(function(line){return line.search(/^ Geodetic Longitude/)!=-1;}).join("").replace(" Geodetic Longitude","");
	    var meta = mag + "," + start + "," + stop + "," + coordsys + "," + lat + "," + long + "," + source.replace(",",";") + "," + name.replace(",",";");
	    var line = meta.replace(/\s{2,}|\||^M/g,"");
	    
	    listihead[i] = line.replace(/'/g,"&apos;");
		console.log(" (" + (i+1) + "/" + N+"): "+line);

		if (i < N-1) {
			unz(++i,N);
		} else {
			alttxt(listihead.filter(function(n){return n}));
			//createtsml(listihead.filter(function(n){return n}));
		}

	});
}

function alttxt(list2) {
	var list1 = fs.readFileSync("catalog_"+cadence+".txt").toString();
	var list1 = list1.split("\n");
	var obj1 = {};
	var obj2 = {};
	var str = "";
	for (var i = 0;i<list1.length;i++) {
		obj1[list1[i].split(" ")[0]] = list1[i];
	}
	for (var i = 0;i<list2.length;i++) {
		obj2[list2[i].split(",")[0].toUpperCase()] = list2[i];
	}

	// Change iteration order
	// https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
	var obj1o = {};
	Object.keys(obj1).sort().forEach(function(key) {
	  obj1o[key] = obj1[key];
	});

	for (key in obj1o) {
		if (obj2[key]) {
			str = str + obj1o[key] + " " + obj2[key].split(",")[4] + " " + obj2[key].split(",")[5] + "\n";
			obj1o[key] = obj1o[key].replace(" ",",") + "," + obj2[key];
		}
	}
	console.log(obj1o);
	console.log(str);
	fs.writeFileSync("./paper/catalog_"+cadence+"_info.txt",str);

	var str = "";
	var obj0 = {};
	var list0 = fs.readFileSync("paper/paper.txt").toString();
	var list0 = list0.split("\n");
	for (var i = 0;i<list0.length;i++) {
		key = list0[i].substr(0,3).toUpperCase();
		obj0[key] = list0[i];
		if (obj2[key]) {
			str = str + key + " " + list0[i].substr(3,8) + " " + obj2[key].split(",")[4] + " " + obj2[key].split(",")[5] + "\n";
		}
	}

	console.log(str);
	fs.writeFileSync("./paper/paper2.txt",str);
}

function createtsml (list) {

	var root = {};
	root.catalog = {};
	root.catalog["$"] = {};
	root.catalog["$"]["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
	root.catalog["$"]["id"]          = "INTERMAGNET/"+cadence;
	root.catalog["$"]["name"]        = "INTERMAGNET magnetometer data at " + cadencestr1 + " cadence";

	root.catalog["documentation"] = [];
	root.catalog["documentation"][0] = {};
	root.catalog["documentation"][0]["$"] = {};
	root.catalog["documentation"][0]["$"]["xlink:href"] = "http://intermagnet.org/";
	root.catalog["documentation"][0]["$"]["xlink:title"] = "INTERMAGNET web page";
	
	root.catalog["documentation"][1] = {};
	root.catalog["documentation"][1]["$"] = {};
	root.catalog["documentation"][1]["$"]["xlink:href"] = "http://github.com/tsds/tsds2/tsdscc/catalogs/intermagnet";
	root.catalog["documentation"][1]["$"]["xlink:title"] = "Catalog generation software";

	root.catalog["documentation"][2] = {};
	root.catalog["documentation"][2]["$"] = {};
	root.catalog["documentation"][2]["$"]["xlink:href"] = "/";
	root.catalog["documentation"][2]["$"]["xlink:title"] = "Catalog generation date: "+(new Date()).toISOString();

	root.catalog["documentation"][3] = {};
	root.catalog["documentation"][3]["$"] = {};
	root.catalog["documentation"][3]["$"]["xlink:href"] = "http://intermagnet.org/data-donnee/data-eng.php#conditions";
	root.catalog["documentation"][3]["$"]["xlink:title"] = "Conditions of use and acknowledgement of INTERMAGNET";

	root.catalog["documentation"][4] = {};
	root.catalog["documentation"][4]["$"] = {};
	root.catalog["documentation"][4]["$"]["xlink:href"] = "http://intermagnet.org/data-donnee/data-eng.php#conditions";
	root.catalog["documentation"][4]["$"]["xlink:title"] = "Acknowledgement of INTERMAGNET data providers";

	root.catalog["dataset"] = [];

	for (var i = 0;i < list.length;i++) {

		var iv     = list[i].split(",");
		var MAG    = iv[0].toUpperCase();
		var mag    = iv[0];
		var Start  = iv[1];
		var End    = iv[2];
		var CSYS   = iv[3].toUpperCase();
		var LAT    = iv[4];
		var LON    = iv[5];
		var SOURCE = iv[6];
		var NAME   = iv[7];

		root.catalog["dataset"][i] = {};
		root.catalog["dataset"][i]["$"] = {};
		root.catalog["dataset"][i]["$"]["id"] = MAG;
		root.catalog["dataset"][i]["$"]["name"] = NAME;
		root.catalog["dataset"][i]["$"]["label"] = "Data source institute: " + SOURCE;
		root.catalog["dataset"][i]["$"]["timecolumns"] = "1,2";
		root.catalog["dataset"][i]["$"]["timeformat"] = "$Y-$m-$d,$H:$M:$S.$(millis)";
		root.catalog["dataset"][i]["$"]["urltemplate"] = "mirror:http://www.intermagnet.org/"+MAG+"/"+cadence+"/"+mag+"$Y$m$dv"+cadencestr2+"."+cadencestr2+".gz";
		root.catalog["dataset"][i]["$"]["lineregex"] = "^[0-9]";

		root.catalog["dataset"][i]["documentation"] = [];
		root.catalog["dataset"][i]["documentation"][i] = {};
		root.catalog["dataset"][i]["documentation"][i]["$"] = {};
		root.catalog["dataset"][i]["documentation"][i]["$"]["xlink:href"] = "http://intermagnet.org/imos/imos-list/imos-details-eng.php?iaga_code="+MAG;
		root.catalog["dataset"][i]["documentation"][i]["$"]["xlink:title"] = "Observatory Information";

		root.catalog["dataset"][i]["timeCoverage"] = {};
		root.catalog["dataset"][i]["timeCoverage"]["Start"] = Start;
		root.catalog["dataset"][i]["timeCoverage"]["End"] = End;
		root.catalog["dataset"][i]["timeCoverage"]["Cadence"] = cadence;

		root.catalog["dataset"][i]["groups"] = {};
		root.catalog["dataset"][i]["groups"]["group"] = [];
		root.catalog["dataset"][i]["groups"]["group"][i] = {};
		root.catalog["dataset"][i]["groups"]["group"][i]["$"] = {};
		root.catalog["dataset"][i]["groups"]["group"][i]["$"]["id"] = CSYS.substring(0,3).toUpperCase();
		root.catalog["dataset"][i]["groups"]["group"][i]["$"]["name"] = CSYS.substring(0,3).toUpperCase() + " components";
		root.catalog["dataset"][i]["groups"]["group"][i]["$"]["type"] = "vector";

		root.catalog["dataset"][i]["variables"] = {};
		root.catalog["dataset"][i]["variables"]["variable"] = [];

		root.catalog["dataset"][i]["variables"]["variable"][0] = {};
		root.catalog["dataset"][i]["variables"]["variable"][0]["$"] = {};
		root.catalog["dataset"][i]["variables"]["variable"][0]["$"]["id"] = "DOY";
		root.catalog["dataset"][i]["variables"]["variable"][0]["$"]["name"] = "DOY";
		root.catalog["dataset"][i]["variables"]["variable"][0]["$"]["label"] = "Day of Year";
		root.catalog["dataset"][i]["variables"]["variable"][0]["$"]["type"] = "scalar";
		root.catalog["dataset"][i]["variables"]["variable"][0]["$"]["rendering"] = "%j";
		root.catalog["dataset"][i]["variables"]["variable"][0]["$"]["columns"] = 3;

		var CSYSv = CSYS.split("");

		for (var j = 1;j < CSYSv.length+1;j++) {
			root.catalog["dataset"][i]["variables"]["variable"][j] = {};
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"] = {};
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["id"] = CSYSv[j-1].toUpperCase();
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["name"] = CSYSv[j-1];
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["label"] = MAG + " " + CSYSv[j-1].toUpperCase();
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["units"] = "nT";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["type"] = "scalar";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["fillvalue"] = "99999.00";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["rendering"] = "%.2f";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columns"] = ""+(j+3);
		}

	}
	// Convert JSON object to XML.
	var builder = new xml2js.Builder();
	var xml = builder.buildObject(root);
	fs.writeFileSync('INTERMAGNET_'+cadence+"-tsml.xml",xml);
	console.log("Wrote INTERMAGNET_"+cadence+"-tsml.xml");
}
