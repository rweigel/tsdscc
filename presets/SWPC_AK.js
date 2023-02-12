id="SWPC/AK";
Presets[id] = {};

Presets[id].CatalogName = "Geomagnetic A and K indices from the U.S. Geological Survey Stations.";
Presets[id].CatalogID   = id;

Presets[id].Datasets = [["AK,Real-time Geomagnetic A and K indices from SWPC."]];
						 
Presets[id].URLTemplate = "http://datacache.org/dc/sync?return=stream&plugin=swpcKpAp2Day&source=http://www.swpc.noaa.gov/ftpdir/lists/geomag/$Y$mAK.txt";

Presets[id].CatalogDescription = "Catalog derived from inspection of *AK.txt files in http://www.swpc.noaa.gov/ftpdir/lists/geomag/"
Presets[id].CatalogDescriptionURL = "http://www.swpc.noaa.gov/ftpdir/lists/geomag/";

Presets[id].StartDates       = ["2010-01-01"];
Presets[id].StopDates        = ["2013-08-19"];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "Geomagnetic A and K indices from the U.S. Geological Survey Stations."; 
Presets[id].DatasetDescriptionURL = "http://www.swpc.noaa.gov/ftpdir/lists/geomag/README";

Presets[id].TimeColumns      = "1,2";
Presets[id].TimeFormat       = "$Y-$m-$d,$H:$M";
Presets[id].TimeUnits        = "Gregorian,UT";
Presets[id].TimeLabels       = "Date,Time";


var list = "Beijing,Belsk,Boulder,Cape Chelyuskin,Chambon-la-foret,College,Dixon Island,Fredericksburg,Gottingen,Kergulen Island,Krenkel,Learmonth,St. Petersburg,Magadan,Moscow,Murmansk,Novosibirsk,P. Tunguska,Petropavlovsk,Planetary,Tiksi Bay,Wingst";
var listv = list.split(",");
var listn = "";
var dc = "";
for (var i = 0;i < listv.length;i++) {
	listn = listn + listv[i] + " K" + "," + listv[i] + " A" + ",";
}
for (var i = 0;i < 2*listv.length;i++) {
	dc = dc + (i+3) + ",";
}

Presets[id].DataLabels       = listn.slice(0,-1);
Presets[id].DataColumns      = dc.slice(0,-1);

Presets[id].DataNames        = Presets[id].DataLabels;

Presets[id].DataIDs          = Presets[id].DataLabels.replace(/ /g,"").replace(/\-/g,"");

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "";
Presets[id].DataUnits        = "";
Presets[id].DataRenderings   = "%d";
Presets[id].DataFillValues   = "-1";

Presets[id].DataGroupIDs     = ""
Presets[id].DataGroupNames   = ""
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "0";
Presets[id].LineRegex        = "";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "\\s";
Presets[id].DataLineFormat   = "";

Presets[id].DataReader       = "lasp.tss.iosp.ColumnarAsciiReader";