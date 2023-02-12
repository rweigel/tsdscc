id="INTERMAGNET/PT1M";
Presets[id] = {};

Presets[id].CatalogName = "INTERMAGNET 1-minute magnetometer data";
Presets[id].CatalogID   = id;

var starts = "";
var stops  = "";
var c = "";
Presets[id].Datasets   = [];
Presets[id].DataIDs    = [];
Presets[id].DataNames  = [];
Presets[id].DataLabels = [];
Presets[id].DataUnits = [];

Presets[id].DataGroupIDs     = [];
Presets[id].DataGroupNames   = [];
Presets[id].StartDates = [];
Presets[id].StopDates  = [];

for (var i = 0;i< list.length;i++) {
//for (var i = 0;i<3;i++) {
	list2 = list[i].split(",").splice(3);
	Presets[id].Datasets[i] = [list[i].split(",")[0]+","+list[i].split(",")[0].toLowerCase()].concat(list2);

	//console.log(Presets[id].Datasets[i])
	Presets[id].StartDates[i] = list[i].split(",")[1];
	Presets[id].StopDates[i] =  list[i].split(",")[2];

	if (!list[i].split(",")[3].match(/hdz|xyz/i)) {
		alert(list[i].split(",")[3]);
	}
	if (list[i].split(",")[3].match(/hdz/i)) {
		Presets[id].DataIDs[i]          = "DOY,(H,D,Z),F";
		Presets[id].DataNames[i]        = "DOY,($1 H,$1 D,$1 Z),$1 F";
		Presets[id].DataLabels[i]       = "Day of Year,($6 H,$6 D,$6 Z),$6 F";
		Presets[id].DataUnits[i]        = "Gregorian,nT,tenths of a minute East,nT,nT";
	
		Presets[id].DataGroupIDs[i]     = "HDZ"
		Presets[id].DataGroupNames[i]   = "HDZ components"
	}
	if (list[i].split(",")[3].match(/xyz/i)) {
		Presets[id].DataIDs[i]          = "DOY,(X,Y,Z),F";
		Presets[id].DataNames[i]        = "DOY,($1 X,$1 Y,$1 Z),$1 F";
		Presets[id].DataLabels[i]       = "Day of Year,($6 X,$6 Y,$6 Z),$6 F";
		Presets[id].DataUnits[i]        = "Gregorian,nT,nT,nT,nT";

		
		Presets[id].DataGroupIDs[i]     = "XYZ"
		Presets[id].DataGroupNames[i]   = "XYZ components"	
	}

}

Presets[id].Datasets   = Presets[id].Datasets.join("\n");
Presets[id].DataIDs    = Presets[id].DataIDs.join("\n");
Presets[id].DataNames  = Presets[id].DataNames.join("\n"); 
Presets[id].DataLabels = Presets[id].DataLabels.join("\n");
Presets[id].DataUnits  = Presets[id].DataUnits.join("\n");


Presets[id].DataGroupIDs     = Presets[id].DataGroupIDs.join("\n"); 
Presets[id].DataGroupNames   = Presets[id].DataGroupNames.join("\n"); 

Presets[id].StartDates = Presets[id].StartDates.join("\n");
Presets[id].StopDates  = Presets[id].StopDates.join("\n");
Presets[id].Cadence    = ["PT1M"];

// Don't show this part in the catalog.  Do an internal prefixing of http://mag.gmu.edu/mirror/				 
Presets[id].URLTemplate = "http://mag.gmu.edu/mirror/www.intermagnet.org/$1/PT1M/$2$Y$m$dvmin.min.gz";

Presets[id].CatalogDescription = "http://tsds.org/catalogs/intermagnet/"
Presets[id].CatalogDescriptionURL = "http://tsds.org/catalogs/intermagnet/";

Presets[id].DatasetName        = "$1";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "";
Presets[id].DatasetDescriptionURL = "";

Presets[id].TimeColumns      = "1,2";
Presets[id].TimeFormat       = "$Y-$m-$d,$H:$M:$S.$(millis)";
Presets[id].TimeUnits        = "Gregorian,UT";
Presets[id].TimeLabels       = "Date,Time";

Presets[id].DataColumns      = "3,(4,5,6),7";
Presets[id].DataValues       = "";
Presets[id].DataTypes        = "d,f,f,f,f";
Presets[id].DataRenderings   = "%j,%.2f,%.2f,%.2f,%.2f";
Presets[id].DataFillValues   = ",99999.00,99999.00,99999.00,99999.00";

Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "";
Presets[id].LineRegex        = "^[0-9]";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "\\s";
Presets[id].DataLineFormat   = "";

Presets[id].DataReader       = "lasp.tss.iosp.ColumnarAsciiReader";