// TODO: Create separate catalog for 1986-01-01 to April 1, 2005 data
// 		 (CANOPUS data has different format (flag) and 5-second cadence)
// TODO: Modify catalog to have column for quality flag ("." means OK -
// 		 see header of a CANOPUS file)
// TODO: Iterate over each month starting April 1, 2005. (CARISMA data)
// TODO: Check if file exists and don't re-download by default.

var catalog = "CARISMA";
//var catalog = "CANOPUS";

var request = require('request');
var jsdom   = require("jsdom").jsdom;
var fs      = require('fs');
var moment  = require('moment');
var unzip   = require('unzip');
var zlib    = require('zlib');

var tmpdir  = "./tmp/";
var Np      = "12"; // Number of processors to use for gzipping files.
var debug   = false;

var username = "rweigel";
var password = "tank1girl";

// TODO: Need to extract this by inspecting form.  See TODO below.
var userid   = "270";	

// Re-request and process zip file if overwrite = true.
var overwrite = false;	

// Test small file.
if (false) {
	var Ns   = 30;
	var list = [];
	var ext = "MAG";
	list[0] = ["1986-02-01","1986-02-28","28"];
	getdata(list);
	return;
}

if (catalog === "CARISMA") {
	var yearo = 2005;
	var yearf = 2009;
	var montho = 10;
	var monthf = 12;
	var ext    = "F01";
	// Time to before first check and subsequent checks for zip file.
	var Ns     = 60;
} else {
	var yearo = 1986;
	var yearf = 2005;
	var montho = 0;
	var monthf = 3;
	var ext    = "MAG";
	var Ns     = 15;
}

var list = [];
var k = 0;
for (var year = yearo; year < yearf+1;year++) {	
	if (year == yearo) {mo = montho;} else {mo = 0;}
	if (year == yearf) {mf = monthf;} else {mf = 12;}
	for (var i = mo;i<mf;i++) {
		var start_date = moment([year,0,1]).add(i,'months').toISOString().substring(0,10);
		var end_date   = start_date;
		var end_date   = moment([year,0,1]).add(i+1,'months').add(-1,'days').toISOString().substring(0,10);
		var no_days    = new Date(year, i+1, 0).getDate();
		list[k] = [start_date,end_date,no_days];
		k = k+1;
	}
}
console.log(list);
login(list);

function fileexists(list) {
	var start_date = list[0][0];
	var end_date = list[0][1]
	var no_days = list[0][2];

	var fname = "./data/www.carisma.ca/zip/"+start_date+"_to_"+end_date+"_fgm_all_data.zip";
	if (fs.existsSync(fname)) {
		console.log("File "+fname+" found.  Not re-downloading.");
		return true;
	} else {
		console.log("File "+fname+" not found.  Requesting.\n");
		return false;
	}
}

function getdata(list,Cookie) {

	if (list.length == 0) return;
	var start_date = list[0][0];
	var end_date = list[0][1]
	var no_days = list[0][2];

	var zipexists = fileexists(list);

	if (zipexists) {
		list.shift();
		getdata(list,Cookie);
		return;
	}

	var form3 =
		{
			have_user: "1",
			user_id: userid,
			selected_data: "1",
			sites_set: "1",
			instrument_type: "fgm",
			start_date: start_date,
			no_days: no_days,
			sites_req: "all"
		};
	var options3 =
		{
			"url": "https://www.carisma.ca/index.php/carisma-data-repository",
			"headers":
				{
					'Cookie': Cookie,
					"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36"
				},
			"rejectUnauthorized": false,
			"form": form3
		};

	console.log("Sending POST request:");
	console.log(options3);
	console.log("");

	// Submit data request.
	request.post(options3,
		function (err, res, body) {

			if (err) console.log(err);
			console.log("POST response headers:")
			console.log(res.headers);
			console.log("");
			if (debug) console.log(body);

			var fname = start_date+"_to_"+end_date+"_fgm_all_data.zip";
			var options4 = {
				"rejectUnauthorized": false,
				"url": "https://www.carisma.ca/downloads/"+fname+"?",
				"headers": {"Cookie": Cookie,"Accept-Encoding": "gzip,deflate,sdch", "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36"}
			};

			console.log("Submitted request.  Checking for "+options4.url+" in "+Ns+" seconds");
			var Ntries = 0;
			var si = setInterval(check404,Ns*1000);

			// Check for availability of data.
			function check404() {

				if (Ntries > 5) {
					Ntries = 0;
					clearTimeout(si);

					list.shift();
					getdata(list,Cookie);
					return;
				}
				if (Ntries == 5) {
					if options4.url.match("10-31") {
						// Sometimes file created is for 10-01_to_10-30 days in October when
						// start=10-01 and no_days = 31.
						// Will need to do a separate download for 10-31.
						options4.url = options4.url.replace("-31","-30");
						console.log("Trying with -31 replaced with -30 in download file name.\n");
					}
					if options4.url.match("11-30") {
						// Sometimes file created is for 11-01_to_11-29 days in November when
						// start=11-01 and no_days = 30.
						// Will need to do a separate download for 11-30.
						options4.url = options4.url.replace("-30","-29");
						console.log("Trying with -30 replaced with -29 in download file name.\n");
					}
				}
				console.log("Sending HEAD request: ");
				console.log(options4);
				console.log("");
				request.head(options4, function (err,res,body) {

					if (err) console.log(err);
					// Will get 404s until zip file is available.
					if (res.statusCode != 404) {
						console.log("File available.  Downloading.");

						clearTimeout(si);
						var r = request
									.get(options4)
									.pipe(fs.createWriteStream(tmpdir+fname));
						r.on("finish",function () {
							console.log("Wrote " + tmpdir + fname);

							list.shift();

							//setTimeout(function () {getdata(list,Cookie)},1000*60*60);
							//getdata(list,Cookie);
							login(list);
							processzip(fname);
						});
					} else {
						console.log("File not found.  Try again in "+Ns+" seconds.");
						Ntries = Ntries + 1;
					}

				});
			}
		}
	);
}

function login(list) {
	if (list.length == 0) return;
	var zipexists = fileexists(list);

	if (zipexists) {
		list.shift();
		login(list);
		return;
	}

	// "rejectUnauthorized": false is to prevent certificate error.
	// Equivalent to curl -k.
	var options = 
		{
			"rejectUnauthorized": false,
			url: "https://carisma.ca/component/users/?view=login"
		};

	// Get log-in page.
	console.log("Sending GET request: ");
	console.log(options);
	console.log("");
	request.get(options,
		function (err, res, body) {

			console.log("Response headers from GET request:")
			console.log(res.headers);
			console.log("");

			// Read page with jQuery.
			jsdom.env({
				html: body,
				scripts: ['http://code.jquery.com/jquery-1.6.min.js'],
				done: function (err, window) {

					if (err) console.log(err);
					//console.log(body)
					// Extract cookie and hidden form information in log-in page.
					var $ = window.jQuery;

					var hidden = $("fieldset input[type*='hidden']");

					if (debug) console.log($(hidden[0]).attr("value"));
					if (debug) console.log($(hidden[1]).attr("name"));
					if (debug) console.log($(hidden[1]).attr("value"));
					if (debug) console.log(res.headers["set-cookie"][0]);

					var form2 = 
						{
							'username': username,
							'password': password,
							'return': $(hidden[0]).attr("value")
						};

					form2[$(hidden[1]).attr("name")] = $(hidden[1]).attr("value");

					var Cookie = res.headers["set-cookie"][0];
					var options2 = 
						{
							"url": "https://carisma.ca/component/users/?task=user.login",
							"rejectUnauthorized": false,
							"form": form2,
							"headers": {'Cookie': Cookie, "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36"}
						};

					console.log("Sending POST request:");
					console.log(options2);
					console.log("");

					// Log-in POST request.
					request.post(options2, function (err,res,body) {

						// console.log(body)
						// TODO: Get this to work.  When working,
						// have code that follows executed as callback.
						// getuserid(Cookie);

						if (err) console.log(err);
						console.log("Response headers from POST request:")
						console.log(res.headers);
						console.log("");

						getdata(list,Cookie);
					});
				}
			});
		}
	);
}

function processzip (fname , cb) {

	console.log("Extracting files from " + fname + " and gzipping them.");

	var sys = require('sys')
	var exec = require('child_process').exec;
	function puts(error, stdout, stderr) { 
		if (error) {console.log(error); return;}
		if (stderr) {console.log(stderr); return;}
		//console.log("Finished extracting files from " + fname + " and gzipping them.");
	}

	var com = "cd "+tmpdir+"; unzip " + fname + "; ls -1 *."+ext+" | xargs -i -P "+Np+" gzip --fast {}; mv *.gz "+__dirname+"/data/www.carisma.ca/FGM;mv "+fname+" "+__dirname+"/data/www.carisma.ca/zip";

	console.log("Evaluating " + com);

	exec(com, puts);

	return;

	// Too slow.
	console.log("Extracting files from "+fname);
	fs.createReadStream(fname)
		.pipe(unzip.Parse())
		.on('entry', function (entry) {
			var gzip = zlib.createGzip();

	    	var fileName = entry.path;
	    	var type = entry.type; // 'Directory' or 'File'
	    	var size = entry.size;
			console.log("Gzipping "+ fileName);
			entry.pipe(gzip).pipe(fs.createWriteStream('./tmp/'+fileName+".gz"));
			//entry.pipe(fs.createWriteStream('./tmp/'+fileName));
		})
		.on('finish', function () {cb();})
}

function getuserid (Cookie) {
	// Does not work.  Returns the login page instead of page seen after loggin in and
	// browsing to https://www.carisma.ca/carisma-data-repository
	var options2 =
		{
			"url": "https://www.carisma.ca/carisma-data-repository",
			"headers": {'Cookie': Cookie, "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36"},
			"rejectUnauthorized": false,
		};
	request.get(options,function (err,res,body) {
			console.log(body)
			jsdom.env({
				html: body,
				scripts: ['http://code.jquery.com/jquery-1.5.min.js'],
				done: function(err, window) {
					var $ = window.jQuery;
					var userid = $("input[name*='userid']").attr('value');
					console.log("---++++")
					console.log("userid = " + userid);							
				}
			});
		}
	);
}