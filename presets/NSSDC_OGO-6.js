id="NSSDC/OGO-6";
Presets[id] = {};

Presets[id].CatalogName = "";
Presets[id].CatalogID   = id;

Presets[id].Datasets = [["H+,"],["He+,"],["N+,"],["O+,"],["N2+,"],["NO+,"],["O2+,";

// Prefer to use REST interface. Data files are not ASCII and can't be written as template:
// ftp://spdf.gsfc.nasa.gov/pub/data/ogo/ogo6/
// ftp://spdf.gsfc.nasa.gov/pub/data/ogo/ogo6/ion_mass_spectrometer/ion_mass_spectrometer_data/attrib/SPIO-00054_DD038164_01-JUL-70_att						 
// ftp://spdf.gsfc.nasa.gov/pub/data/ogo/ogo6/ion_mass_spectrometer/ion_mass_spectrometer_data/SPIO-00054_DD038165_01-AUG-70.tar
Presets[id].URLTemplate = ["http://omniweb.gsfc.nasa.gov/cgi/nx2.cgi?activity=retrieve&spacecraft=ogo6&res=40-sec&start_date=19700301&end_date=19700306&low06=1&high06=1&vars=07&low07=&high07=&vars=08&low08=&high08=&vars=09&low09=&high09=&vars=10&low10=&high10=&vars=11&low11=&high11=&vars=12&low12=&high12=&vars=13&low13=&high13=&vars=14&low14=&high14=&vars=15&low15=&high15=&vars=16&low16=&high16=&vars=17&low17=&high17=&vars=18&low18=&high18=&vars=20&low20=&high20=&vars=21&low21=&high21=&vars=22&low22=&high22=&vars=23&low23=&high23=&vars=24&low24=&high24=&vars=25&low25=&high25=&vars=26&low26=&high26=&vars=27&low27=&high27=&vars=28&low28=&high28=&maxdays=5&scale=Linear&view=0&linestyle=solid&paper=0&charsize=&xstyle=0&ystyle=0&symbol=0&symsize=&table=0&imagex=640&imagey=480&color=&back=","http://omniweb.gsfc.nasa.gov/cgi/nx2.cgi?activity=retrieve&spacecraft=ogo6&res=40-sec&start_date=19700301&end_date=19700306&low06=2&high06=2&vars=07&low07=&high07=&vars=08&low08=&high08=&vars=09&low09=&high09=&vars=10&low10=&high10=&vars=11&low11=&high11=&vars=12&low12=&high12=&vars=13&low13=&high13=&vars=14&low14=&high14=&vars=15&low15=&high15=&vars=16&low16=&high16=&vars=17&low17=&high17=&vars=18&low18=&high18=&vars=20&low20=&high20=&vars=21&low21=&high21=&vars=22&low22=&high22=&vars=23&low23=&high23=&vars=24&low24=&high24=&vars=25&low25=&high25=&vars=26&low26=&high26=&vars=27&low27=&high27=&vars=28&low28=&high28=&maxdays=5&scale=Linear&view=0&linestyle=solid&paper=0&charsize=&xstyle=0&ystyle=0&symbol=0&symsize=&table=0&imagex=640&imagey=480&color=&back="","http://omniweb.gsfc.nasa.gov/cgi/nx2.cgi?activity=retrieve&spacecraft=ogo6&res=40-sec&start_date=19701201&end_date=19701231&low06=3&high06=3&vars=07&low07=&high07=&vars=08&low08=&high08=&vars=09&low09=&high09=&vars=10&low10=&high10=&vars=11&low11=&high11=&vars=12&low12=&high12=&vars=13&low13=&high13=&vars=14&low14=&high14=&vars=15&low15=&high15=&vars=16&low16=&high16=&vars=17&low17=&high17=&vars=18&low18=&high18=&vars=20&low20=&high20=&vars=21&low21=&high21=&vars=22&low22=&high22=&vars=23&low23=&high23=&vars=24&low24=&high24=&vars=25&low25=&high25=&vars=26&low26=&high26=&vars=27&low27=&high27=&vars=28&low28=&high28=&maxdays=5&scale=Linear&view=0&linestyle=solid&paper=0&charsize=&xstyle=0&ystyle=0&symbol=0&symsize=&table=0&imagex=640&imagey=480&color=&back=","http://omniweb.gsfc.nasa.gov/cgi/nx2.cgi?activity=retrieve&spacecraft=ogo6&res=40-sec&start_date=19701201&end_date=19701231&low06=4&high06=4&vars=07&low07=&high07=&vars=08&low08=&high08=&vars=09&low09=&high09=&vars=10&low10=&high10=&vars=11&low11=&high11=&vars=12&low12=&high12=&vars=13&low13=&high13=&vars=14&low14=&high14=&vars=15&low15=&high15=&vars=16&low16=&high16=&vars=17&low17=&high17=&vars=18&low18=&high18=&vars=20&low20=&high20=&vars=21&low21=&high21=&vars=22&low22=&high22=&vars=23&low23=&high23=&vars=24&low24=&high24=&vars=25&low25=&high25=&vars=26&low26=&high26=&vars=27&low27=&high27=&vars=28&low28=&high28=&maxdays=5&scale=Linear&view=0&linestyle=solid&paper=0&charsize=&xstyle=0&ystyle=0&symbol=0&symsize=&table=0&imagex=640&imagey=480&color=&back=","http://omniweb.gsfc.nasa.gov/cgi/nx2.cgi?activity=retrieve&spacecraft=ogo6&res=40-sec&start_date=19701201&end_date=19701231&low06=5&high06=5&vars=07&low07=&high07=&vars=08&low08=&high08=&vars=09&low09=&high09=&vars=10&low10=&high10=&vars=11&low11=&high11=&vars=12&low12=&high12=&vars=13&low13=&high13=&vars=14&low14=&high14=&vars=15&low15=&high15=&vars=16&low16=&high16=&vars=17&low17=&high17=&vars=18&low18=&high18=&vars=20&low20=&high20=&vars=21&low21=&high21=&vars=22&low22=&high22=&vars=23&low23=&high23=&vars=24&low24=&high24=&vars=25&low25=&high25=&vars=26&low26=&high26=&vars=27&low27=&high27=&vars=28&low28=&high28=&maxdays=5&scale=Linear&view=0&linestyle=solid&paper=0&charsize=&xstyle=0&ystyle=0&symbol=0&symsize=&table=0&imagex=640&imagey=480&color=&back=","http://omniweb.gsfc.nasa.gov/cgi/nx2.cgi?activity=retrieve&spacecraft=ogo6&res=40-sec&start_date=19701201&end_date=19701231&low06=6&high06=6&vars=07&low07=&high07=&vars=08&low08=&high08=&vars=09&low09=&high09=&vars=10&low10=&high10=&vars=11&low11=&high11=&vars=12&low12=&high12=&vars=13&low13=&high13=&vars=14&low14=&high14=&vars=15&low15=&high15=&vars=16&low16=&high16=&vars=17&low17=&high17=&vars=18&low18=&high18=&vars=20&low20=&high20=&vars=21&low21=&high21=&vars=22&low22=&high22=&vars=23&low23=&high23=&vars=24&low24=&high24=&vars=25&low25=&high25=&vars=26&low26=&high26=&vars=27&low27=&high27=&vars=28&low28=&high28=&maxdays=5&scale=Linear&view=0&linestyle=solid&paper=0&charsize=&xstyle=0&ystyle=0&symbol=0&symsize=&table=0&imagex=640&imagey=480&color=&back=","http://omniweb.gsfc.nasa.gov/cgi/nx2.cgi?activity=retrieve&spacecraft=ogo6&res=40-sec&start_date=19701201&end_date=19701231&low06=7&high06=7&vars=07&low07=&high07=&vars=08&low08=&high08=&vars=09&low09=&high09=&vars=10&low10=&high10=&vars=11&low11=&high11=&vars=12&low12=&high12=&vars=13&low13=&high13=&vars=14&low14=&high14=&vars=15&low15=&high15=&vars=16&low16=&high16=&vars=17&low17=&high17=&vars=18&low18=&high18=&vars=20&low20=&high20=&vars=21&low21=&high21=&vars=22&low22=&high22=&vars=23&low23=&high23=&vars=24&low24=&high24=&vars=25&low25=&high25=&vars=26&low26=&high26=&vars=27&low27=&high27=&vars=28&low28=&high28=&maxdays=5&scale=Linear&view=0&linestyle=solid&paper=0&charsize=&xstyle=0&ystyle=0&symbol=0&symsize=&table=0&imagex=640&imagey=480&color=&back="];

Presets[id].CatalogDescription = ""
Presets[id].CatalogDescriptionURL = "";

Presets[id].StartDates       = ["1969-06-12"];
Presets[id].StopDates        = ["1969-12-01"];
// ? and 1970-03-01 - 1970-12-31"]
Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "";

Presets[id].TimeColumns      = "1,2,3,4,5,6";
Presets[id].TimeFormat       = "$y $j $h $m $s $S";//YR DOY HR MN SC MSC.  Need to deal with non-zero padded.
Presets[id].TimeUnits        = "";
Presets[id].TimeLabels       = "";

Presets[id].ColumnLabels       = ""; 
Presets[id].ColumnLongnames    = Presets[id].ColumnLabels;
Presets[id].ColumnUnits        = [""];
Presets[id].ColumnGroupings    = [];

Presets[id].DataColumns      = "7-27"
Presets[id].DataLabels       =  ["MLT, Geodetic Latitude (deg), Geodedic Longitude (deg), Geomag. Latitude (deg), Altitude (km), Dip Latitude (deg), L-shell,L-code, Ap (3hour), Kp (3hour), F10.7 (daily), R (daily),Ion Density (good) (cm-3), Ion Density (all) (cm-3), S/C Charge (Volts), Velocity (km/sec), Orbit number, Eclipse Flag, Current (Ampers), Voltage (Volts), Shaft Angle (deg)"];
Presets[id].DataNames        = Presets[id].DataLabels;
Presets[id].DataIDs          = Presets[id].DataLabels;

Presets[id].DataValues       = "";
Presets[id].DataTypes        = "";
Presets[id].DataUnits        = ",deg, deg, deg, km, deg,,,,,,, cm-3, cm-3, V, km/s,,,A,V, deg";

Presets[id].DataRenderings   = "See format codes here: http://ftpbrowser.gsfc.nasa.gov/ogo6.html";
Presets[id].DataFillValues   = "? See format codes here: http://ftpbrowser.gsfc.nasa.gov/ogo6.html"

Presets[id].DataGroupIDs     = ""
Presets[id].DataGroupNames   = ""
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "0";
Presets[id].LineRegEx        = "^[0-9]";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "\\s";
Presets[id].DataLineFormat   = "";

Presets[id].IOSP             = "lasp.tss.iosp.ColumnarAsciiReader";
