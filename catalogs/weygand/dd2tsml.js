var fs   = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var expandDD = require(__dirname + '/node_modules/tsdsdd/expandDD.js').expandDD

// Common parameters.
var post  = "&catalogID=Weygand/PropagatedSolarWind&catalogLabel=Weygand SW Propagation Data Set&columns=7,8,9,10,11,12&columnIDs=Bx-GSM,By-GSM,Bz-GSM,x-GSM,y-GSM,z-GSM&columnUnits=nT,nT,nT,Re,Re,Re&columnFills=1e34"
var base  = "http://vmo.igpp.ucla.edu/data1/sandbox/Weygand/Wind/MFI/Propagated.3DP/GSM/V3/"

var id    = 'Wind/MFI/Propagated.3DP/GSM/V3'
var DD1   = "uri=" + base + "$Y/windmagP$Y$m.dat&datasetID="+id+"&timeFormat=$d $m $Y $H $M $S" + post;
var fname = 'Weygand/PropagatedSolarWind/'+id+'/PT60S.json';
mkdirp(path.dirname(fname))
createjson(DD1, fname);

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
