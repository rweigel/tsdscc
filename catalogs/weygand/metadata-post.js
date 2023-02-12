var fs   = require('fs');
var path = require('path');

var fnames = 
	[
		'Weygand/PropagatedSolarWind/weimer/Geotail/GSM/mag_cpi/part1/PT60S.json',
		'Weygand/PropagatedSolarWind/weimer/Geotail/GSM/mag_cpi/part2/PT60S.json',
		'Weygand/PropagatedSolarWind/weimer/Geotail/GSM/mag/part1/PT60S.json',
		'Weygand/PropagatedSolarWind/weimer/Geotail/GSM/mag/part2/PT60S.json'
	];

combine(fnames, 'Weygand/PropagatedSolarWind/weimer/Geotail/GSM/');

function combine(fnames, outdir) {

	var fname = outdir + "PT60S.json";

	var obj = [];
	var cat = [];

	for (var i = 0; i < fnames.length; i++) {
		postprocess(fnames[i]);

		obj[i] = fs.readFileSync(fnames[i]);
		console.log("Read " + fnames[i])
		cat[i] = JSON.parse(obj[i].toString());
		if (i > 0) {
			cat[0]["catalog"]["dataset"][i] = cat[i]["catalog"]["dataset"][0];
		}
	}
	fs.writeFileSync(fname, JSON.stringify(cat[0], null, 4));
	console.log("Wrote " + fname)
}

function postprocess(fname) {

	var obj = fs.readFileSync(fname);
	console.log("Read " + fname)

	cat = JSON.parse(obj.toString());

	console.log("Original documentation node.")
	console.log(cat["catalog"]["documentation"])

	// catalog-level documentation
	cat["catalog"]["documentation"] = [];
	cat["catalog"]["documentation"][0] = {};
	cat["catalog"]["documentation"][0]["$"] = {};
	cat["catalog"]["documentation"][0]["$"]["xlink:href"] = "http://www.igpp.ucla.edu/jweygand/htmls/Propagated_SW.html"
	cat["catalog"]["documentation"][0]["$"]["xlink:title"] = "Solar Wind Propagation Information"

	// dataset-level documentation
	cat["catalog"]["dataset"][0]["documentation"] = []

	cat["catalog"]["dataset"][0]["documentation"][0] = {};
	cat["catalog"]["dataset"][0]["documentation"][0]["$"] = {};
	cat["catalog"]["dataset"][0]["documentation"][0]["$"]["xlink:href"] = "http://vmo.igpp.ucla.edu/data1/Weygand/PropagatedSolarWindGSM/weimer/Geotail/mag/header4dat"
	cat["catalog"]["dataset"][0]["documentation"][0]["$"]["xlink:title"] = "Metadata found in dataset directory."

	cat["catalog"]["dataset"][0]["documentation"][1] = {};
	cat["catalog"]["dataset"][0]["documentation"][1]["$"] = {};
	cat["catalog"]["dataset"][0]["documentation"][1]["$"]["xlink:href"] = "http://vmo.nasa.gov/mission/metadata/VMO/NumericalData/Weygand/Geotail/MGF/Processed/GSM/PT60S.xml"
	cat["catalog"]["dataset"][0]["documentation"][1]["$"]["xlink:title"] = "SPASE record for dataset."

	console.log("Modified documentation node.")
	console.log(cat["catalog"]["documentation"])
	
	fs.writeFileSync(fname, JSON.stringify(cat, null, 4));
	console.log("Wrote " + fname)
}