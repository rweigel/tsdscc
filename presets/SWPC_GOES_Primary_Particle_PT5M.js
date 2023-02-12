id="SWPC/GOES/Primary/Particle/PT1M";
Presets[id] = {};

Presets[id].CatalogName = "";
Presets[id].CatalogID   = id;

Presets[id].Datasets = [["Gp_particles,Real-time measurements of particles from GOES primary satellite."]];
						 
Presets[id].URLTemplate = "ftp://ftp.sec.noaa.gov/pub/lists/xray/$Y$m$d_Gp_xr_1m.txt";

Presets[id].CatalogDescription = "Catalog derived from inspection of *Gp_xr_1m.txt files in ftp://ftp.sec.noaa.gov/pub/lists/xr/"
Presets[id].CatalogDescriptionURL = "ftp://ftp.sec.noaa.gov/pub/lists/xr/";

Presets[id].StartDates       = ["2013-06-07"];
Presets[id].StopDates        = ["2013-09-04"];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = ""; 
Presets[id].DatasetDescriptionURL = "ftp://ftp.sec.noaa.gov/pub/lists/xray/README";

Presets[id].TimeColumns      = "1,2,3,4";
Presets[id].TimeFormat       = "$Y,$m,$d,$H$M";
Presets[id].TimeUnits        = "";
Presets[id].TimeLabels       = "Year, Month, Day, HourMinute";

Presets[id].DataLabels       = "Xray flux; 0.05-0.4 nanometer,Xray flux; 0.1 - 0.8 nanometer";
Presets[id].DataColumns      = "7-8";
Presets[id].DataNames        = "";
Presets[id].DataIDs          = "";

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "";
Presets[id].DataUnits        = "W/m^2";
Presets[id].DataRenderings   = "%.2e";
Presets[id].DataFillValues   = "-1.00e+05";

Presets[id].DataGroupIDs     = ""
Presets[id].DataGroupNames   = ""
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "";
Presets[id].LineRegex        = "^[0-9]";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "\\s";
Presets[id].DataLineFormat   = "";

Presets[id].DataReader       = "lasp.tss.iosp.ColumnarAsciiReader";