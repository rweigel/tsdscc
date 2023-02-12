const fs        = require("fs");
const request   = require("request");
const waterfall = require('async-waterfall');

const stationsURL = 'http://supermag.jhuapl.edu/mag/lib/services/?service=stations&fmt=json';
const stationsFile = "SuperMAG-stations.json";

const yearlyURL  = 'http://supermag.jhuapl.edu/mag/lib/services/inventory.php?service=yearly&stations=';
const yearlyFile = "SuperMAG-yearly.json";

var stationsJSON;
var yearlyJSON;

var update = true;
if (!update) {
	if (fs.existsSync(stationsFile)) {
		stationsJSON = JSON.parse(fs.readFileSync(stationsFile));
	} else {
		update = true;
	}
	if (fs.existsSync(yearlyFile)) {
		yearlyJSON = JSON.parse(fs.readFileSync(yearlyFile));
	} else {
		update = true;
	}
}

if (update) {
	updatefiles(createCatalog);
} else {
	createCatalog();
}

function createCatalog() {
	var catalog = [];
	for (var i = 0; i < stationsJSON.length; i++) {
		catalog[i] = {
			"id": stationsJSON[i]['id'],
			"description": stationsJSON[i]['name'] 
					+ "; Geographic latitude: " + stationsJSON[i]['geolat'] 
					+ "; Geographic longitude: " + stationsJSON[i]['geolon']
					+ "; Operator(s): " + stationsJSON[i]['operator'].join(", ")
		}
	}
	console.log(catalog)
}

function updatefiles(cb) {
	waterfall(
	[
	  function(callback){
		request(stationsURL, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("Downloaded " + response.request.uri.href);
				stationsJSON = JSON.parse(body);
				fs.writeFileSync(stationsFile,body);
				console.log("Wrote " + stationsFile);
			} else {
				console.log("Problem downloading " + response.request.uri.href);
			}
			callback();
		})
	  },
	  function(callback){
		request(yearlyURL, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("Downloaded " + response.request.uri.href);
				yearlyJSON = JSON.parse(body);
				fs.writeFileSync("SuperMAG-yearly.json",body);
				console.log("Wrote " + yearlyFile);
			} else {
				console.log("Problem downloading " + response.request.uri.href);
			}
			callback();
		})
	  }
	], function (err, result) { 
		console.log('File update complete.');
		cb();
	});
}