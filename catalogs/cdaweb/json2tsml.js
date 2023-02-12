var xml2js  = require('xml2js');
var fs      = require('fs');

//var keyre = /^AC_H0_MFI/;
//var keyre = /.*/;
var keyre = /^AC_|^OMNI|^PO/;
//var keyre = /^PO_K1_TIM/;

var files = fs.readdirSync("./json");
console.log("json2tsml(): Reading " + files[0]);

var json = {};
json.DatasetDescription = [];

var k = 0;
for (var i = 0;i<files.length;i++) {

	var data = fs.readFileSync("./json/"+files[i]);
	jsonx = JSON.parse(data);

	if (!files[i].match(keyre)) {continue;}

	json.DatasetDescription[k] = jsonx;

	k = k+1;
}
console.log(json)
list = fs.readFileSync("ids_vars-out.txt").toString().split("\n");

var List = {};
var ListX = [];

for (var i = 0; i < list.length;i++) {
	info = list[i].split("\\");
	List[info[0] + "/" + info[1]] = list[i];
}

var k = 0;
var i = 0;
var x = 0;

for (var i = 0;i < json.DatasetDescription.length;i++) {
	var DatasetID = json.DatasetDescription[i].Id;
	json.DatasetDescription[i].SPASEID = info[8];
	json.DatasetDescription[i].TimeInterval.Cadence = info[5];
	var Start = json.DatasetDescription[i].TimeInterval.Start.split("T");
	for (var j=0;j<json.DatasetDescription[i].VariableDescription.length;j++) {
		var VariableID = json.DatasetDescription[i].VariableDescription[j].Name;
		console.log(DatasetID + "/" + VariableID)
		if (List[DatasetID + "/" + VariableID]) {
			info = List[DatasetID + "/" + VariableID].split("\\")
			json.DatasetDescription[i].VariableDescription[j].FillValue = info[3] || '';
			json.DatasetDescription[i].VariableDescription[j].Rendering = info[4].replace(/([A-Z]|[a-z])(.*)/,'$2$1').replace('i','d').toLowerCase();			
			k = k+1;
		} else {
			ListX[x] = DatasetID + "/" + VariableID;
			x = x+1;
		}
	}
}

fs.writeFileSync("ids_vars-out-missing.txt",ListX.join("\n"));
//console.log(json.DatasetDescription[0].VariableDescription[0])

createtsml();

function createtsml() {

	//console.log(json)
	var root = {};
	root.catalog = {};
	root.catalog["$"] = {};
	root.catalog["$"]["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
	root.catalog["$"]["id"]          = "CDAWeb";
	root.catalog["$"]["name"]        = "CDAWeb data";

	root.catalog["documentation"] = [];
	root.catalog["documentation"][0] = {};
	root.catalog["documentation"][0]["$"] = {};
	root.catalog["documentation"][0]["$"]["xlink:href"] = "http://cdaweb.gsfc.nasa.gov/";
	root.catalog["documentation"][0]["$"]["xlink:title"] = "CDAWeb web page";
	
	root.catalog["documentation"][1] = {};
	root.catalog["documentation"][1]["$"] = {};
	root.catalog["documentation"][1]["$"]["xlink:href"] = "http://github.com/tsds/tsds2/tsdscc/catalogs/cdaweb";
	root.catalog["documentation"][1]["$"]["xlink:title"] = "Catalog generation software";

	root.catalog["documentation"][2] = {};
	root.catalog["documentation"][2]["$"] = {};
	root.catalog["documentation"][2]["$"]["xlink:href"] = "/";
	root.catalog["documentation"][2]["$"]["xlink:title"] = "Catalog generation date: "+(new Date()).toISOString();

	root.catalog["dataset"] = [];

	for (var i = 0;i < json.DatasetDescription.length;i++) {

		if (keyre) {
			if (!json.DatasetDescription[i].Id.match(keyre)) {continue;}
		}

		DatasetID = json.DatasetDescription[i].Id;

		console.log("createtsml(): Working on dataset " + json.DatasetDescription[i].Id);
		root.catalog["dataset"][i] = {};
		root.catalog["dataset"][i]["$"] = {};
		root.catalog["dataset"][i]["$"]["id"] = json.DatasetDescription[i].Id;
		root.catalog["dataset"][i]["$"]["name"] = "";
		root.catalog["dataset"][i]["$"]["label"] = json.DatasetDescription[i].Label;
		root.catalog["dataset"][i]["$"]["timecolumns"] = "1,2";
		root.catalog["dataset"][i]["$"]["timeformat"] = "$d-$m-$Y $H:$M:$S";
		root.catalog["dataset"][i]["$"]["lineregex"] = "^[0-9][0-9]";

		root.catalog["dataset"][i]["documentation"] = [];
		root.catalog["dataset"][i]["documentation"][0] = {};
		root.catalog["dataset"][i]["documentation"][0]["$"] = {};
		if (json.DatasetDescription[i].Notes) {
			root.catalog["dataset"][i]["documentation"][0]["$"]["xlink:href"] = json.DatasetDescription[i].Notes;
			root.catalog["dataset"][i]["documentation"][0]["$"]["xlink:title"] = "Dataset Information from CDAWeb";
			root.catalog["dataset"][i]["documentation"][0]["_"] = "Dataset Information from CDAWeb";
		} else {
			root.catalog["dataset"][i]["documentation"][0]["$"]["xlink:href"] = "http://cdaweb.gsfc.nasa.gov/misc/Notes.html#"+json.DatasetDescription[i].Id;
			root.catalog["dataset"][i]["documentation"][0]["$"]["xlink:title"] = "Dataset Information from CDAWeb";
			root.catalog["dataset"][i]["documentation"][0]["_"] = "Dataset Information from CDAWeb";			
		}

		if (json.DatasetDescription[i].DatasetLink) {
			root.catalog["dataset"][i]["documentation"][1] = {};
			root.catalog["dataset"][i]["documentation"][1]["$"] = {};
			root.catalog["dataset"][i]["documentation"][1]["$"]["xlink:href"] = json.DatasetDescription[i].DatasetLink[0].Url;
			root.catalog["dataset"][i]["documentation"][1]["$"]["xlink:title"] = json.DatasetDescription[i].DatasetLink[0].Title;
			root.catalog["dataset"][i]["documentation"][1]["_"] = json.DatasetDescription[i].DatasetLink[0].Text;
			dn = 2;
		} else {
			dn = 1;
		}

		root.catalog["dataset"][i]["documentation"][dn] = {};
		var head = json.DatasetDescription[i].VariableDescription[0].Header.split("\n");

		var head2="\n#              ************************************\n#              *****    GLOBAL ATTRIBUTES    ******\n#              ************************************\n#\n";
		for (var h=0;h<head.length;h++) {
			if (head[h].match(/^#\s\s\s\s\s[A-Z]/)) {
				head2 = head2+head[h]+"\n";
			}
		}

		root.catalog["dataset"][i]["documentation"][dn] = {};
		root.catalog["dataset"][i]["documentation"][dn]["_"] = head2;

		root.catalog["dataset"][i]["SPASE"] = {};
		root.catalog["dataset"][i]["SPASE"]["ID"] = json.DatasetDescription[i].SPASEID;

		root.catalog["dataset"][i]["timeCoverage"] = {};
		root.catalog["dataset"][i]["timeCoverage"]["Start"] = json.DatasetDescription[i].TimeInterval.Start;
		root.catalog["dataset"][i]["timeCoverage"]["End"] = json.DatasetDescription[i].TimeInterval.End;
		root.catalog["dataset"][i]["timeCoverage"]["Cadence"] = json.DatasetDescription[i].TimeInterval.Cadence;
		
		//root.catalog["dataset"][i]["timeCoverage"]["Cadence"] = parseInt(json.DatasetDescription[i].TimeInterval.Cadence);

		for (var j = 0;j < json.DatasetDescription[i].VariableDescription.length;j++) {
			//console.log(json.DatasetDescription[i].VariableDescription[j]);
			//console.log(json.DatasetDescription[i].VariableDescription[j].VariableInfo.split("\n"));

		    var metaJson = json.DatasetDescription[i].VariableDescription[j].VariableInfo.split(/\r?\n/)
				.map(function(d){
					return d.split(/\s+/);
				});

			console.log("createtsml(): Header for " + json.DatasetDescription[i].VariableDescription[j].Name + ":");
			console.log(metaJson);
			for (var k=0;k<metaJson.length;k++) {
				if (metaJson[k][0].match(/^EPOCH|^UT|^TIME/)) { // Note, THEMIS ground magnetometer data use UT.

					if (metaJson[k].length == 2) {
							console.log("createtsml(): " + json.DatasetDescription[i].VariableDescription[j].Name + " is a scalar");
							json.DatasetDescription[i].VariableDescription[j].Ids = metaJson[k].slice(1);
							json.DatasetDescription[i].VariableDescription[j].Labels = metaJson[k].slice(1);
							json.DatasetDescription[i].VariableDescription[j].Units = metaJson[k+1].slice(2);
							json.DatasetDescription[i].VariableDescription[j].Type = "scalar";
					}
					if (metaJson[k].length > 2) {
						if (metaJson[k+1].slice(1)[0].match(/@_/)) {
							json.DatasetDescription[i].VariableDescription[j].Ids = metaJson[k].slice(1);
							json.DatasetDescription[i].VariableDescription[j].Labels = metaJson[k].slice(1);
							json.DatasetDescription[i].VariableDescription[j].Units = metaJson[k+2].slice(2);
							console.log(json.DatasetDescription[i].VariableDescription[j].Labels)
							console.log("createtsml(): " + json.DatasetDescription[i].VariableDescription[j].Name + " is a vector");
							json.DatasetDescription[i].VariableDescription[j].Type = "vector"; // Or spectra
						} else {
							json.DatasetDescription[i].VariableDescription[j].Ids = metaJson[k].slice(1);
							json.DatasetDescription[i].VariableDescription[j].Labels = metaJson[k].slice(1);
							json.DatasetDescription[i].VariableDescription[j].Units = metaJson[k+1].slice(2);
							console.log("createtsml(): " + json.DatasetDescription[i].VariableDescription[j].Name + " are scalars");
							json.DatasetDescription[i].VariableDescription[j].Type = "scalars";
						}
					}
				}
			}
			json.DatasetDescription[i].VariableDescription[j].Header = '';
			//console.log(json.DatasetDescription[i].VariableDescription[j])
		}

        if (0) {
			root.catalog["dataset"][i]["groups"] = {};
			root.catalog["dataset"][i]["groups"]["group"] = [];
			root.catalog["dataset"][i]["groups"]["group"][i] = {};
			root.catalog["dataset"][i]["groups"]["group"][i]["$"] = {};
			root.catalog["dataset"][i]["groups"]["group"][i]["$"]["id"] = "";
			root.catalog["dataset"][i]["groups"]["group"][i]["$"]["name"] = "";
			root.catalog["dataset"][i]["groups"]["group"][i]["$"]["type"] = "vector";

		}

		root.catalog["dataset"][i]["variables"] = {};
		root.catalog["dataset"][i]["variables"]["variable"] = [];

		for (var j = 0;j < json.DatasetDescription[i].VariableDescription.length;j++) {
			//console.log(json.DatasetDescription[i].VariableDescription[j]);
			root.catalog["dataset"][i]["variables"]["variable"][j] = {};
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"] = {};
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["id"] = json.DatasetDescription[i].VariableDescription[j].Name;
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["name"] = json.DatasetDescription[i].VariableDescription[j].Labels || json.DatasetDescription[i].VariableDescription[j].Name;
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["label"] = json.DatasetDescription[i].VariableDescription[j].LongDescription;
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["units"] = json.DatasetDescription[i].VariableDescription[j].Units || "";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["type"] = json.DatasetDescription[i].VariableDescription[j].Type || "scalar";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["fillvalue"] = json.DatasetDescription[i].VariableDescription[j].FillValue || "";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["rendering"] = json.DatasetDescription[i].VariableDescription[j].Rendering || "";
			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columnLabels"] = json.DatasetDescription[i].VariableDescription[j].Labels || json.DatasetDescription[i].VariableDescription[j].Name;
			if (json.DatasetDescription[i].VariableDescription[j].Type == "scalar") {
				root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columns"] = "3";
			}
			if (json.DatasetDescription[i].VariableDescription[j].Type == "vector") {
				root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columns"] = "3-"+(json.DatasetDescription[i].VariableDescription[j].Labels.length+2);//"3,4,5";
			}
			if (json.DatasetDescription[i].VariableDescription[j].Type == "scalars") {
				root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["columns"] = "3-"+(json.DatasetDescription[i].VariableDescription[j].Labels.length+2);
			}

			root.catalog["dataset"][i]["variables"]["variable"][j]["$"]["urltemplate"] = "http://cdaweb.gsfc.nasa.gov/WS/cdasr/1/dataviews/sp_phys/datasets/"
																+json.DatasetDescription[i].Id
																+"/data/$Y$m$dT000000Z,${Y;offset=0}${m;offset=0}${d;offset=1}T000000Z/"
																+json.DatasetDescription[i].VariableDescription[j].Name
																+"?format=text";

			console.log(root.catalog["dataset"][i]["variables"]["variable"][j])

		}


		var builder = new xml2js.Builder();
		var xml = builder.buildObject(root);

	}
	// Convert JSON object to XML.
	var builder = new xml2js.Builder();
	var xml = builder.buildObject(root);
	fs.writeFileSync("CDAWeb-tsml.xml",xml);
	console.log("createtsml(): Wrote CDAWeb-tsml.xml");
}

