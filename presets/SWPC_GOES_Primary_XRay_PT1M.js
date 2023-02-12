id="SWPC/GOES/Primary//PT1M";
Presets[id] = {};

Presets[id].CatalogName = "";
Presets[id].CatalogID   = id;

Presets[id].Datasets = [["Gp_xr,Real-time measurements of solar x-rays from GOES primary satellite."]];
						 
Presets[id].URLTemplate = "ftp://ftp.sec.noaa.gov/pub/lists/particle/$Y$m$d_Gp_part_5m.txt";

Presets[id].CatalogDescription = "Catalog derived from inspection of *Gp_part_5m.txt files in ftp://ftp.sec.noaa.gov/pub/lists/particle/"
Presets[id].CatalogDescriptionURL = "ftp://ftp.sec.noaa.gov/pub/lists/particle/";

Presets[id].StartDates       = ["2013-06-07"];
Presets[id].StopDates        = ["2013-09-04"];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = ""; 
Presets[id].DatasetDescriptionURL = "ftp://ftp.sec.noaa.gov/pub/lists/particle/README";

Presets[id].TimeColumns      = "1,2,3,4";
Presets[id].TimeFormat       = "$Y,$m,$d,$H$M";
Presets[id].TimeUnits        = "";
Presets[id].TimeLabels       = "Year, Month, Day, HourMinute";

Presets[id].DataLabels       = "Particles at >1 MeV,Particles at > 5 MeV,Particles at > 10 MeV,Particles at > 30 MeV,Particles at > 50 MeV,Particles at > 100 MeV,Electrons at > 0.8 MeV,Electrons at > 2.0 MeV,Electrons at > 4.0 MeV";
Presets[id].DataColumns      = "7-14";
Presets[id].DataNames        = "P>1,P>5,P>10,P>30,P>50,P>100,E>0.8,E>2.0,E>4.0";
Presets[id].DataIDs          = "P_gt_1,P_gt_5,P_gt_10,P_gt_30,P_gt_50,P_gt_100,E_gt_0.8,E_gt_2.0,E_gt_4.0";

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "";
Presets[id].DataUnits        = "Protons/cm2-s-sr,Protons/cm2-s-sr,Protons/cm2-s-sr,Protons/cm2-s-sr,Protons/cm2-s-sr,Protons/cm2-s-sr,Electrons/cm2-s-sr,Electrons/cm2-s-sr,Electrons/cm2-s-sr";
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