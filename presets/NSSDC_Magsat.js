id="NSSDC/ISIS-2";
Presets[id] = {};

Presets[id].CatalogName = "";
Presets[id].CatalogID   = id;

Presets[id].Datasets = ["ISIS-2, Data from the Cylindrical Electrostatic Probe (CEP) experiment on the ISIS-2 satellite."];

				 
Presets[id].URLTemplate = "ftp://spdf.gsfc.nasa.gov/pub/data/isis/plasma_cep/isis2/$Y_$m_isis2_cep.asc";
Presets[id].CatalogDescription = ""
Presets[id].CatalogDescriptionURL = "";

Presets[id].StartDates       = ["1971-04-14"];
Presets[id].StopDates        = ["1973-03-03"];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "ftp://spdf.gsfc.nasa.gov/pub/data/isis/plasma_cep/isis2/00README.TXT";

Presets[id].TimeColumns      = "1,2,3,4,5";
Presets[id].TimeFormat       = "%Y %j %H %M %s";
Presets[id].TimeUnits        = "";
Presets[id].TimeLabels       = "Year, day of year, hour, minute, second";
     

Presets[id].ColumnLabels       = ""; 
Presets[id].ColumnLongnames    = Presets[id].ColumnLabels;
Presets[id].ColumnUnits        = [",deg,deg,deg,deg,km,deg,deg,nT,,,,,,,,,K,cm-3,mV"];
Presets[id].ColumnUnits        = [",hr,hr,deg,deg,deg,deg,,,km,deg,deg,deg,,,,,,K,cm-3,mV,,"] 
Presets[id].ColumnGroupings    = [];

Presets[id].DataColumns      = "7-30"
Presets[id].DataLabels       = ["1 Magnetic local time, 2 Geodetic Latitude, 3 Geodedic Longitude, 4 Geomag. Latitude, 5 Geomag. Longitude,6 Invariant latitude,7 L value, 8 Altitude,9 Magnetic inclination,10 Dip latitude,11 Solar zenith angle,12 velocity angle,13 Magnetic field angle,14 Sun angle,15 Ap indices,16 Kp indices,17 Daily F10.7,18 Sunspot number,19 Electron temperature,20 Electron density,21 confidence value (Te),22 Satellite potential,23 Probe (0-bottom, 1-top),24 Orbit number"];
Presets[id].DataNames        = Presets[id].DataLabels;
Presets[id].DataIDs          = Presets[id].DataLabels;

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "";
Presets[id].DataUnits        = "";
Presets[id].DataRenderings   = "";
Presets[id].DataFillValues   = ["99.9, 999, 999, 999, 999, 9999, 999, 999.9, 99, 99.99, 9, 999, 999, 99, 999, 999, 99999, 9999, 1.0e+35, 9999"];

Presets[id].DataGroupIDs     = ""
Presets[id].DataGroupNames   = ""
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "0";
Presets[id].LineRegEx        = "^\s[0-9]";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "\\s";
Presets[id].DataLineFormat   = "";

Presets[id].IOSP             = "lasp.tss.iosp.ColumnarAsciiReader";
