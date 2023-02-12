id="SuperMAG";
Presets[id] = {};

Presets[id].CatalogName = "SuperMAG";
Presets[id].CatalogID   = id;

Presets[id].Datasets = [["BLC,Baker Lake"],["CMO,College"]].join("\n");

Presets[id].URLTemplate = "http://supermag.jhuapl.edu/mag/lib/services/%3Fservice=mag%26user=weigel%26start=$Y-$m-$dT00:00:00.000Z%26interval=23%3A59%26stations=$1%26delta=none%26baseline=all%26format=ascii%26options=%2Bimfgsm%2Bsza";

Presets[id].CatalogDescription = "Catalog based on http://mag.gmu.edu/catalogs/SuperMAG.txt"
Presets[id].CatalogDescriptionURL = "http://mag.gmu.edu/catalogs/SuperMAG.txt";

Presets[id].StartDates       = ["1990-01-01"];
Presets[id].StopDates        = ["1990-01-10"];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "Coordinate system information";
Presets[id].DatasetDescriptionURL = "http://supermag.jhuapl.edu/info/coordinates.html";

Presets[id].TimeColumns      = "1,2,3,4,5,6";
Presets[id].TimeFormat       = "$Y,$m,$d,$H,$M,$S";
Presets[id].TimeUnits        = "";
Presets[id].TimeLabels       = "Year,Month,Day,Hour,Minute,Second";

Presets[id].DataColumns      = "8,9,10,11"
Presets[id].DataLabels       = "B North GEO,B East GEO,B Vertical GEO,Solar Zenith Angle";
Presets[id].DataNames        = "B North GEO,B East GEO,B Vertical GEO,Solar Zenith Angle"
Presets[id].DataIDs          = "B_N,B_E,B_Z,SZA";

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "";
Presets[id].DataUnits        = "nT,nT,nT,deg";
Presets[id].DataRenderings   = "%.1f,%.1f,%.1f,%.2f";
Presets[id].DataFillValues   = "999999,999999,999999,999999"

Presets[id].DataGroupIDs     = ""
Presets[id].DataGroupNames   = ""
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "";
Presets[id].LineRegex        = "";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "";
Presets[id].DataLineFormat   = "";

Presets[id].Plugin           = "supermag";
Presets[id].DataReader       = "lasp.tss.iosp.ColumnarAsciiReader";