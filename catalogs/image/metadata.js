var proccesed = "./data/space.fmi.fi/";

var fs     = require('fs');
var xml2js = require('xml2js');

dirs = fs.readdirSync(proccesed);

var CADENCES = ["PT10S","PT20S","PT1M"];
for (var k = 0;k < 3;k++) {
	var cadence = CADENCES[k]
	var list = [];
	for (var i = 0;i<dirs.length;i++) {
		if (fs.existsSync(proccesed+dirs[i]+"/"+cadence)) {
			files = fs.readdirSync(proccesed+dirs[i]+"/"+cadence);
			list[i] = [dirs[i],files[0].substring(0,8),files[files.length-1].substring(0,8),'XYZ'];
		}
	}

	// Remove empty elements
	list = list.filter(function(n){ return n != undefined });

	// Info from http://space.fmi.fi/image/coordinates.html
	data = fs.readFileSync("coordinates.txt").toString().split("\n");

	var INFO = {};
	for (var i = 0;i<data.length;i++) {
		INFO[data[i].split(/\t|\s[0-9]/)[0]] = data[i].replace(/\t\s/,'\s').split(/\t|\s[0-9]/);
	}

	createtsml(list);
}

function createtsml (list) {

	if (cadence === "PT20S") {
		cadencestr1 = "20-second"
	}
	if (cadence === "PT10S") {
		cadencestr1 = "10-second"
	}
	if (cadence === "PT1M") {
		cadencestr1 = "1-minute"
	}

	var root = {};
	root.catalog = {};
	root.catalog["$"] = {};
	root.catalog["$"]["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
	root.catalog["$"]["id"]          = "IMAGE/"+cadence;
	root.catalog["$"]["name"]        = "IMAGE magnetometer chain data at " + cadencestr1 + " cadence";

	root.catalog["documentation"] = [];
	root.catalog["documentation"][0] = {};
	root.catalog["documentation"][0]["$"] = {};
	root.catalog["documentation"][0]["$"]["xlink:href"] = "http://space.fmi.fi/";
	root.catalog["documentation"][0]["$"]["xlink:title"] = "IMAGE web page";
	
	root.catalog["documentation"][1] = {};
	root.catalog["documentation"][1]["$"] = {};
	root.catalog["documentation"][1]["$"]["xlink:href"] = "http://github.com/tsds/tsds2/tree/gh-pages/tsdscc/catalogs/image";
	root.catalog["documentation"][1]["$"]["xlink:title"] = "Catalog generation software";

	root.catalog["documentation"][2] = {};
	root.catalog["documentation"][2]["$"] = {};
	root.catalog["documentation"][2]["$"]["xlink:href"] = "/";
	root.catalog["documentation"][2]["$"]["xlink:title"] = "Catalog generation date: "+(new Date()).toISOString();

	root.catalog["documentation"][3] = {};
	root.catalog["documentation"][3]["$"] = {};
	root.catalog["documentation"][3]["$"]["xlink:href"] = "http://space.fmi.fi/image/rulesofroad.html";
	root.catalog["documentation"][3]["$"]["xlink:title"] = "Conditions of use and acknowledgement of IMAGE data";

	root.catalog["documentation"][4] = {};
	root.catalog["documentation"][4]["$"] = {};
	root.catalog["documentation"][4]["$"]["xlink:href"] = "http://space.fmi.fi/image/contributors.html";
	root.catalog["documentation"][4]["$"]["xlink:title"] = "IMAGE data providers";

	root.catalog["dataset"] = [];

	for (var i = 0;i < list.length;i++) {

		var MAG    = list[i][0];
		var Start  = list[i][1].substring(0,4) + "-" + list[i][1].substring(4,6) + "-" + list[i][1].substring(6,8);
		var End    = list[i][2].substring(0,4) + "-" + list[i][2].substring(4,6) + "-" + list[i][2].substring(6,8);
		var CSYS   = list[i][3];
		if (!INFO[MAG]) {
			console.log("--- Warning: Magnetometer info for " + MAG + " not in coordinates.txt");
			var LAT    = "";
			var LON    = "";
			var SOURCE = "http://space.fmi.fi/image/contributors.html";
			var NAME   = MAG;
		} else {
			var LAT    = INFO[MAG][2];
			var LON    = INFO[MAG][3];
			var SOURCE = "http://space.fmi.fi/image/contributors.html";
			var NAME   = INFO[MAG][1].replace(/\s+$/,"");
		}

		root.catalog["dataset"][i] = {};
		root.catalog["dataset"][i]["$"] = {};
		root.catalog["dataset"][i]["$"]["id"] = MAG;
		root.catalog["dataset"][i]["$"]["name"] = NAME;
		root.catalog["dataset"][i]["$"]["label"] = "Data source institute: " + SOURCE;
		root.catalog["dataset"][i]["$"]["timecolumns"] = "1,2,3,4,5,6";
		root.catalog["dataset"][i]["$"]["timeformat"] = "$Y,$m,$d,$H,$M,$S";
		root.catalog["dataset"][i]["$"]["urltemplate"] = "mirror:http://space.fmi.fi/"+MAG+"/"+cadence+"/"+"$Y$m$d"+MAG+".col2.gz";
		root.catalog["dataset"][i]["$"]["lineregex"] = "^[0-9]";

		root.catalog["dataset"][i]["documentation"] = [];
		root.catalog["dataset"][i]["documentation"][i] = {};
		root.catalog["dataset"][i]["documentation"][i]["$"] = {};
		root.catalog["dataset"][i]["documentation"][i]["$"]["xlink:href"] = "http://space.fmi.fi/image/contributors.html";
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

		var CSYSv = CSYS.split("");

		for (var j = 0;j < CSYSv.length;j++) {
			root.catalog["dataset"][i]["variables"]["variable"][j] = {};
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"] = {};
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["id"] = CSYSv[j].toUpperCase();
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["name"] = CSYSv[j];
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["label"] = MAG + " " + CSYSv[j].toUpperCase();
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["units"] = "nT";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["type"] = "scalar";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["fillvalue"] = "99999.0";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["rendering"] = "%.1f";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columns"] = ""+(j+7);
		}

	}
	// Convert JSON object to XML.
	var builder = new xml2js.Builder();
	var xml = builder.buildObject(root);
	fs.writeFileSync('IMAGE_'+cadence+"-tsml.xml",xml);
	console.log("Wrote IMAGE_"+cadence+"-tsml.xml");
}
