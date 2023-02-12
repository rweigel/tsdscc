
id="NGDC/GOES13/SEM/XRS";
Presets[id] = {};

Presets[id].CatalogName = "";
Presets[id].CatalogID   = id;

Presets[id].Datasets = [["xrs_1m,X-rays; two channels; one minute averages."],["xrs_2s,X-rays; two channels; two second averages."]];

						 
Presets[id].URLTemplate = "http://www.ngdc.noaa.gov/goes/sem/getData/goes13/$1.csv?fromDate=$Y$m$d&toDate=$Y$m$d&file=true";

Presets[id].CatalogDescription = "GOES SEM Metadata"
Presets[id].CatalogDescriptionURL = "http://www.ngdc.noaa.gov/goes/sem/getMetadata";

Presets[id].StartDates       = ["2011-11-01"];
Presets[id].StopDates        = ["2011-11-05"];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "Measurements from the SEM instrument on GOES 13.";
Presets[id].DatasetDescriptionURL = "http://www.ngdc.noaa.gov/goes/sem/getMetadata/goes13/$1.csv";

Presets[id].TimeColumns      = "1,2";
Presets[id].TimeFormat       = "$Y-$m-$d,$H:$M:$S.$(millis)";
Presets[id].TimeUnits        = "Gregorian,Universal Time";
Presets[id].TimeLabels       = "";

Presets[id].DataColumns      = "3,4,5,6,7,8"
Presets[id].DataNames        = "XRS short wavelength channel irradiance (0.05 - 0.4 nm),Data points per average,Quality flag non-zero value indicates data quality issue.,XRS long wavelength channel irradiance (0.1-0.8 nm),Data points per average.,Quality flag non-zero value indicates data quality issue.";
Presets[id].DataLabels       = "x-ray (0.05-0.4 nm) irradiance,points/average,quality flag, x-ray (0.1-0.8 nm) irradiance,points/average,quality flag";
Presets[id].DataIDs          = "A_AVG,A_NUM_PTS,A_QUAL_FLAG,B_AVG,B_NUM_PTS,B_QUAL_FLAG";

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "";
Presets[id].DataUnits        = "W/m^2,,,W/m^2,,";
Presets[id].DataRenderings   = "";
Presets[id].DataFillValues   = "-99999,0,99999,-99999,0,99999";

Presets[id].DataGroupIDs     = ""
Presets[id].DataGroupNames   = ""
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "0";
Presets[id].LineRegex        = "^[0-9]";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = ",";
Presets[id].DataLineFormat   = "";

Presets[id].DataReader       = "lasp.tss.iosp.ColumnarAsciiReader";