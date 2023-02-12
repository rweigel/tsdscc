id="NSSDC/ISIS-2";
Presets[id] = {};

Presets[id].CatalogName = "ISIS-2";
Presets[id].CatalogID   = id;

Presets[id].Datasets = "CEP";
				 
Presets[id].URLTemplate           = "http://spdf.gsfc.nasa.gov/pub/data/isis/plasma_cep/isis2/$Y_$m_isis2_cep.asc";
Presets[id].CatalogDescription    = "Catalog derived by inspection of HTTP directory."
Presets[id].CatalogDescriptionURL = "http://spdf.gsfc.nasa.gov/pub/data/isis/plasma_cep/isis2/";

Presets[id].StartDates       = ["1971-04-14"];
Presets[id].StopDates        = ["1973-03-03"];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "Data from the Cylindrical Electrostatic Probe (CEP) experiment on the ISIS-2 satellite.";
Presets[id].DatasetDescriptionURL = "http://spdf.gsfc.nasa.gov/pub/data/isis/plasma_cep/isis2/00README.TXT";

Presets[id].TimeColumns      = "1,2,3,4,5";
Presets[id].TimeFormat       = "$y $j $H $M $S";
Presets[id].TimeUnits        = "";
Presets[id].TimeLabels       = "Year, day of year, hour, minute, second";
     

Presets[id].ColumnLabels       = ""; 
Presets[id].ColumnLongnames    = Presets[id].ColumnLabels;
Presets[id].ColumnUnits        = [",deg,deg,deg,deg,km,deg,deg,nT,,,,,,,,,K,cm-3,mV"];
Presets[id].ColumnUnits        = [",hr,hr,deg,deg,deg,deg,,,km,deg,deg,deg,,,,,,K,cm-3,mV,,"] 
Presets[id].ColumnGroupings    = [];

Presets[id].DataColumns      = "6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29"
Presets[id].DataLabels       = ["Local Time","GMT Time","Magnetic local time","Geodetic Latitude","Geodedic Longitude","Geomag. Latitude","Geomag. Longitude","Invariant latitude","L value","Altitude","Magnetic inclination","Dip latitude","Solar zenith angle","velocity angle","Magnetic field angle","Sun angle","Ap indices","Kp indices","Daily F10.7","Sunspot number","Electron temperature","Electron density","confidence value (Te)","Satellite potential","Probe (0-bottom, 1-top)", "Orbit number"];
Presets[id].DataNames        = Presets[id].DataLabels;
Presets[id].DataIDs          = [];
for (var k = 0;k < Presets[id].DataLabels.length; k++) {
	Presets[id].DataIDs[k] =  Presets[id].DataLabels[k].replace(/\s/g,"_").replace(".","").replace("-","");
}

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "";
Presets[id].DataUnits        = ["decimal hours,decimal hours,decimal hours,degrees,degrees,degrees,degrees,,,km,degrees,degrees,degrees,,,,,,,,,K,cm-3,,mV,,"];            

Presets[id].DataRenderings   = "";
Presets[id].DataFillValues   = ["f5.2,f6.3,f5.2,f6.2,f6.1,f6.2,f6.1,f6.2,f6.2,f6.1,f6.2,f7.2,i3,i2,i4,i3,e12.6,e12.6,f5.2,f5.2,i1,i6"];                                 
 
Presets[id].DataGroupIDs     = ""
Presets[id].DataGroupNames   = ""
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "0";
Presets[id].LineRegEx        = "^\s[0-9]";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "\\s";
Presets[id].DataLineFormat   = "";

Presets[id].IOSP             = "lasp.tss.iosp.ColumnarAsciiReader";
