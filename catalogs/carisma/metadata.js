var cadence = "PT1S";

var fs = require('fs');
var xml2js  = require('xml2js');

files = fs.readdirSync("./data/www.carisma.ca/FGM/");

console.log("# Files: " + files.length);
var INFO = {};
for (var i = 0;i<files.length;i++) {
	if (files[i].length == 19) { // Some files have unusual names
		FLC = files[i].substring(8,12);
		if (!INFO[FLC]) {
			INFO[FLC] = {};
		}
		if (!INFO[FLC]["start"]) {
			INFO[FLC]["start"] = files[i].substring(0,8);
		}
		INFO[FLC]["stop"] = files[i].substring(0,8);
	}
}

// http://www.carisma.ca/station-information
data = fs.readFileSync("coordinates.txt").toString().split("\n");
for (var i=0;i<data.length;i++) {
	tmp = data[i].split(/\t/);
	if (INFO[tmp[0]]) {
		INFO[tmp[0]]["name"] = tmp[1];
		INFO[tmp[0]]["lat"] = tmp[2];
		INFO[tmp[0]]["lon"] = tmp[3];
	}
}
createtsml(INFO);

function createtsml (INFO) {

	cadencestr1 = "1-second"

	var root = {};
	root.catalog = {};
	root.catalog["$"] = {};
	root.catalog["$"]["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
	root.catalog["$"]["id"]          = "CARISMA/FGM/"+cadence;
	root.catalog["$"]["name"]        = "CARISMA fluxgate magnetometer data at " + cadencestr1 + " cadence";

	root.catalog["documentation"] = [];
	root.catalog["documentation"][0] = {};
	root.catalog["documentation"][0]["$"] = {};
	root.catalog["documentation"][0]["$"]["xlink:href"] = "https://www.carisma.ca/";
	root.catalog["documentation"][0]["$"]["xlink:title"] = "CARISMA web page";
	
	root.catalog["documentation"][1] = {};
	root.catalog["documentation"][1]["$"] = {};
	root.catalog["documentation"][1]["$"]["xlink:href"] = "http://github.com/tsds/tsds2/tsdscc/catalogs/carisma";
	root.catalog["documentation"][1]["$"]["xlink:title"] = "Catalog generation software";

	root.catalog["documentation"][2] = {};
	root.catalog["documentation"][2]["$"] = {};
	root.catalog["documentation"][2]["$"]["xlink:href"] = "/";
	root.catalog["documentation"][2]["$"]["xlink:title"] = "Catalog generation date: "+(new Date()).toISOString();

	root.catalog["documentation"][3] = {};
	root.catalog["documentation"][3]["$"] = {};
	root.catalog["documentation"][3]["$"]["xlink:href"] = "http://www.carisma.ca/carisma-data/data-use-requirements";
	root.catalog["documentation"][3]["$"]["xlink:title"] = "Data use requirements";

	root.catalog["dataset"] = [];

	var i = -1;
	for (var key in INFO) {
		i = i+1;
		var MAG    = key;
		var Start  = INFO[key]["start"].substring(0,4)+"-"+INFO[key]["start"].substring(4,6)+"-"+INFO[key]["start"].substring(6,8);
		var End    = INFO[key]["stop"].substring(0,4)+"-"+INFO[key]["stop"].substring(4,6)+"-"+INFO[key]["stop"].substring(6,8);
		var CSYS   = "XYZ";
		var LAT    = INFO[key]["lat"];
		var LON    = INFO[key]["lon"];
		var SOURCE = "https://www.carisma.ca/carisma-data-repository";
		var NAME   = INFO[key]["name"];

		root.catalog["dataset"][i] = {};
		root.catalog["dataset"][i]["$"] = {};
		root.catalog["dataset"][i]["$"]["id"] = MAG;
		root.catalog["dataset"][i]["$"]["name"] = NAME;
		root.catalog["dataset"][i]["$"]["label"] = "Data source institute: " + SOURCE;
		root.catalog["dataset"][i]["$"]["timecolumns"] = "1";
		root.catalog["dataset"][i]["$"]["timeformat"] = "$Y$m$d$H$M$S";
		root.catalog["dataset"][i]["$"]["urltemplate"] = "mirror:http://www.carisma.ca/FGM/$Y$m$d"+MAG+".F01.gz";
		root.catalog["dataset"][i]["$"]["lineregex"] = "^[0-9]";

		root.catalog["dataset"][i]["documentation"] = [];
		root.catalog["dataset"][i]["documentation"][i] = {};
		root.catalog["dataset"][i]["documentation"][i]["$"] = {};
		root.catalog["dataset"][i]["documentation"][i]["$"]["xlink:href"] = "http://www.carisma.ca/carisma-data/product-info";
		root.catalog["dataset"][i]["documentation"][i]["$"]["xlink:title"] = "Data product information";

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
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["fillvalue"] = "99999.00";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["rendering"] = "%.3f";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columns"] = ""+(j+2);
		}

	}
	// Convert JSON object to XML.
	var builder = new xml2js.Builder();
	var xml = builder.buildObject(root);
	fs.writeFileSync('CARISMA_FGM_'+cadence+"-tsml.xml",xml);
	console.log("Wrote CARISMA_FGM_"+cadence+"-tsml.xml");
}
