var fs      = require('fs')
var os      = require("os")

var request = require("request")
var express = require('express')
var app     = express()
var xml2js  = require('xml2js')
var async   = require('async')

var urlo = "https://iswa.gsfc.nasa.gov/IswaSystemWebApp/DataListStreamServlet?";
var urld = "https://iswa.gsfc.nasa.gov/IswaSystemWebApp/DatabaseDataStreamServlet?";

request(urlo, 
	function (error, response, body) {
		var json = JSON.parse(body);
		//console.log(json)
		iswa2tsds(json)
})

var catalog = {};
catalog["$"] = {}

function repeatstring(str,N) {
	var stro = ""
	for (var i = 0;i < N;i++) {
		stro = stro + "," + str;
	}
	return stro.substring(1);
}

function iswa2tsds(datasets) {
	//console.log(datasets);
	//console.log(parameters);
	catalog["$"]["id"] = "ISWA";
	catalog["dataset"] = [];
	for (var ds = 0;ds < 1;ds++) {
		catalog["dataset"][ds] = {};
		catalog["dataset"][ds]["$"] = {};
		catalog["dataset"][ds]["$"]["id"] = datasets[ds]["Instance"];
		var parameters = datasets[ds]["Quantity"]
		var units = datasets[ds]["Units"]
		var datasetrepeated = repeatstring(datasets[ds]["Instance"], parameters.length)
		//catalog["dataset"][ds]["$"]["urltemplate"] = urld + "format=TEXT%3Fresource=" + datasetrepeated + "%26quantity=" + parameters.join(",") + "%26begin-time=${Y;offset=0}-${m;offset=0}-${Y;offset=-1}%2023:59:59%26end-time=${Y;offset=0}-${m;offset=0}-${d;offset=1}"

		catalog["dataset"][ds]["$"]["delim"] = "";
		catalog["dataset"][ds]["$"]["lineregex"] = "^[0-9][0-9][0-9][0-9]";
		catalog["dataset"][ds]["$"]["timeformat"] = "$Y-$m-$d,$H:$M:$S";
		catalog["dataset"][ds]["timeCoverage"] = [];
		catalog["dataset"][ds]["timeCoverage"][0] = {};
		catalog["dataset"][ds]["timeCoverage"][0]["Start"] = [];
		catalog["dataset"][ds]["timeCoverage"][0]["End"] = [];
		catalog["dataset"][ds]["timeCoverage"][0]["Cadence"] = [];
		//catalog["dataset"][ds]["timeCoverage"][0]["Start"][0] = parameters[ds]["startDate"] || parameters[ds]["firstDate"];
		//catalog["dataset"][ds]["timeCoverage"][0]["End"][0] = parameters[ds]["stopDate"] || parameters[ds]["lastDate"];

		if (parameters[ds]["deltaTime"]) {
			catalog["dataset"][ds]["timeCoverage"][0]["Cadence"][0] = parameters[ds]["deltaTime"];
		}
		if (parameters[ds]["cadence"]) {
			catalog["dataset"][ds]["timeCoverage"][0]["Cadence"][0] = parameters[ds]["cadence"];
		}

		catalog["dataset"][ds]["variables"] = [];
		catalog["dataset"][ds]["variables"][0] = {};
		catalog["dataset"][ds]["variables"][0]["variable"] = [];
		var columns = 0;
		var columnsstr = "";
		for (var v = 0;v < parameters.length;v++) {
			columnsstr = "3";
			//columns = columns + 1;
			//columnsstr = "" + columns;
			//${Y;offset=0}-${m;offset=0}-${d;offset=-1}
			urltemplate = urld + "format=TEXT%26resource=" + datasets[ds]["Instance"] + "%26quantity=" + parameters[v] + "%26begin-time=$Y-$m-$d%252023:59:59%26end-time=${Y;offset=0}-${m;offset=0}-${d;offset=1}%252023:59:59"
			//urltemplate = urld + "format=TEXT%26resource=" + datasets[ds]["Instance"] + "%26quantity=" + parameters[v] + "%26begin-time=${Y;offset=0}-${m;offset=0}-${Y;offset=-1}%2023:59:59%26end-time=${Y;offset=0}-${m;offset=0}-${d;offset=1}"

			catalog["dataset"][ds]["variables"][0]["variable"][v] = {};
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"] = {};
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"]["id"] = parameters[v]
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"]["name"] = parameters[v]
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"]["label"] = parameters[v]
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"]["units"] = units[v];
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"]["columns"] = columnsstr;
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"]["urltemplate"] = urltemplate;
		}
	}
	//console.log(parameters[0])
	catalogfull = {};
	catalogfull["catalog"] = catalog;
	console.log(JSON.stringify(catalogfull,null,4));
	//console.log(catalog)
}
