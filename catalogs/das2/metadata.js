var request = require('request');
var fs      = require('fs');
var xml2js  = require('xml2js');

// Does not provide timeRange information (old server)
//var url = "http://planet.physics.uiowa.edu/das/das2Server?server=list";
var urlo = "http://jupiter.physics.uiowa.edu/das/server?";
var url  = urlo + "server=list";

var list

str = fs.readFileSync('header.txt').toString();
console.log(str.indexOf("<packet>"));

var xml= str.substring(str.indexOf("<packet>")+10, str.indexOf("</packet>"));
xml = "<root>" + xml + "</root>";
var parser = new xml2js.Parser();
parser.parseString(xml, function(err,result){
console.log(err)
  infox = result["root"]["x"];
  infoy = result["root"]["y"];
  console.log(infox)
  console.log(infoy)
});

return;

fs.exists('list.json', function (exist) {
	if (exist) {
		list = fs.readFileSync('list.json').toString();
		LIST = JSON.parse(list);
	}
	var key = "Juno/Ephemeris/Geocentric";
	var timeRange = LIST[key]["validRange"];
	var start = timeRange.replace(' to ',' ').split(" ")[0];
	var stop = timeRange.replace(' to ',' ').split(" ")[1].replace("now",(new Date()).toISOString().substring(0,10));
	var url = urlo + "server=dataset&dataset=" + key.replace(/\//g,"%2F");
	url = url + "&ascii=true&start_time=" + start + "T00%3A00%3A00.000Z&end_time=" + start + "T00%3A00%3A01.000Z"
	console.log(LIST[key])
	if (LIST[key]["requiresInterval"]) {
		if (LIST[key]["testInterval"]) {
			url = url + "&interval=" + LIST[key]["testInterval"];
		}
	}
	console.log(url)
	request.get(url, 
		function (err,res,list) {
			fs.writeFileSync('header.txt', list);
	})	
})

if (0) {
	fs.exists('list.txt', function (exist) {
		if (exist) {
			list = fs.readFileSync('list.txt').toString();
			console.log("Read list.txt");
			catalog(list.toString());
		} else {
			request.get(url, 
				function (err,res,list) {
					console.log("Wrote list.txt");
					fs.writeFileSync('list.txt', list);
					catalog(list);
				})
		}
	})
}

LIST = {};
function catalog(list) {
	console.log(list)
	lista = list.split(/\r\n/);
	for (var i = 0; i < lista.length; i++) {
		row = lista[i].split("|");
		if (!row[0].match(/\/$/) &&  row[0] !== '') {
			LIST[row[0]] = {};
			LIST[row[0]]["label"] = row[1] || ""
		}
	}
	dsdf(LIST);
}

function dsdf(LIST) {
	var N = Object.keys(LIST).length;
	var Ndone = 0;

	for (var key in LIST) {
		url = urlo + "server=dsdf&dataset=" + key.replace(/\//g,"%2F");
		getandparse(key, url)
	}

	function getandparse(key, url) {
		console.log("Getting " + url);
		request.get(url, 
			function (err,res,list) {
				Ndone = Ndone + 1;
				if (err) {
					console.log("Error.");
					console.log(err);
					return;
				}
				console.log("Response from " + url);
				xml = list.replace(/^.*<stream>/,"<stream>");
				var parser = new xml2js.Parser();
				parser.parseString(xml, function(err,result){
				  info = result["stream"]["properties"][0]["$"];
					for (var key2 in info) {
				  		LIST[key][key2] = info[key2];
				  	}
					done()
				});
			})		
	}

	function done() {
		if (Ndone == N) {
			fs.writeFileSync('list.json', JSON.stringify(LIST,null,4));
			console.log("Wrote list.json");
		}
	}
}
