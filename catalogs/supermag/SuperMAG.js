// Usage:
// Download catalog information files and then create catalogs.
//   node.js SuperMAG.js
// Create catalogs based on previous catalog download (SuperMAG.raw).
//   node.js SuperMAG.js false

var	fs      = require("fs");
var	request = require("request");
var	http    = require("http");
var xml2js  = require('xml2js');
var expand  = require("tsdset").expandtemplate;

// Not sure which one gets used.  Sets limit to number of simultaneous request.
// Server does not max given in header, but most Apache servers allow 100.
http.globalAgent.maxSockets = 50;
var options = {pool: {maxSockets: 50}};

var now   = new Date();
var stop  = now.toISOString().substring(0,10);
var start = "1980-01-01"

//var start = "2014-12-30"
//var stop  = "2015-01-02"

// TODO: start time should be determined automatically.
topts = {
	type       : "strftime",
	timeRange  : start+"/"+stop,
	indexRange : null, 
	debug      : false, 
	template   : "http://supermag.jhuapl.edu/archive/cat/$Y/$Y$m$d.xml"
}
urls = expand(topts); // Create a list of URLs

if (process.argv[2] === "true" || process.argv.length == 1) {
	getdata(); // Get data and parse into catalog.
} else {
	createcatalog(); // Just parse data into catalog.
}

// Request xml files (async) from all URLs in array "urls"
// Each URL contains a list of stations that have data available on a given day.
function getdata() {
	// Iterate of URL list.
	for (var i = 0;i<urls.length;i++) {
		// Request each URL and call urldone() when complete.
		request(urls[i], function(error, response, body) {
			if (!error && response.statusCode == 200) {
				//console.log("Downloaded "+response.request.uri.href);
				urldone(body,response.request.uri.href);
			} else {
				console.log("Problem downloading "+response.request.uri.href);
				urldone("",response.request.uri.href);
			}
		});
	}
}

// Read in OUT variable written by urldone() and create various catalogs.
function createcatalog() {
	var OUT2 = {};

	console.log("Reading SuperMAG.raw");
	var data = fs.readFileSync(__dirname + "/SuperMAG.raw");
	var data = JSON.parse(data);

	// data has structure {YYYYMMDD: [list of stations with data available on YYYYMMDD],
	// YYYYMMDD: [list of stations with data available on YYYYMMDD],...}

	// Get sorted list of keys (structure was populated async, so it will probably not be in order).
	var datekeys = [];
	for (var k in data) {
		datekeys.push(k);
	}
	datekeys.sort();

	// Find earliest start date for each TLC.
	// OUT2 will have structure {TLC: "", Start: "", End: ""}.
	for (var j=0;j<datekeys.length;j++) {  

		for (i=0;i<data[datekeys[j]].length;i++) {
			var tlc = data[datekeys[j]][i]; // Three-letter code (TLC) corresponding to station name
			if (typeof(OUT2[tlc]) === "undefined") {
				//console.log("Creating object "+tlc)
				OUT2[tlc] = {};
			}

			OUT2[tlc].End = datekeys[j];

			if (!OUT2[tlc].hasOwnProperty('Start')) {
				OUT2[tlc].Start = datekeys[j];
			}
		}

	}

	console.log("Reading SuperMAG-tsds-template.xml")
	var template = fs.readFileSync("SuperMAG-tsds-template.xml");
	var parser = new xml2js.Parser();

	// Create XML and JSON versions of TSDS catalog.
	console.log("Parsing SuperMAG-tsds-template.xml")
	parser.parseString(template, function (err, result) {

		if (err) console.log(err);

		var d = new Date();

		// Note: This is not robust against changes in this documentation node in the catalog.
		result["catalog"].documentation[2]["$"]["xlink:title"] = result["catalog"].documentation[2]["$"]["xlink:title"] + d.toISOString();

		// Dateset node template.
		var dataset = result["catalog"].dataset[0];

		// Create dataset nodes.
		var datasets = [];
		var j = 0;
		for (var k in OUT2) {
			datasets[j] = JSON.parse(JSON.stringify(dataset)); // Low performance deep copy.
			datasets[j]["$"].name = k;
			datasets[j]["$"].id = k;
			datasets[j]["$"].urltemplate = datasets[j]["$"].urltemplate.replace("$ID",k);
			var s = OUT2[k].Start;
			datasets[j].timeCoverage[0].Start = [s.substring(0,4)+"-"+s.substring(4,6)+"-"+s.substring(6,8)];
			var s = OUT2[k].End;
			datasets[j].timeCoverage[0].End = [s.substring(0,4)+"-"+s.substring(4,6)+"-"+s.substring(6,8)];
			j = j+1;
		}
		result["catalog"].dataset = datasets;

		// Write JSON version of TSDS catalog.
		console.log("Writing SuperMAG-tsds.json")
		fs.writeFileSync("SuperMAG-tsds.json",JSON.stringify(result));

		// Convert JSON object to XML.
		var builder = new xml2js.Builder();
		var xml = builder.buildObject(result);

		// Write XML version of TSDS catalog.
		console.log("Writing SuperMAG-tsds.xml")
		fs.writeFileSync("SuperMAG-tsds.xml",xml);

	});
}

// Called each time a request has completed.  When all requests complete, write SuperMAG.raw,
// which contains JSON represenation of each xml file downloaded.

// OUT is an object with keys of date and values of an array of stations available on that date.
var OUT = {};

function urldone(data, url) {

	
	if (!urldone.N) urldone.N = 0;
	urldone.N = urldone.N + 1;

	var id = url.replace(/.*\/([0-9]{8})\.xml/,"$1");
	
	if (data.length == 0) {
		OUT[id] = [];
		if (urldone.N == urls.length) {
			finish()
		}		
		return;
	}
	
	var parser = new xml2js.Parser();
	parser.parseString(data, function (err, result) {
		if (err) {
			console.log("Error parsing "+url);
			OUT[id] = [];
			return;			
		}
		console.log("Downloaded and parsed "+url)
		OUT[id] = result.cat.st;
		if (urldone.N == urls.length) {
			finish()
		}		
	})
	function finish() {
		// When all requests are complete, write file containing OUT and call createcatalog() to 
		// convert OUT to various forms of catalogs.
		console.log("Writing SuperMAG.raw");
		fs.writeFileSync("SuperMAG.raw",JSON.stringify(OUT));
		createcatalog();
	}
}