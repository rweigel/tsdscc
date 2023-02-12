var expandDD = require('./expandDD.js').expandDD
var moment = require('moment')

//https://github.com/samsonjs/strftime
var q = "uri=http://vmo.igpp.ucla.edu/data1/Weygand/PropagatedSolarWindGSE/weimer/Wind/TAP/V3/$Y/windTAP$Y$m.dat"
		+ "&start=1995-01-01"
		+ "&stop=2014-09-01"
		  "&timeFormat=$d $m $Y $H $M $S"

var q = q + "&columns=7,8,9,10"
		  + "&columnIDs=nxangle,nyangle,nzangle,Propagation flag"
		  + "&catalogLabel=Weygand SW Propagation Data Set"
		  + "&datasetID=spase://VMO/NumericalData/Weygand/Wind/TAP/Propagated.3DP/GSE/PT60S"
		  + "&fillValues=1e34"

var q = "uri=http://vmo.igpp.ucla.edu/data1/Weygand/PropagatedSolarWindGSE/weimer/Wind/TAP/V3/$Y/windTAP$Y$m.dat&start=1995-01-01&stop=2014-09-01&timeFormat=$d $m $Y $H $M $S"
		+"&columns=7,8,9,10,11"
		+"&columnIDs=nxangle,nyangle,nzangle,Propagation flag"
		+"&catalogLabel=Weigand SW Propagation Data Set"
		+"&datasetID=spase://VMO/NumericalData/Weygand/Wind/TAP/Propagated.3DP/GSE/PT60S"
		+"&fillValues=1e34"

var q = "uri=http://vmo.igpp.ucla.edu/data1/Weygand/PropagatedSolarWindGSE/weimer/Wind/TAP/V3/$Y/windTAP$Y$m.dat&start=1995-01-01&stop=2014-09-01&timeFormat=$d $m $Y $H $M $S"
		+"&columns=7,8,9,10"
		+"&columnIDs=nxangle,nyangle,nzangle,Propagation flag"
		+"&catalogLabel=Weigand SW Propagation Data Set"
		+"&datasetID=Weygand/Wind/TAP/Propagated.3DP/GSE/PT60S"
		+"&fillValues=1e34,1e34,1e34"

var q = "uri=http://localhost:8004/test/data/2015-11-20.txt&columns=2"

var q = "uri=http://localhost:8004/log/servers/SSCWeb/$Y-$m-$d.txt&start=-P10D&stop=P0D&columns=2&columnIDs=ResponseTime&columnUnits=ms&catalogLabel=SSCWeb server monitor"

var q = "uri=http://localhost:8004/test/data/$Y$m$d.dat&start=2012-01-01&stop=2001-01-06"

var q = "uri=http://localhost:8004/test/data/file1.dat&columns=2"

var q = "uri=http://localhost:8004/test/data/file1.dat&columns=2&start=2001-01-01&stop=2001-01-03"

var q = "uri=http://localhost:9999/test/data/Geotail/mag/$Y/geotailmagP$Y$m.dat&timeFormat=$d $m $Y $H $M $S&catalogLabel=Weygand SW Propagation Data Set&datasetID=Weygand/PropagatedSolarWindGSM/weimer/Geotail/mag&columns=7,8,9,10,11,12&columnIDs=Bx GSM,By GSM,Bz GSM,x GSM,y GSM,z GSM&columnUnits=nT,nT,nT,R_E,R_E,R_E&fillValues=NaN"

//var q = "stop=2007-05-31T23:59:00.000Z&uri=http://localhost:8004/test/data/Geotail/mag/$Y/geotailmagP$Y$m.dat&timeFormat=$Y $m $d $H $M $S&catalogLabel=Weygand SW Propagation Data Set&datasetID=Weygand/PropagatedSolarWindGSM/weimer/Geotail/mag&columns=7,8,9,10,11,12&columnIDs=Bx GSM,By GSM,Bz GSM,x GSM,y GSM,z GSM&columnUnits=nT,nT,nT,Re,Re,Re&fillValues=NaN"
//var q = q.replace("stop=2007-05-31T23:59:00.000Z","start=2007-06-01")
//var q = q.replace("timeFormat=$Y $m $d $H $M $S","timeFormat=$d $m $Y $H $M $S")
var q = 'uri=http://vmo.igpp.ucla.edu/data1/sandbox/Weygand/Wind/MFI/Propagated.3DP/GSM/V3/$Y/windmagP$Y$m.dat&timeFormat=$d $m $Y $H $M $S&columns=7,8,9,10,11,12&columnIDs=Bx-GSM,By-GSM,Bz-GSM,x-GSM,y-GSM,z-GSM&columnUnits=nT,nT,nT,Re,Re,Re&columnFills=1e34&catalogLabel=Weigand SW Propagation Data Set&datasetID=Weygand/Wind/MFI/Propagated.3DP/GSM/V3/';

console.log('\n----\n');
console.log('Calling expandDD with query string: ' + q);
expandDD({queryString: q, debug: true}, function (err, cat) {
	console.log('Output: ');
	if (err) {
		console.log(err);
	}
	if (!err) {
		console.log(JSON.stringify(cat, null, 4));
	}
	console.log('\n----\n');
	process.exit(0);
})
