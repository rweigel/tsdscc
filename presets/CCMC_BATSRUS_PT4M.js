id="CCMC/BATSRUS/4M";
Presets[id] = {};

//Presets[id].URLTemplate        = "ftp://virbo.org/users/rastaetter/dB/dB_$1.txt";
Presets[id].URLTemplate        = "http://virbo.org/ftp/users/rastaetter/dB_20121227-20130529/dB_$1.txt";

Presets[id].CatalogName        = "CCMC BATSRUS simulation output of magnetic field at select magnetometer locations";
Presets[id].CatalogID          = id;

Presets[id].CatalogDescription = "Catalog derived by inspection of http://virbo.org/ftp/users/rastaetter/dB_20121227-20130529/"
Presets[id].CatalogDescriptionURL = "http://virbo.org/ftp/users/rastaetter/dB_20121227-20130529/";

Presets[id].StartDates       = ["2012-12-27"];
Presets[id].StopDates        = ["2013-05-29"];

Presets[id].Datasets         = [["gill"],["gna"],["gull"],["had"],["her"],["hrn"],["iqa"],["isll"],["lrv"],["mcmu"],["mea"],["mmb"],["mstk"],["naq"],["new"],["ngk"],["osak"],["ott"],["paf"],["pbq"],["pet"],["pina"],["pod"],["rabb"],["rank"],["sani"],["snk"],["talo"],["thrf"],["tik"],["tuc"],["vic"],["wng"],["ykc"]];
//Presets[id].Datasets         = [["gill"]];
Presets[id].DatasetName        = "$1";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "Predicted ground magnetometer perturbations at selected physical ground magnetometer locations at approximately 4-minute cadence.  See file header for additional details."; 
Presets[id].DatasetDescriptionURL = "http://virbo.org/ftp/users/rastaetter/dB_20121227-20130529/";

Presets[id].TimeColumns      = "1,2,3,4,5,6";
Presets[id].TimeFormat       = "$Y $m $d $H $M $S";
Presets[id].TimeUnits        = "";
Presets[id].TimeLabels       = "Year,Month,Day,Hour,Minute,Second";

Presets[id].DataColumns      = "(7,8,9)";
Presets[id].DataIDs          = "(Bx,By,Bz)";
Presets[id].DataNames        = "($1 Bx,$1 By,$1 Bz)";
Presets[id].DataLabels       = "($1 Bx,$1 By,$1 Bz)";
Presets[id].DataValues       = "";
Presets[id].DataTypes        = "f,f,f";
Presets[id].DataUnits        = "nT,nT,nT";
Presets[id].DataRenderings   = "%.2f,%.2f,%.2f";
Presets[id].DataFillValues   = "";

Presets[id].DataGroupIDs     = "$1_XYZ"
Presets[id].DataGroupNames   = "Magnetic Field Vector"
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "0";
Presets[id].LineRegex        = "^[0-9]";
Presets[id].CommentCharacter = "^#";
Presets[id].DataDelimiter    = "\\s";
Presets[id].DataLineFormat   = "";

Presets[id].IOSP             = "lasp.tss.iosp.ColumnarAsciiReader";
