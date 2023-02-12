id="SSCWeb";
Presets[id] = {};

Presets[id].CatalogName = "SSCWeb";
Presets[id].CatalogID   = id;

sscwebdata  = sscwebdata.replace("superceded","superseded").replace(",(Auroral,Probe)"," (Auroral Probe)").replace(",Star-1","-Star-1").replace(",Star-2","-Star2").replace("Sputnik,1","Sputnik1");
sscwebdata  = sscwebdata.replace(/,II/g,"_II");
sscwebdata  = sscwebdata.replace(/,(\(.*?\))/g," $1");
tmpDatasets = sscwebdata.replace(/,Test/g,"").split(",");
tmpDatasets = tmpDatasets.slice(1,tmpDatasets.length-1);
console.log(tmpDatasets)

Presets[id].Datasets = [];
k = 0;
for (z = 0 ;z<tmpDatasets.length;z=z+6) {
	Presets[id].Datasets[k] = tmpDatasets[z]+","+tmpDatasets[z+1];
	k = k+1;
}
//Presets[id].Datasets = Presets[id].Datasets.slice(0,3); 
Presets[id].Datasets = Presets[id].Datasets.join("\n");

Presets[id].URLTemplate = "http://sscweb.gsfc.nasa.gov/cgi-bin/Locator.cgi?SPCR=$1%26START_TIME%3D$Y%2B$j%2B00%253A00%253A00%26STOP_TIME%3D$Y%2B$j%2B23%253A59%253A59%26RESOLUTION=1%26TOD=7%26TOD=8%26J2000=7%26J2000=8%26GEO=7%26GEO=8%26GEO=6%26GM=7%26GM=8%26GM=6%26GSE=7%26GSE=8%26GSE=6%26GSM=7%26GSM=8%26SM=7%26SM=8%26SM=6%26FILTER_DIST_UNITS=1%26TOD_APPLY_FILTER=%26TODX_MNMX=%26TOD_XGT=%26TOD_XLT=%26TODY_MNMX=%26TOD_YGT=%26TOD_YLT=%26TODZ_MNMX=%26TOD_ZGT=%26TOD_ZLT=%26TODLAT_MNMX=%26TOD_LATGT=%26TOD_LATLT=%26TODLON_MNMX=%26TOD_LONGT=%26TOD_LONLT=%26TODLT_MNMX=%26TOD_LTGT=%26TOD_LTLT=%26J2000_APPLY_FILTER=%26J2000X_MNMX=%26J2000_XGT=%26J2000_XLT=%26J2000Y_MNMX=%26J2000_YGT=%26J2000_YLT=%26J2000Z_MNMX=%26J2000_ZGT=%26J2000_ZLT=%26J2000LAT_MNMX=%26J2000_LATGT=%26J2000_LATLT=%26J2000LON_MNMX=%26J2000_LONGT=%26J2000_LONLT=%26J2000LT_MNMX=%26J2000_LTGT=%26J2000_LTLT=%26GEO_APPLY_FILTER=%26GEOX_MNMX=%26GEO_XGT=%26GEO_XLT=%26GEOY_MNMX=%26GEO_YGT=%26GEO_YLT=%26GEOZ_MNMX=%26GEO_ZGT=%26GEO_ZLT=%26GEOLAT_MNMX=%26GEO_LATGT=%26GEO_LATLT=%26GEOLON_MNMX=%26GEO_LONGT=%26GEO_LONLT=%26GEOLT_MNMX=%26GEO_LTGT=%26GEO_LTLT=%26GM_APPLY_FILTER=%26GMX_MNMX=%26GM_XGT=%26GM_XLT=%26GMY_MNMX=%26GM_YGT=%26GM_YLT=%26GMZ_MNMX=%26GM_ZGT=%26GM_ZLT=%26GMLAT_MNMX=%26GM_LATGT=%26GM_LATLT=%26GMLON_MNMX=%26GM_LONGT=%26GM_LONLT=%26GMLT_MNMX=%26GM_LTGT=%26GM_LTLT=%26GSE_APPLY_FILTER=%26GSEX_MNMX=%26GSE_XGT=%26GSE_XLT=%26GSEY_MNMX=%26GSE_YGT=%26GSE_YLT=%26GSEZ_MNMX=%26GSE_ZGT=%26GSE_ZLT=%26GSELAT_MNMX=%26GSE_LATGT=%26GSE_LATLT=%26GSELON_MNMX=%26GSE_LONGT=%26GSE_LONLT=%26GSELT_MNMX=%26GSE_LTGT=%26GSE_LTLT=%26GSM_APPLY_FILTER=%26GSMX_MNMX=%26GSM_XGT=%26GSM_XLT=%26GSMY_MNMX=%26GSM_YGT=%26GSM_YLT=%26GSMZ_MNMX=%26GSM_ZGT=%26GSM_ZLT=%26GSMLAT_MNMX=%26GSM_LATGT=%26GSM_LATLT=%26GSMLON_MNMX=%26GSM_LONGT=%26GSM_LONLT=%26GSMLT_MNMX=%26GSM_LTGT=%26GSM_LTLT=%26SM_APPLY_FILTER=%26SMX_MNMX=%26SM_XGT=%26SM_XLT=%26SMY_MNMX=%26SM_YGT=%26SM_YLT=%26SMZ_MNMX=%26SM_ZGT=%26SM_ZLT=%26SMLAT_MNMX=%26SM_LATGT=%26SM_LATLT=%26SMLON_MNMX=%26SM_LONGT=%26SM_LONLT=%26SMLT_MNMX=%26SM_LTGT=%26SM_LTLT=%26OTHER_FILTER_DIST_UNITS=1%26RD_APPLY=%26FS_APPLY=%26NS_APPLY=%26BS_APPLY=%26MG_APPLY=%26LV_APPLY=%26IL_APPLY=%26REG_FLTR_SWITCH=%26SCR_APPLY=%26SCR=%26RTR_APPLY=%26RTR=%26BTR_APPLY=%26NBTR=%26SBTR=%26EXTERNAL=3%26EXT_T1989c=1%26KP_LONG_89=4%26INTERNAL=1%26ALTITUDE=100%26DAY=1%26TIME=3%26DISTANCE=1%26DIST_DEC=2%26DEG=1%26DEG_DEC=2%26DEG_DIR=1%26OUTPUT_CDF=1%26LINES_PAGE=1%26RNG_FLTR_METHOD=%26PREV_SECTION=TOS%26SSC=LOCATOR_GENERAL%26SUBMIT=Submit+query+and+wait+for+output%26.cgifields=TRC_GEON%26.cgifields=REG_OPT%26.cgifields=TOD%26.cgifields=GEO%26.cgifields=TRC_GMS%26.cgifields=OPT%26.cgifields=GM%26.cgifields=J2000%26.cgifields=GSE%26.cgifields=TRC_GMN%26.cgifields=GSM%26.cgifields=SM%26.cgifields=TRC_GEOS";

Presets[id].CatalogDescription = "Catalog derived using the SSCWeb Service";
Presets[id].CatalogDescriptionURL = "http://sscweb.gsfc.nasa.gov/WebServices/";

k = 0;
Presets[id].StartDates = [];
Presets[id].StopDates  = [];
for (z =3 ;z<tmpDatasets.length;z=z+6) {
	Presets[id].StartDates[k] = [tmpDatasets[z].substring(0,10)];
	Presets[id].StopDates[k]  = [tmpDatasets[z].substring(21,31)];
	k = k+1;
}
Presets[id].StartDates = Presets[id].StartDates.slice(0,10); 
Presets[id].StopDates  = Presets[id].StopDates.slice(0,10);;

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "Description of ephemeris calculations";
Presets[id].DatasetDescriptionURL = "http://sscweb.gsfc.nasa.gov/users_guide/Users_Guide_pt1.html#1.1";

Presets[id].TimeColumns      = "1,2,3";
Presets[id].TimeFormat       = "$Y,$j,$H:$M";
Presets[id].TimeUnits        = "";
Presets[id].TimeLabels       = "Year,DOY,Hour,Minute";

Presets[id].DataColumns      = "(4,5,6),(7,8),(9,10,11),(12,13),(14,15,16),(17,18,19),(20,21,22),(23,24,25),(26,27,28),(29,30,31),(32,33,34),(35,36),(37,38,39),(40,41,42)";
tmpstr                       = "(X_TOD,Y_TOD,Z_TOD),(Lat_TOD,Lon_TOD),(X_J2K,Y_J2K,Z_J2K),(Lat_J2K,Lon_J2K),(X_GEO,Y_GEO,Z_GEO),(Lat_GEO,Lon_GEO,LT_GEO),(X_GM,Y_GM,Z_GM),(Lat_GM,Lon_GM,LT_GM),(X_GSE,Y_GSE,Z_GSE),(Lat_GSE,Lon_GSE,LT_GSE),(X_GSM,Y_GSM,Z_GSM),(Lat_GSM,Lon_GSM),(X_SM,Y_SM,Z_SM),(Lat_SM,Lon_SM,LT_SM)";
Presets[id].DataNames        = tmpstr;
Presets[id].DataIDs          = tmpstr;

tmpstr = tmpstr.replace(/_TOD/g," Position in the Geocentric Equatorial Inertial coordinate system&#44; also known as True Equator and True Equinox of Date&#44; True of Date (TOD)&#44; ECI&#44; or GCI") 
tmpstr = tmpstr.replace(/_J2K/g," Position in the Geocentric Equatorial Inertial coordinate system for epoch J2000.0 (GEI2000)&#44; also known as Mean Equator and Mean Equinox of J2000.0");
tmpstr = tmpstr.replace(/Lat_GEO/g,"Latitude in the Geographic coordinate system&#44; also known as Greenwich Rotating Coordinates (GRC)&#44; or Earth-fixed Greenwich (EFG)");
tmpstr = tmpstr.replace(/Lon_GEO/g,"Longitude in the Geographic coordinate system&#44; also known as Greenwich Rotating Coordinates (GRC)&#44; or Earth-fixed Greenwich (EFG)");
tmpstr = tmpstr.replace(/LT_GEO/g,"Local time in the Geographic coordinate system&#44; also known as Greenwich Rotating Coordinates (GRC)&#44; or Earth-fixed Greenwich (EFG)");
tmpstr = tmpstr.replace(/_GEO/g," Position in the Geographic coordinate system&#44; also known as Greenwich Rotating Coordinates (GRC)&#44; or Earth-fixed Greenwich (EFG)");
tmpstr = tmpstr.replace(/Lat_GM/g,"Latitude in the Geomagnetic coordinate system.");
tmpstr = tmpstr.replace(/Lon_GM/g,"Longigude in the Geomagnetic coordinate system.");
tmpstr = tmpstr.replace(/LT_GM/g,"Local time in the Geomagnetic coordinate system.");
tmpstr = tmpstr.replace(/_GM/g," Position in the Geomagnetic coordinate system.");
tmpstr = tmpstr.replace(/_GSE/g," Position in the Geocentric Solar Ecliptic coordinate system");
tmpstr = tmpstr.replace(/_GSM/g," Position in the Geocentric Solar Magnetospheric coordinate system");
tmpstr = tmpstr.replace(/Lat_SM/g,"Latitude in the Solar Magnetic coordinate system");
tmpstr = tmpstr.replace(/Lon_SM/g,"Longitude in the Solar Magnetic coordinate system");
tmpstr = tmpstr.replace(/LT_SM/g,"Local time in the Solar Magnetic coordinate system");
tmpstr = tmpstr.replace(/_SM/g," Position in the Solar Magnetic coordinate system");

//console.log(tmpstr)
Presets[id].DataLabels       = tmpstr;
//console.log(tmpstr)

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "";
Presets[id].DataUnits        = "R_E,R_E,R_E,deg,deg,R_E,R_E,R_E,deg,deg,R_E,R_E,R_E,deg,deg,$H:$M,R_E,R_E,R_E,deg,deg,$H:$M,R_E,R_E,R_E,deg,deg,R_E,R_E,R_E,deg,deg,R_E,R_E,R_E,deg,deg,deg,$H:$M";
Presets[id].DataRenderings   = "%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f%.2f,%.2f,%.2f,%.2f,%.2f,%04d,%.2f,%.2f,%.2f,%.2f,%.2f,%04d,%.2f,%.2f,%.2f,%.2f,%.2f,%04d,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%04d";
Presets[id].DataFillValues   = "1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31,1e31";

Presets[id].DataGroupIDs     = "XYZ_TOD,LatLon_TOD,XYZ_TOD,LatLon_J2K,XYZ_GEO,LatLonLT_GEO,XYZ_GM,LatLonLT_GM,XYZ_GSE,LatLonLT_GSE,XYZ_GSM,LatLon_GSM,XYZ_SM,LatLonLT_SM";
Presets[id].DataGroupNames   = Presets[id].DataGroupIDs;
Presets[id].DataGroupLabels  = Presets[id].DataGroupIDs;

Presets[id].SkipLines        = "";
Presets[id].LineRegex        = "";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "";
Presets[id].DataLineFormat   = "";

Presets[id].Plugin           = "sscweb";
Presets[id].DataReader       = "lasp.tss.iosp.ColumnarAsciiReader";