var fs     = require('fs');
var xml2js = require('xml2js')
var parser = new xml2js.Parser();

var body = fs.readFileSync('spase2tsds-demo.xml')
parser.parseString(body, function (err, json) {
	//console.log(json)
	spase2tsds(json);
})

function spase2tsds(json) {
	var NumericalData = json["Spase"]["NumericalData"][0]
	var ResourceID = NumericalData["ResourceID"][0]

	var template = NumericalData["AccessInformation"][0]["AccessURL"][0]["URL"][0]
	var Start = NumericalData["TemporalDescription"][0]["TimeSpan"][0]["StartDate"][0]
	var Stop = NumericalData["TemporalDescription"][0]["TimeSpan"][0]["StopDate"][0]
	//var TimeFormat = NumericalData["TemporalDescription"][0]["TimeSpan"][0]["StopDate"][0]
	var TimeFormat = "$d,$m,$y,$H,$M,$S"
	var Cadence = NumericalData["TemporalDescription"][0]["Cadence"][0]

	var cat = {};
    cat["catalog"] = {};
	cat["catalog"]["$"] = {};
	cat["catalog"]["$"]["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
	cat["catalog"]["$"]["id"] = ResourceID;

	cat["catalog"]["documentation"] = []
	cat["catalog"]["documentation"][0] = {}
	cat["catalog"]["documentation"][0]["$"] = {}
	cat["catalog"]["documentation"][0]["$"]["xlink:href"] = "http://spase.org/resolver?" + ResourceID;

	cat["catalog"]["dataset"] = []
	cat["catalog"]["dataset"][0] = {}
	cat["catalog"]["dataset"][0]["$"] = {}
    cat["catalog"]["dataset"][0]["$"]["urltemplate"] = template
    cat["catalog"]["dataset"][0]["$"]["id"] = ResourceID
    cat["catalog"]["dataset"][0]["$"]["timeformat"] = TimeFormat
	cat["catalog"]["dataset"][0]["$"]["timeColumns"] = "1-" + TimeFormat.split(/\s+|,/).length;

	cat["catalog"]["dataset"][0]["timeCoverage"] = {}
	cat["catalog"]["dataset"][0]["timeCoverage"]["Start"] = Start
	cat["catalog"]["dataset"][0]["timeCoverage"]["Stop"] = Stop
	cat["catalog"]["dataset"][0]["timeCoverage"]["Cadence"] = Cadence

	//console.log(JSON.stringify(cat,null,4))
	
	var Elements = [];
	var Units = [];
	for (var i = 0;i < NumericalData["Parameter"].length;i++) {
		var Parameter = NumericalData["Parameter"][i]
		if (NumericalData["Parameter"][i]["Support"]) {
			var ParameterType = NumericalData["Parameter"][i]["Support"][0]["SupportQuantity"][0]
		} else if (NumericalData["Parameter"][i]["Field"]){
			var ParameterType = NumericalData["Parameter"][i]["Field"][0]["Qualifier"][0]
		} else {
			// TODO - Handle particle
		}
		console.log(ParameterType)
		if (ParameterType !== "Temporal") {
			Units = NumericalData["Parameter"][i]["Units"][0]
			elements = NumericalData["Parameter"][i]["Structure"][0]["Element"];
			for (var j = 0;j<elements.length;j++) {
				elements[j].Units = Units
			}
			Elements = Elements.concat(elements)
			console.log(Elements)
		}
	}
	cat["catalog"]["dataset"][0]["variables"] = {};

	cat["catalog"]["dataset"][0]["variables"] = [];
	cat["catalog"]["dataset"][0]["variables"][0] = {}
	cat["catalog"]["dataset"][0]["variables"][0]["variable"] = [];

	for (var j = 0;j < Elements.length;j++) {
		col = 1 + j + TimeFormat.split(/\s+|,/).length;
		cat["catalog"]["dataset"][0]["variables"][0]["variable"][j] = {}
		cat["catalog"]["dataset"][0]["variables"][0]["variable"][j]["$"] = {};
		cat["catalog"]["dataset"][0]["variables"][0]["variable"][j]["$"]["id"] = Elements[j].ParameterKey;
		cat["catalog"]["dataset"][0]["variables"][0]["variable"][j]["$"]["name"] = Elements[j].Name;
		cat["catalog"]["dataset"][0]["variables"][0]["variable"][j]["$"]["units"] = Elements[j].Units;
		cat["catalog"]["dataset"][0]["variables"][0]["variable"][j]["$"]["columns"] = col;
	}
	//console.log(JSON.stringify(cat,null,4))
	var builder = new xml2js.Builder();
	var xml = builder.buildObject(cat)
	console.log(xml)

}