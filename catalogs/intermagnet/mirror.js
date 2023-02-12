// To check each file and each day, set Nd = 1;
// Better to use http://intermagnet.org/data-donnee/download-eng.php#view to get list of 
// available data and then request only files that exist.

var mirrordir = "./data/";
var type      = "v";
var cadence   = process.argv[2] || "PT1M";
var k         = parseInt(process.argv[3]) || 1; // Which magnetometer in list to mirror.

var request = require('request');
var fs      = require('fs');
var exec    = require('child_process').exec;
var spawn   = require('child_process').spawn;
var path    = require('path');

var expandISO8601Duration = require(__dirname + "/../../../../tsdset/lib/expandtemplate").expandISO8601Duration;
var expandtemplate = require(__dirname + "/../../../../tsdset/lib/expandtemplate").expandtemplate;

// Download file has name dataYYYYMMDDHHMMSS.zip, where date/time in name is determed by request time.
// (This prevents duplicate files.)

var sleepint = 1000; 

if (cadence.match("PT1M")) {
	var urlo = "http://intermagnet.org/data-donnee/download-2-eng.php?rate=minute&type=variation&format=IAGA2002&from_year=$Y&from_month=$m&from_day=$d&to_year=$Y&to_month=$m&to_day=$d&filter_region%5B%5D=America&filter_region%5B%5D=Asia&filter_region%5B%5D=Europe&filter_region%5B%5D=Pacific&filter_region%5B%5D=Africa&filter_lat%5B%5D=NH&filter_lat%5B%5D=NM&filter_lat%5B%5D=E&filter_lat%5B%5D=SM&filter_lat%5B%5D=SH&select_all%5B%5D=TLC"; 
	var Nd   = parseInt(process.argv[4]) || 180;
} else {
	var urlo = "http://intermagnet.org/data-donnee/download-2-eng.php?rate=second&type=variation&format=IAGA2002&from_year=$Y&from_month=$m&from_day=$d&to_year=$Y&to_month=$m&to_day=$d&filter_region%5B%5D=America&filter_region%5B%5D=Asia&filter_region%5B%5D=Europe&filter_region%5B%5D=Pacific&filter_region%5B%5D=Africa&filter_lat%5B%5D=NH&filter_lat%5B%5D=NM&filter_lat%5B%5D=E&filter_lat%5B%5D=SM&filter_lat%5B%5D=SH&select_all%5B%5D=TLC"; 
	var Nd   = parseInt(process.argv[4]) || 50;
}

var lines = fs.readFileSync("catalog_"+cadence+".txt");
var list  = lines.toString().split("\n");
var mag = list[k-1].split(" ")[0];

if (Nd == 1) {
	// Requesting one day of data at a time.
	var missing = {};
	data = fs.readFileSync("catalog_"+cadence+"_full.json");
	tmp = JSON.parse(data);
	for (var i = 0;i<tmp.length;i++) {
		for (key in tmp[i]) {
			if (!key.match(mag)) {
				continue;
			}
			//console.log(i + " " + key);
			for (key2 in tmp[i][key]) {
				if (tmp[i][key][key2]["available"]) {
					fname = tmp[i][key][key2]["filename"];
					var dir = mirrordir+fname.substring(0,3).toUpperCase()+"/"+cadence;
					//console.log("Checking " + dir + "/" + fname)
					var e1 = fs.existsSync(dir + "/" + fname);
					var e2 = fs.existsSync(dir + "/" + fname + ".gz");
					if (e1 || e2) {
						missing[fname] = false;
						//console.log("Found: " + dir + "/" + fname)
					} else {
						missing[fname] = true;
						console.log("Missing: " + dir + "/" + fname);
					}
				}
			}
		}
	}
}


if (0) {
	// Request by name
	if (process.argv[3]) {
		if (process.argv[3].match(/[A-Z]/)) {
			runone = false;
			for (var i = 0;i < list.length;i++) {
				if (process.argv[3] === list[i].split(" ")[0]) {
					var km = i;
				}
			}
			var listx = [];
			listx[0] = list[km];
			list = listx;
			k = 1;
		}
	}
}

get();

function get(urls,files) {

	if (arguments.length == 0) {
		var urls   = [];
		var filesa = [];
		var filesc = [];
		var files  = [];
		var starts = [];
		var stops  = [];

		// Three Letter Code
		TLC = list[k-1].split(" ")[0];

		var options = {};
		if (cadence.match("PT1M")) {
			var tmp = "&select%5B%5D=TLClc$Y$m$d"+type+"min.min.gz";
			options.template = tmp.replace("TLClc",TLC.toLowerCase());
		} else {
			var tmp = "&select%5B%5D=TLClc$Y$m$d"+type+"sec.sec.gz";
			options.template = tmp.replace("TLClc",TLC.toLowerCase());
		}
		
		options.check    = false;
		options.side     = "server";
		options.type     = "strftime";
		options.timeRange = list[k-1].split(" ")[1] + "/" + list[k-1].split(" ")[2];
		
		if (new Date(options.stop).getTime() < new Date(options.start).getTime()) {
			options.timeRange = list[k-1].split(" ")[2] + "/" + list[k-1].split(" ")[1];
		}
		//console.log(options);

		// Full list of files over available time range.
		filesa = expandtemplate(options);

		// Get last day
		options.timeRange = list[k-1].split(" ")[2] + "/" + list[k-1].split(" ")[2];
		filesa = filesa.concat(expandtemplate(options));

		z = 0;
		for (j = 0;j<filesa.length;j=j+Nd) {
			filesc[z] = "";
			if (filesa[j]) {
				files[z] = filesa[j].replace("&select%5B%5D=","");
				starts[z] = filesa[j].replace(/.*([0-9]{8}).*/,"$1");
			}
			if (filesa[j+Nd-1]) { 
				stops[z] = filesa[j+Nd-1].replace(/.*([0-9]{8}).*/,"$1");
			} else {
				stops[z] = filesa[filesa.length-1].replace(/.*([0-9]{8}).*/,"$1");
			}
			for (i=j;i<j+Nd;i++) {
				filesc[z] = filesc[z]+filesa[i];
			}
			z = z+1;
		}

		// Each element of filessc contains a list of Nd files to be used in a request.

		// Remove undefined elements.
		filesc[z-1] = filesc[z-1].replace(/undefined/g,"");

		// Create a URL array of the same size as filesc.
		for (var j = 0;j<filesc.length;j++) {
			urls[j] = urlo+filesc[j]+"&email=rweigel%40gmu.edu&accept=accept";

			urls[j] = urls[j]
						.replace("from_year=$Y","from_year="+starts[j].substring(0,4))
						.replace("from_month=$m","from_month="+starts[j].substring(4,6))
						.replace("from_day=$d","from_day="+starts[j].substring(6,8))
						.replace("to_year=$Y","to_year="+stops[j].substring(0,4))
						.replace("to_month=$m","to_month="+stops[j].substring(4,6))
						.replace("to_day=$d","to_day="+stops[j].substring(6,8))
						.replace("TLC",TLC);
		}
	}	

	// The following leads to maximum call stack problems (even after increasing --max-stack-size)
	// if (urls.length == 0) {get(k+1);return;}
	// Instead, do this:
	function getmore() {
		var com = "node mirror.js " + cadence + " " + (k+1) + " " + Nd;
		console.log("Executing " + com);
		child = exec(com, {maxBuffer:300000*1024},function (error, stdout, stderr) {
			if (error)
				console.log(error);
		})
		child.stdout.on('data', function (data) {
	  		console.log(data.replace(/\n$/,""));
		});
	}

	if (urls.length == 0) {
	    if (k<list.length) {
			getmore();
			return;
	    } else {
			return;
	    }
	}

	if (0) {
	    if (fs.existsSync(files[0]) || fs.existsSync(files[0].replace(".gz",""))) {
			console.log("Skipping request because first file " + files[0] + " found");
			urls.shift();
			files.shift();
			get(urls,files);
	    }
	}

	if (Nd == 1) {
		if (missing[files[0]] || missing[files[0].replace(".gz","")]) {
	    	//console.log("File is missing.  Will request.");
	    } else {
			console.log("Skipping request because file " + files[0] + " found");
			urls.shift();
			files.shift();
			get(urls,files);
			return;
		}
	} else {
		// TODO: Check if all files are there. If they are, don't do request.
	}

	var TLC = files[0].substring(0,3).toUpperCase();
		
	// Make query for zip file
	console.log("Requesting "+urls[0].replace(/%5B%5D/g,"[]").replace(/%40/g,"@"));

	request.get(urls[0].replace(/%5B%5D/g,"[]").replace(/%40/g,"@"), function (error, response, body) {

		if (error) {
		    console.log(error);
		    if (urls.length > 0) setTimeout(function () {get(urls,files)},sleepint);
		    return;
		}

	    if (response.statusCode == 200) {

	    	// Find zip file name in responsse
	    	var str = body.replace(/\r\n|\n|\r/g,"").replace(/.*(app.*zip).*/g,"$1");
		zipfile = "http://www.intermagnet.org/" + str;
		fname = zipfile.replace(/.*products\/\/(.*)/,"$1");

		f1 = mirrordir+TLC+"/"+cadence+"/"+files[0].replace(".gz","");
		f2 = mirrordir+TLC+"/"+cadence+"/"+files[0].replace(".gz","") + ".gz";

		var dir = mirrordir+TLC+"/"+cadence+"/";

		// Extract contents of zipfile
		var com = " mkdir -p " + dir + "; curl " + zipfile + " > "+dir+fname+";cd "+dir+";unzip -q -o "+fname+";rm -f "+fname;
		console.log(files.length + " Evaluating "+com);

		child = exec(com, function (error, stdout, stderr) {
			if (error) console.log(error);
			if (stdout) console.log(stdout);
			if (stderr) console.log(stderr);
			if (!fs.existsSync(f1) && !fs.existsSync(f2)) {
			    console.log(files.length + " 1. Did not find " + f1);
			    console.log(files.length + " 1. Did not find " + f2);
			    if (Nd == 1) {
				fs.writeFileSync(mirrordir+TLC+"/"+cadence+"/"+files[0]+".x","");
			    }
			    if (files[0].match(".gz")) {
				urls[0]  = urls[0].replace(/\.gz/g,"");
				files[0] = files[0].replace(".gz","");
				console.log(files.length + " Trying without gz extension in URL.");
				//if (urls.length == 0) getmore(k);
				setTimeout(function () {get(urls,files)},sleepint);
				return;
			    }
			}
	
			f1 = mirrordir+TLC+"/"+cadence+"/"+files[0].replace(".gz","");
			f2 = mirrordir+TLC+"/"+cadence+"/"+files[0].replace(".gz","") + ".gz";

			if (!fs.existsSync(f1) && !fs.existsSync(f2)) {
			    console.log(files.length + " 2. Did not find " + f1);
			    console.log(files.length + " 2. Did not find " + f2);
			    console.log(files.length + " Fail.  Writing "+mirrordir+TLC+"/"+cadence+"/"+files[0]+".x");
			    if (Nd == 1) {
				fs.writeFileSync(mirrordir+TLC+"/"+cadence+"/"+files[0]+".x","");
			    }
			} else {
			    console.log(files.length + " Success!!!!!  Done downloading.");
			}
			urls.shift();
			files.shift();
			console.log("______________________");
			
			//if (urls.length == 0 && runall) getmore(k);
			setTimeout(function () {get(urls,files)},sleepint);
		    });
	    }
	});
}

