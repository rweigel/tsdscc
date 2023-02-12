id="NSSDC/ISIS-1";
Presets[id] = {};

Presets[id].CatalogName = "ISIS-1";
Presets[id].CatalogID   = id;

Presets[id].Datasets = "CEP";
						 
Presets[id].URLTemplate           = "http://spdf.gsfc.nasa.gov/pub/data/isis/plasma_cep/isis1/isis1_ne_te.asc";
Presets[id].CatalogDescription    = "Catalog derived by inspection of HTTP directory."
Presets[id].CatalogDescriptionURL = "http://spdf.gsfc.nasa.gov/pub/data/isis/plasma_cep/isis1/";

Presets[id].StartDates       = ["1969-01-30"];
Presets[id].StopDates        = ["1971-06-01"];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "Data from the Cylindrical Electrostatic Probe (CEP) experiment on the ISIS-2 satellite.";
Presets[id].DatasetDescriptionURL = "http://spdf.gsfc.nasa.gov/pub/data/isis/plasma_cep/isis1/00readme.txt";

Presets[id].TimeColumns      = "1,2,3,4,5";
Presets[id].TimeFormat       = "$Y $d $H $M $S";
Presets[id].TimeUnits        = "";
Presets[id].TimeLabels       = "";

Presets[id].ColumnLabels       = ""; 
Presets[id].ColumnLongnames    = Presets[id].ColumnLabels;
Presets[id].ColumnGroupings    = [];

Presets[id].DataColumns      = "6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25"
Presets[id].DataLabels       = ["Local time","Geodetic Latitude","Geodedic Longitude","Geomag. Latitude","Geomag. Longitude","Altitude","Dip Latitude","Magnetic inclination","Magnetic field strength B","L- Invariant Latitude","Quality code for L","Solar zenith angle","ap indices","kp indices","Daily F10.7","Sunspot number","Orbit number","Electron temperature","Electron density","Satellite potential"];

Presets[id].DataNames        = Presets[id].DataLabels;
Presets[id].DataIDs          = [];
for (var k = 0;k < Presets[id].DataLabels.length; k++) {
	Presets[id].DataIDs[k] =  Presets[id].DataLabels[k].replace(/\s/g,"_").replace(".","").replace("-","");
}
//Presets[id].DataIDs          = Presets[id].DataLabels;

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "";
Presets[id].DataUnits        = [",deg,deg,deg,deg,km,deg,deg,nT,,,,,,,,,K,cm-3,mV"];
Presets[id].DataRenderings   = "";
Presets[id].DataFillValues   = ["99.9, 999, 999, 999, 999, 9999, 999, 999.9, 99, 99.99, 9, 999, 999, 99, 999, 999, 99999, 9999, 1.0e+35, 9999"];

Presets[id].DataGroupIDs     = ""
Presets[id].DataGroupNames   = ""
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "0";
Presets[id].LineRegex        = "^[0-9]";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "\\s";
Presets[id].DataLineFormat   = "";

Presets[id].DataReader		 = "lasp.tss.iosp.ColumnarAsciiReader";
