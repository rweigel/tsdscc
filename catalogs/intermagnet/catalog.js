var	yo      = 1999; // Assumes no data available before this year.
var cadence = process.argv[2] || "PT1M";
var type    = "v";

if (type === "v") {
	type = "variation";
}

var request = require('request');
var fs      = require('fs');

if (cadence.match("PT1M")) {
	var urlo = "http://www.intermagnet.org/apps/download/php/ajax/search_catalogue.php?rate=minute&type="+type+"&format=IAGA2002&from_year=YYYY&from_month=01&from_day=01&to_year=YYYY&to_month=12&to_day=31&region=America,Asia,Europe,Pacific,Africa&latid=NH,NM,E,SM,SH&_=1382398875837";
	var N = parseInt(new Date().toISOString().substring(0,4))-yo+1;
} else {
	var urlo = "http://www.intermagnet.org/apps/download/php/ajax/search_catalogue.php?rate=second&type="+type+"&format=IAGA2002&from_year=YYYY&from_month=01&from_day=01&to_year=YYYY&to_month=12&to_day=31&region=America,Asia,Europe,Pacific,Africa&latid=NH,NM,E,SM,SH&_=1382398875837";
	var N = parseInt(new Date().toISOString().substring(0,4))-yo+1;
}

var k = 0;
var cats = [];
var stas = {};

for (z = yo;z < yo+N;z++) {
	url = urlo.replace(/YYYY/g,""+z);
	get(url,z-yo);
	console.log("- Requesting " + url);
}

function get(url,y) {

	// Response for each year is JSON in form
	// [{"AAA":{"0":{"obs":"AAA","date":"2009-01-01","available":false,"filename":"aaa20090101vsec.sec"},
	//  ...
	//         "365":{"obs":"AAA","date":"2009-12-31","available":false,"filename":"aaa20091231vsec.sec"}}},
	//  ...
	//  {"YKC":{"0":{"obs":"YKC","date":"2009-01-01","available":false,"filename":"ykc20090101vsec.sec"}}}]

	request.get(url, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	console.log("+ Finished request for " + url);
			cats[y] = JSON.parse(body);	
	    }
	    k = k+1;
	    if (k == N) {
	    		fs.writeFileSync("catalog_"+cadence+"_full.json",JSON.stringify(cats));
	    		callback(cats);
	    	}	    	
	});
}

function callback(cats) {
	//var data = fs.readFileSync("catalog_"+cadence+"_full.json");
	//eval("cats =" + data);
	var urls = [];
	var list = [];
	var	z    = 0;

	// Find start/stop years
	for (j = 0; j<cats.length;j++) {
		for (var key in cats[j]) {
			for (var key2 in cats[j][key]) {
				if (cats[j][key][key2].available) {
				        // First encounter of station.
					if (typeof(stas[cats[j][key][key2]["obs"]]) === "undefined") {
						stas[cats[j][key][key2]["obs"]] = {};
						stas[cats[j][key][key2]["obs"]]["start"] = cats[j][key][key2]["date"];
					}
					stas[cats[j][key][key2]["obs"]]["stop"] = cats[j][key][key2]["date"];
				}
			}
		}
	}

	console.log("Station Start Stop")
	for (var key in stas) {
		list[z] = key + " " + stas[key]["start"] + " " + stas[key]["stop"]; 
		console.log(list[z]);
		z = z+1;
	}

	//fs.writeFileSync("catalog_"+cadence+".json","var list = " + JSON.stringify(list));
	fs.writeFileSync("catalog_"+cadence+".txt",list.join("\n"));
	console.log("Wrote catalog_"+cadence+".txt")
}
