id="NSSDC/DE2/MAG";
Presets[id] = {};

Presets[id].CatalogName = "Magnetic and Electric Field data from Dynamics Explorer 2";
Presets[id].CatalogID   = id;

Presets[id].Datasets = [["DE2/MAG"]];

						 
Presets[id].URLTemplate = "ftp://spdf.gsfc.nasa.gov/pub/data/de/de2/magnetic_electric_fields_vefi_magb/dc_500ms_ascii/data/$Y$j_de2_vefi_magb_dc_500ms.asc";

Presets[id].CatalogDescription = "0.5-sec. averaged magnetic and electric field vectors from NASA's DE-2 spacecraft (309-1012 km altitude, 89.9 deg inclination, 98 min orbital period) taken between August 15, 1981 and February 16, 1983."; // Could be a URL or [{title:"",description:""}] or {title:"",description:""}
Presets[id].CatalogDescriptionURL = "http://ftpbrowser.gsfc.nasa.gov/de2_mag.html";

Presets[id].StartDates       = ["1981-08-15"];
Presets[id].StopDates        = ["1983-02-16"];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = ""; // Could be a URL or [{title:"",description:""}] or {title:"",description:""}

Presets[id].TimeColumns      = "1";
Presets[id].TimeFormat       = "$S";
Presets[id].TimeUnits        = "Second";
Presets[id].TimeLabels       = "seconds since 1981-08-15";

Presets[id].ColumnLabels       = 
Presets[id].ColumnLongnames    = Presets[id].ColumnLabels;
Presets[id].ColumnUnits        = ["mV/m,mV/m,nT,nT,nT,nT,nT,nT,km,degrees,degrees,hour,degrees"];
Presets[id].ColumnGroupings    = [];

Presets[id].DataColumns      = "1,2,3,4,5,6,7,8,9,10,11,12,13"
Presets[id].DataLabels       = "EX (SPC),EY (SPC),Bx (SPC),By (SPC),Bz (SPC),Bx-model (SPC),By-model (SPC),Bz-model (SPC),Altitude,Latitude,Longitude,MLT,INVariant LAT.";
Presets[id].DataNames        = Presets[id].DataLabels;
Presets[id].DataIDs          = Presets[id].DataLabels.replace("(|)","").replace(" ","");

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "f,f,f,f,f,f,f,f,f,f,f,f,f";
Presets[id].DataUnits        = "mV/m,mV/m,nT,nT,nT,nT,nT,nT,km,degrees,degrees,hour,degrees";
Presets[id].DataRenderings   = "%f,%f,%f,%f,%f,%f,%f,%f,%f,%f,%f,%f";
Presets[id].DataFillValues   = "99999.99, 999999.9, 999999.9 , 999999.9, 999999.9, 999999.9, 999999.9, 9999.999, 9999.999, 9999.999, 999.99, 9999.999, 9999.999"

Presets[id].DataGroupIDs     = ""
Presets[id].DataGroupNames   = ""
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "0";
Presets[id].LineRegEx        = "^[0-9]";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "\\s";
Presets[id].DataLineFormat   = "";

Presets[id].IOSP             = "lasp.tss.iosp.ColumnarAsciiReader";
