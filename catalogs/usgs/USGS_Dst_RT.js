var request = require('request');
var jsdom   = require("jsdom").jsdom;
var crypto  = require('crypto');
var fs      = require('fs');
var xml2js  = require('xml2js');

var cadence = process.argv[2] || "PT1M";

if (cadence === "PT1M") {
	var url = 'http://magweb.cr.usgs.gov/data/indices/beta/Dst_minute/';
} else {
	var url = 'http://magweb.cr.usgs.gov/data/indices/beta/Dst_hour/';
}

console.log("Requesting data from " + url);
request.get(url,
		function (error, response, body) {
		if (error) {
			console.log(error);
		}
		if (!error && response.statusCode == 200) {
				console.log("Done.");
				extractdata(body);
			}
		}
);

function populatetemplate(STARTSTOP) {

	console.log("./templates/USGS_RT_Dst_"+cadence+"-template.json")
	catalogjson = JSON.parse(fs.readFileSync("./templates/USGS_Dst_RT_"+cadence+"-template.json"));

	catalogjson["catalog"]["documentation"][2]["$"]["xlink:title"] += (new Date()).toISOString();

	var Start = STARTSTOP.split("/")[0];
	catalogjson["catalog"]["dataset"][0]["timeCoverage"]["Start"] = Start.substring(0,4) + "-" + Start.substring(4,6) + "-" + Start.substring(6,8);
	var End = STARTSTOP.split("/")[1];
	catalogjson["catalog"]["dataset"][0]["timeCoverage"]["End"] = End.substring(0,4) + "-" + End.substring(4,6) + "-" + End.substring(6,8);

	var builder = new xml2js.Builder();
	var catalogxml = builder.buildObject(catalogjson);

	fs.writeFileSync("./USGS_Dst_RT_"+cadence+"-tsds.xml",catalogxml);
	console.log("Wrote "+"./USGS_Dst_RT_"+cadence+"-tsds.xml");
}

function extractdata(body) {
	jsdom.env({
		html: body,
		scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js'],
		done: function(err, window) {

			if (err) {
				console.log("Error: "+err+" when processing data.")
			}
			var $ = window.jQuery;

			console.log("Extracting start/stop");
			var files = 
						$('a')
						.text()
						.replace(/.*Directory(.*)/,'$1')
						.replace(/\.min/g,".min,")
						.replace(/\.hour/g,".min,")
						.split(",")
						.slice(0,-1);

			if (files.length == 1) {
				var start = files[0].replace(/.*([0-9]{8}).*/,'$1');
				var stop = files[0].replace(/.*([0-9]{8}).*/,'$1');
				STARTSTOP = start + "/" + stop;
			} else if (files.length > 1) {
				var start = files[0].replace(/.*([0-9]{8}).*/,'$1');
				var stop = files[files.length-1].replace(/.*([0-9]{8}).*/,'$1');
				STARTSTOP = start + "/" + stop;
			} else {
				console.log("No files.")
				STARTSTOP = "";
			}
			console.log(STARTSTOP)
			populatetemplate(STARTSTOP);
		}
	});
}