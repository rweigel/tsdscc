var xml2js  = require('xml2js');
var fs      = require('fs');
var request = require("request");

//var keyre = /^AC_H1_SIS/;
var keyre = /^AC_|^OMNI|^PO/;
//var keyre = /^PO_K1_VIS/;

//var keyre = /^AC_H0_MFI/;
//var keyre = /^PO/;
//var keyre = /.*/;
//var keyre = /^AC_H0_MFI|^AC_H1_SIS/;

var IDs = [];
var json = {};
json.DatasetDescription = [];

var N = 0;
var baseurl = "https://cdaweb.gsfc.nasa.gov/WS/cdasr/1/dataviews/sp_phys/datasets/";

reqobj = {uri: baseurl,headers: {'Accept':'application/json'}};
console.log("Requesting: " + baseurl)

function savejson(json,i) {
	// Save individual file
	var fname = "json/"+json.DatasetDescription[i].Id+".json";
	console.log("Writing "+fname);
	fs.writeFileSync(fname,JSON.stringify(json.DatasetDescription[i],null,"\t"));
	console.log("Done.");
}

request(reqobj, function (err,res,body) {

	console.log("Recieved: " + baseurl)
	console.log("---")
	jsonAll = JSON.parse(body);
	// Number of datasets
	Nall = jsonAll.DatasetDescription.length;

	// Select subset of datasets (for testing)
	var k = 0;
	for (var j = 0;j < Nall;j++) {
		IDs[j] = jsonAll.DatasetDescription[j].Id;
		if (keyre) {
			//console.log(jsonAll.DatasetDescription[j].Id)
			if (jsonAll.DatasetDescription[j].Id.match(keyre)) {
				json.DatasetDescription[k] = jsonAll.DatasetDescription[j];
				k = k+1;
			} 
		} else {
			json.DatasetDescription[k] = jsonAll.DatasetDescription[j];
			k = k+1;				
		}
	}
	var fname = "CDAWeb-IDs.json";
	console.log("Writing "+fname);
	fs.writeFileSync(fname,IDs.join("\n"));
	console.log("Done.");

	// Number of datasets to get.
	getvariables.N = json.DatasetDescription.length;

	getvariables.Ndone = 0;

	// When one 0th dataset is complete, getvariables(1) is called.
	getvariables(0); 
});

function getvariables(i) {

	if (i == getvariables.N) {
		return;
	}
	//console.log(json.DatasetDescription[i])
	var url = baseurl+json.DatasetDescription[i].Id+"/variables";
	reqobj = {uri: url, headers: {'Accept':'application/json'}};

	console.log("Requesting: " + url.replace(baseurl,""));
	request(reqobj, function (err,res,body) {
		if (err) console.log(err);

		console.log("Received:"+url.replace(baseurl,""));
		getvariables.Ndone = getvariables.Ndone+1;

		jsonv = JSON.parse(body);

		if (!getfileinfo.N) {
			getfileinfo.N = [];	
			getfileinfo.Ndone = [];	
		}
		if (!jsonv.VariableDescription) {
			console.log("  Problem with " + url.replace(baseurl,""));
			console.log(jsonv);
			getvariables(i+1);
			return;
		}
		getfileinfo.N[i] = jsonv.VariableDescription.length;
		getfileinfo.Ndone[i] = 0;

		json.DatasetDescription[i].VariableDescription = jsonv.VariableDescription;

		// When one 0th dataset is complete, getvariables(1) is called.
		getvariableinfo(i,0);
	});
}

function getvariableinfo(i,j,Nh) {

	if (arguments.length < 3) {
		Nh = 1;
	}

	var End = new Date(new Date(json.DatasetDescription[i].TimeInterval.Start).getTime() + Nh*60*60*1000).toISOString()
	var url = baseurl 
				+ json.DatasetDescription[i].Id
				+"/data/"
				+json.DatasetDescription[i].TimeInterval.Start.replace(/[0-9][0-9][0-9]Z/,"Z").replace(/\:|-|\./g,"")
				+","
				+End.replace(/[0-9][0-9][0-9]Z/,"Z").replace(/\:|-|\./g,"")
				+"/"
				+encodeURIComponent(json.DatasetDescription[i].VariableDescription[j].Name)
				+"?format=text";

	reqobj = {uri: url, headers: {'Accept':'application/json'}};

	console.log("  Requesting: " + url.replace(baseurl,""));
	request(reqobj, function (err,res,body) {
		console.log("  Received " + url.replace(baseurl,""));

		if (err || !body) {
			body = "";
		}
		if (body === "" || body.match("Internal Server Error") || body.match("Bad Request") || body.match("No data available") || body.match("Not Found")) {
			console.log("Error with " + reqobj.uri.replace(baseurl,""));
			if (j < getfileinfo.N[i].length) {
				getvariableinfo(i,j+1);
			} else {
				getvariables(i+1);
			}
		} else {
			jsonf = JSON.parse(body);
			if (!jsonf.FileDescription) {
				console.log(jsonf)
				if (j < getfileinfo.N[i].length) {
					getvariableinfo(i,j+1);
				} else {
					getvariables(i+1);
				}
			} else {
				getfileinfo(i,j,jsonf.FileDescription[0].Name,Nh);				
			}
		}
	})
}

function getfileinfo(i,j,url,Nh) {
	console.log("  Requesting: " + url.replace(baseurl,""));

	request(url, function (err,res,body) {
		if (err) console.log(err)
		console.log("  Received: " + url.replace(baseurl,""));

		if (body.match("WARNING: Increase time period selected for listing.")) {
			console.log("Trying again with longer time range.");
			getvariableinfo(i,j,Nh*2);
			return;
		}

		lines = body.split("\n");
		var metadata = "";
		var varinfo = "";
		var dt = {};
		tlast = -1;
		for (var k = 0;k<lines.length;k++) {
			if (lines[k].match(/Warning/)) {
				console.log(lines[k]);
			}
			if (lines[k].match(/^\#/)) {
				metadata = metadata+lines[k]+"\n";
			}
			if (lines[k].match(/^dd/)) {
				varinfo = lines[k-3] 
							+ "\n" + lines[k-2] 
							+ "\n" + lines[k-1] 
							+ "\n" + lines[k] 
							+ "\n" + lines[k+1];
			}
			if (lines[k].match(/^[0-9][0-9]/)) {
				//console.log(varinfo);
				//console.log(lines[k]);
				ls = lines[k].split(/\s+/);
				ta = ls[1].split(/:|\./g);
				t = 60*60*1000*parseInt(ta[0]) 
						+ 60*1000*parseInt(ta[1]) 
						+ 1000*parseInt(ta[2]) 
						+ parseInt(ta[3]);
				if (tlast > 0) {
					dt[t-tlast] = true;
					//console.log(dt[t]);
				}
				tlast = t;
			}
		}
		if (Object.keys(dt).length == 1) {
			//console.log(Object.keys(dt))
		}
		//console.log(metadata)
		//console.log(varinfo)
		//console.log(Object.keys(dt))
		json.DatasetDescription[i].VariableDescription[j].Header = metadata;
		json.DatasetDescription[i].VariableDescription[j].VariableInfo = varinfo;
		json.DatasetDescription[i].VariableDescription[j].Cadence = Object.keys(dt).join(",");
		//json.DatasetDescription[i].VariableDescription[j].Lines = lines;

		getfileinfo.Ndone[i] = getfileinfo.Ndone[i]+1;

		if ( (getfileinfo.Ndone[i] == getfileinfo.N[i]) ) {
			if ((getvariables.Ndone == getvariables.N) || (i == getvariables.N-1)) {
				savejson(json,i);
			} else {
				savejson(json,i);
				getvariables(i+1);
			}
		} else {
			getvariableinfo(i,j+1);
		}

	});
}

function savejson(json,i) {
	// Save individual file
	var fname = "json/"+json.DatasetDescription[i].Id+".json";
	console.log("Writing "+fname);
	fs.writeFileSync(fname,JSON.stringify(json.DatasetDescription[i],null,"\t"));
	console.log("Done.");
}
