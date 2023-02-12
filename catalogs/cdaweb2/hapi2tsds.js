var fs      = require('fs')
var os      = require("os")

var request = require("request")
var express = require('express')
var app     = express()
var xml2js  = require('xml2js')
var async   = require('async')
var urlo = "http://voyager.gsfc.nasa.gov/hapiproto/hapi/" 

var catalog = {};
catalog["$"] = {}

function hapi2tsds(datasets,parameters) {
	//console.log(datasets);
	//console.log(parameters);
	catalog["$"]["id"] = "CDAWeb2";
	catalog["dataset"] = [];
	for (var ds = 0;ds < parameters.length;ds++) {
		catalog["dataset"][ds] = {};
		catalog["dataset"][ds]["$"] = {};
		catalog["dataset"][ds]["$"]["id"] = datasets[ds].id;
		catalog["dataset"][ds]["$"]["urltemplate"] = urlo + "data%3Fid=" + datasets[ds]["id"] + "%26time.min=$Y-$m-$d%26time.max=$Y-$m-${d;offset=1}"
		catalog["dataset"][ds]["$"]["delim"] = ",";
		catalog["dataset"][ds]["$"]["lineregex"] = "^[0-9][0-9][0-9][0-9]";
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
			catalog["dataset"][ds]["variables"][0]["variable"][v]["$"]["columns"] = columnsstr;
		}
	}
	//console.log(parameters[0])
	catalogfull = {};
	catalogfull["catalog"] = catalog;
	console.log(JSON.stringify(catalogfull,null,4));
	//console.log(catalog)
}

function getParameters(dataset, cb) {
	request(urlo + "info?id=" + dataset.id, 
		function (error, response, body) {
			cb(null, JSON.parse(body));
	})
}

request(urlo + "catalog", function (error, response, body) {
	var datasets = JSON.parse(body);
	async.map(datasets.catalog.slice(0,20), getParameters, 
		function (err,arr) {
			//console.log(err)
			//console.log(arr)
			hapi2tsds(datasets.catalog.slice(0,20),arr)
	})
})
