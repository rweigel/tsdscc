var xml2js  = require('xml2js');
var fs      = require('fs');

var keyre = /^AC_H0_MFI/;
var keyre = /.*/;

var files = fs.readdirSync("./json");
//console.log("json2tsml(): Reading " + files[0]);

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

var list = [];
var k = 0;
for (var i = 0;i < json.DatasetDescription.length;i++) {
	var DatasetID = json.DatasetDescription[i].Id;
	var Start = json.DatasetDescription[i].TimeInterval.Start.split("T");
	for (var j=0;j<json.DatasetDescription[i].VariableDescription.length;j++) {
		var VariableID = json.DatasetDescription[i].VariableDescription[j].Name;
		list[k] = DatasetID + "/" + VariableID + "/" + Start[0];
		k = k+1;
	}
}

fs.writeFileSync("ids_vars-in.txt",list.join("\n"));
