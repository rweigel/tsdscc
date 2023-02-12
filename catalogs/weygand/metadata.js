var fs   = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var expandDD = require(__dirname + '/node_modules/tsdsdd/expandDD.js').expandDD

// Common parameters.
var post  = "&catalogID=Weygand/PropagatedSolarWind&catalogLabel=Weygand SW Propagation Data Set&columns=7,8,9,10,11,12&columnIDs=Bx-GSM,By-GSM,Bz-GSM,x-GSM,y-GSM,z-GSM&columnUnits=nT,nT,nT,Re,Re,Re&fillValues=NaN"
var base  = "http://vmo.igpp.ucla.edu/data1/Weygand/PropagatedSolarWindGSM/weimer/Geotail"


var id    = 'weimer/Geotail/GSM/mag'
var DD1   = "uri=" + base + "/mag/$Y/geotailmagP$Y$m.dat&datasetID="+id+"/part1&timeFormat&stop=2007-05-31T23:59:00.000Z&timeFormat=$Y $m $d $H $M $S.$(millis)" + post;
var fname = 'Weygand/PropagatedSolarWind/'+id+'part1/PT60S.json';
mkdirp(path.dirname(fname))
createjson(DD1, fname);

var DD2  = DD1
			.replace("NaN","1e34")
			.replace("part1","part2")
			.replace("stop=2007-05-31T23:59:00.000Z","start=2007-06-01")
			.replace("timeFormat=$Y $m $d $H $M $S","timeFormat=$d $m $Y $H $M $S")
var fname = 'Weygand/PropagatedSolarWind/'+id+'/part2/PT60S.json';
mkdirp(path.dirname(fname))
createjson(DD2, fname);

var id    = 'weimer/Geotail/GSM/mag_cpi'
var DD3   = "uri=" + base + "/mag_cpi/$Y/geotailmagP$Y$m.dat&datasetID="+id+"/part1&timeFormat&stop=2010-12-31T23:59:00.000Z&timeFormat=$Y $m $d $H $M $S.$(millis)" + post;
var fname = 'Weygand/PropagatedSolarWind/'+id+'/part1/PT60S.json';
mkdirp(path.dirname(fname))
createjson(DD3, fname);

var DD4  = DD3
			.replace("NaN","1e34")
			.replace("part1","part2")
			.replace("stop=2010-12-31T23:59:00.000Z","start=2011-01-01")
			.replace("timeFormat=$Y $m $d $H $M $S","timeFormat=$d $m $Y $H $M $S")
var fname = 'Weygand/PropagatedSolarWind/'+id+'/part2/PT60S.json';
mkdirp(path.dirname(fname))
createjson(DD4, fname);

function finish() {
	if (!finish.Nc) {finish.Nc = 0}
	finish.Nc = finish.Nc + 1;
	if (finish.Nc == 4) {
		process.exit(0);
	}
}

function createjson(DD, fname) {
	console.log('\n----\n');
	console.log('Calling expandDD with query string: ' + DD);
	expandDD({queryString: DD, debug: true}, function (err, cat) {
		console.log('Output: ');
		if (err) {
			console.log(err);
		}
		if (!err) {
			//console.log(JSON.stringify(cat, null, 4));
		}
		fs.writeFileSync(fname, JSON.stringify(cat, null, 4));
		console.log("Wrote " + fname)
		console.log('\n----\n');
		finish();
	})
}
