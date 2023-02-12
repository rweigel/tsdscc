id="SWPC/AK/2DayFile";
Presets[id] = {};

Presets[id].CatalogName = "Geomagnetic A and K indices from the U.S. Geological Survey Stations.";
Presets[id].CatalogID   = id;

Presets[id].Datasets = [["AK","Real-time Geomagnetic A and K indices from SWPC."]];
						 
Presets[id].URLTemplate = "http://datacache.org/dc/sync?return=stream&plugin=swpcKpAp2Day&forceUpdate=true&source=http://www.swpc.noaa.gov/ftpdir/lists/geomag/AK.txt";

Presets[id].CatalogDescription = "Catalog derived from inspection of http://www.swpc.noaa.gov/ftpdir/lists/geomag/AK.txt"
Presets[id].CatalogDescriptionURL = "http://www.swpc.noaa.gov/ftpdir/lists/geomag/AK.txt";

Presets[id].StartDates       = ["2013-08-18"];
Presets[id].StopDates        = ["2013-08-19"];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "Geomagnetic A and K indices from the U.S. Geological Survey Stations."; 
Presets[id].DatasetDescriptionURL = "http://www.swpc.noaa.gov/ftpdir/lists/geomag/AK.txt";

Presets[id].TimeColumns      = "1,2";
Presets[id].TimeFormat       = "$Y-$m-$d,$H:$M";
Presets[id].TimeUnits        = "Gregorian,UT";
Presets[id].TimeLabels       = "Date,Time";

Presets[id].DataColumns      = "3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19"
Presets[id].DataLabels       = "Boulder K,Boulder A,Chambon-la-fore K,Chambon-la-fore A,College K,College A,Fredericksburg K,Fredericksburg A,Kergulen Island K,Kergulen Island A,Learmonth K,Learmonth A,Planetary K,Planetary A,Wingst K,Wingst A";
Presets[id].DataNames        = Presets[id].DataLabels;

Presets[id].DataIDs          = Presets[id].DataLabels.replace(/ /g,"").replace(/\-/g,"");

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "";
Presets[id].DataUnits        = "";
Presets[id].DataRenderings   = "%d";
Presets[id].DataFillValues   = "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1";

Presets[id].DataGroupIDs     = ""
Presets[id].DataGroupNames   = ""
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "0";
Presets[id].LineRegex        = "";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "\\s";
Presets[id].DataLineFormat   = "";

Presets[id].DataReader       = "lasp.tss.iosp.ColumnarAsciiReader";