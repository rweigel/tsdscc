id="Template";
Presets[id] = {};

Presets[id].CatalogName = "";
Presets[id].CatalogID   = id;

Presets[id].Datasets = [["p1,Parameter 1"],["p2,Parameter 1"]];

						 
Presets[id].URLTemplate = "";

Presets[id].CatalogDescription = ""
Presets[id].CatalogDescriptionURL = "";

Presets[id].StartDates       = [""];
Presets[id].StopDates        = [""];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "";
Presets[id].DatasetDescriptionURL = "";

Presets[id].TimeColumns      = "";
Presets[id].TimeFormat       = "";
Presets[id].TimeUnits        = "";
Presets[id].TimeLabels       = "";

Presets[id].DataColumns      = ""
Presets[id].DataLabels       = "";
Presets[id].DataNames        = Presets[id].DataLabels;
Presets[id].DataIDs          = Presets[id].DataLabels.replace("(|)","").replace(" ","");

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "";
Presets[id].DataUnits        = "";
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