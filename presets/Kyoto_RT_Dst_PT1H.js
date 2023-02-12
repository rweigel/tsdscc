id="Kyoto/RT/Dst/PT1H";
Presets[id] = {};

Presets[id].CatalogName = "Real Time Dst from Kyoto; 1-hour cadence.";
Presets[id].CatalogID   = id;

Presets[id].Datasets = [["Dst,Real-time Dst"]];

						 
Presets[id].URLTemplate = "http://datacache.org/dc/sync?return=stream&forceUpdate=true&plugin=kyotodst&source=http://wdc.kugi.kyoto-u.ac.jp/dst_realtime/$Y$m/index.html";

Presets[id].CatalogDescription = "Catalog derived from inspection of"
Presets[id].CatalogDescriptionURL = "http://wdc.kugi.kyoto-u.ac.jp/dst_realtime/";

Presets[id].StartDates       = ["2013-01-01"];
Presets[id].StopDates        = ["2013-08-31"];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "Real-time Dst estimate from Kyoto; 1-hour cadence."; 
Presets[id].DatasetDescriptionURL = "http://wdc.kugi.kyoto-u.ac.jp/dst_realtime/";

Presets[id].TimeColumns      = "1,2";
Presets[id].TimeFormat       = "$Y-$m-$d,$H:$M:$S.$(millis)";
Presets[id].TimeUnits        = "Gregorian,UT";
Presets[id].TimeLabels       = "Date,Time";

Presets[id].DataColumns      = "3"
Presets[id].DataLabels       = "DST_RT";
Presets[id].DataNames        = "Real-time Dst";
Presets[id].DataIDs          = Presets[id].DataLabels.replace("(|)","").replace(" ","");

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "";
Presets[id].DataUnits        = ",nT";
Presets[id].DataRenderings   = "";
Presets[id].DataFillValues   = ""

Presets[id].DataGroupIDs     = ""
Presets[id].DataGroupNames   = ""
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "0";
Presets[id].LineRegex        = "^[0-9]";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "\\s";
Presets[id].DataLineFormat   = "";

Presets[id].DataReader       = "lasp.tss.iosp.ColumnarAsciiReader";