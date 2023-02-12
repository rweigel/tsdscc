//https://www.ngdc.noaa.gov/dscovr-data-access/parameters
//https://github.com/hpde/NOAA/tree/master/NumericalData

var fs      = require('fs')
var os      = require("os")

var request = require("request")
var express = require('express')
var app     = express()
var xml2js  = require('xml2js')
var async   = require('async')

var urlo = "https://www.ngdc.noaa.gov/dscovr-data-access/parameters";
var START = "2016-07-26";
var STOP = "PT0M"
var id   = "";

var catalog = {};
catalog["$"] = {}

function dscovr2tsds(datasets) {

	for (key in datasets) {
		catalog["$"]["id"] = datasets[key];
		catalog["$"]["name"] = datasets[key];
	}

	catalog["dataset"] = [];
	for (var ds = 0;ds < parameters.length;ds++) {
		catalog["dataset"][ds] = {};
		catalog["dataset"][ds]["$"] = {};
		catalog["dataset"][ds]["$"]["id"] = datasets[ds].id;
		catalog["dataset"][ds]["$"]["name"] = datasets[ds].name;
		catalog["dataset"][ds]["$"]["urltemplate"] = urlo + "data%3Fid=" + datasets[ds]["id"] + "%26time.min=$Y-$m-$d%26time.max=${Y;offset=0}-${m;offset=0}-${d;offset=1}"
		catalog["dataset"][ds]["$"]["delim"] = ",";
		catalog["dataset"][ds]["$"]["lineregex"] = "^[0-9][0-9][0-9][0-9]";
		catalog["dataset"][ds]["timeCoverage"] = [];
		catalog["dataset"][ds]["timeCoverage"][0] = {};
		catalog["dataset"][ds]["timeCoverage"][0]["Start"] = [];
		catalog["dataset"][ds]["timeCoverage"][0]["End"] = [];
		catalog["dataset"][ds]["timeCoverage"][0]["Cadence"] = [];

		catalog["dataset"][ds]["timeCoverage"][0]["Start"][0] = parameters[ds]["startDate"] || parameters[ds]["firstDate"];
		catalog["dataset"][ds]["timeCoverage"][0]["End"][0] = parameters[ds]["stopDate"] || parameters[ds]["lastDate"];

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
		for (var v = 0;v < parameters[ds]["parameters"].length;v++) {
			if (parameters[ds]["parameters"][v]["size"]) {
				columnsstr = "" + (columns + 1) + "-" + (columns + parameters[ds]["parameters"][v]["size"][0]);
				var columns = columns + parameters[ds]["parameters"][v]["size"][0];
			} else {
				columns = columns + 1;
				columnsstr = "" + columns;
			}

			catalog["dataset"][ds]["variables"][0]["variable"][v] = {};
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"] = {};
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"]["id"] = parameters[ds]["parameters"][v]["name"];
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"]["name"] = parameters[ds]["parameters"][v]["name"];
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"]["label"] = parameters[ds]["parameters"][v]["description"];
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"]["units"] = parameters[ds]["parameters"][v]["units"];
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"]["fillvalue"] = parameters[ds]["parameters"][v]["fill"];
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"]["columns"] = columnsstr;
		}
	}
	//console.log(parameters[0])
	catalogfull = {};
	catalogfull["catalog"] = catalog;
	console.log(JSON.stringify(catalogfull,null,4));
	//console.log(catalog)
}

console.error("Getting " + urlo + "catalog")
request(urlo, function (error, response, body) {
	var datasets = JSON.parse(body);
	console.log(datasets)
	//dscovr2tsds(datasets,arr)
})
