var request = require('request');
var jsdom   = require("jsdom").jsdom;
var crypto  = require('crypto');
var fs      = require('fs');
var xml2js  = require('xml2js');

var url = 'http://magweb.cr.usgs.gov/data/magnetometer/';

var STATIONS = [];
var STARTSTOP = {};
var Np = 1;

var cadence = process.argv[2] || "PT1S";

dir = '/OneMinute/'
if (cadence === "PT1S") {
	dir = '/OneSecond/';
}

console.log("Requesting data from " + url);
request.get(url,
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				//console.log(body);
				console.log("Done.");
				extractdata(body,"stations");
			}
		}
);

function populatetemplate() {

	catalogjson = JSON.parse(fs.readFileSync("./templates/USGS_Mag_RT_"+cadence+"-template.json"));

	catalogjson["catalog"]["documentation"][2]["$"]["xlink:title"] += (new Date()).toISOString();

	var datasettemplate = JSON.stringify(catalogjson["catalog"]["dataset"][0]);

	var j = 0;
	for (var key in STARTSTOP) {
		if (STARTSTOP[key].length > 0) {
			catalogjson["catalog"]["dataset"][j] = JSON.parse(datasettemplate);
			catalogjson["catalog"]["dataset"][j]["$"]["id"] = catalogjson["catalog"]["dataset"][j]["$"]["id"].replace("$1",key);
			catalogjson["catalog"]["dataset"][j]["$"]["name"] = catalogjson["catalog"]["dataset"][j]["$"]["name"].replace("$1",key);
			catalogjson["catalog"]["dataset"][j]["$"]["label"] = catalogjson["catalog"]["dataset"][j]["$"]["label"].replace("$1",key);
			catalogjson["catalog"]["dataset"][j]["$"]["urltemplate"] = catalogjson["catalog"]["dataset"][j]["$"]["urltemplate"].replace("$1",key).replace("$2",key.toLowerCase());
			var Start = STARTSTOP[key].split("/")[0];
			catalogjson["catalog"]["dataset"][j]["timeCoverage"]["Start"] = Start.substring(0,4) + "-" + Start.substring(4,6) + "-" + Start.substring(6,8);
			var End = STARTSTOP[key].split("/")[1];
			catalogjson["catalog"]["dataset"][j]["timeCoverage"]["End"] = End.substring(0,4) + "-" + End.substring(4,6) + "-" + End.substring(6,8);

			catalogjson["catalog"]["dataset"][j]["groups"]["group"]["$"]["name"] = catalogjson["catalog"]["dataset"][j]["groups"]["group"]["$"]["name"].replace("$1",key);
			catalogjson["catalog"]["dataset"][j]["groups"]["group"]["$"]["label"] = catalogjson["catalog"]["dataset"][j]["groups"]["group"]["$"]["label"].replace("$1",key);

			//console.log(catalogjson["catalog"]["dataset"][j]["variables"])
			for (var i = 1;i<4;i++) {
				catalogjson["catalog"]["dataset"][j]["variables"]["variable"][i]["$"]["name"] = catalogjson["catalog"]["dataset"][j]["variables"]["variable"][i]["$"]["name"].replace("$1",key); 
				catalogjson["catalog"]["dataset"][j]["variables"]["variable"][i]["$"]["label"] = catalogjson["catalog"]["dataset"][j]["variables"]["variable"][i]["$"]["label"].replace("$1",key); 
			}
			console.log(key + ":" + STARTSTOP[key]);
			j = j+1;
		}
	}
	var builder = new xml2js.Builder();
	var catalogxml = builder.buildObject(catalogjson);

	fs.writeFileSync("./USGS_Mag_RT_"+cadence+"-tsds.xml",catalogxml);
	console.log("Wrote "+"./USGS_Mag_RT_"+cadence+"-tsds.xml");
}

function extractdata(body,what,station) {
	jsdom.env({
		html: body,
		scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js'],
		done: function(err, window) {

			if (err) {
				console.log("Error: "+err+" when processing data for "+station);
				Np = Np+1;
				return;
			}
			var $ = window.jQuery;

			if (what === "stations") {
				STATIONS = $('a').text().replace(/.*Directory(.*)/,'$1').split("/").slice(0,-1);
				console.log("Extracting station list.  Found "+STATIONS.length);
				getdirectory(STATIONS);
			} else {
				console.log("Extracting start/stop for " + station);
				var files = 
							$('a')
							.text()
							.replace(/.*Directory(.*)/,'$1')
							.replace(/\.min/g,".min,")
							.replace(/\.sec/g,".min,")
							.split(",")
							.slice(0,-1);

				if (files.length == 1) {
					var start = files[0].replace(/.*([0-9]{8}).*/,'$1');
					var stop = files[0].replace(/.*([0-9]{8}).*/,'$1');
					console.log(start + "/" + stop);
					STARTSTOP[station] = start + "/" + stop;
				} else if (files.length > 1) {
					var start = files[0].replace(/.*([0-9]{8}).*/,'$1');
					var stop = files[files.length-1].replace(/.*([0-9]{8}).*/,'$1');
					console.log(start + "/" + stop);
					STARTSTOP[station] = start + "/" + stop;
				} else {
					console.log("No files for "+station)
					STARTSTOP[station] = "";
				}
				if (Np == STATIONS.length) {
					populatetemplate();
				} else {
					Np = Np+1;
				}
			}

		}
	});
}

function getdirectory(stations) {
	if (stations.length == 0) return
	station = stations.shift();
	var url = 'http://magweb.cr.usgs.gov/data/magnetometer/'+station+dir;
	console.log("Requesting data from " + url);

	request.get(url,
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("Received data from " + url);
				extractdata(body,"startstop",station);
				getdirectory(stations)
			} else {
				console.log("Error when attempting to get " + url);
			}
		})
}

