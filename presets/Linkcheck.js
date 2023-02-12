id="Linkcheck";
Presets[id] = {};

// For Autoplot, for now.
Presets[id].PlotColumns = 7;

Presets[id].CatalogName = "Link Checks";
Presets[id].CatalogID   = id;

Presets[id].Datasets = [
						  ["1","autoplot","http://autoplot.org/AutoplotServlet/SimpleServlet?url=http://www.sarahandjeremy.net/..."],                           
						  ["2","autoplot","http://autoplot.org/cache/AutoplotServlet/SimpleServlet?url=http://www.sarahandjeremy.net/..."],
						  ["3","autoplot","http://autoplot.org/"],
						  ["4","autoplot","http://autoplot.org/help"],
						  ["6","autoplot","http://autoplot.org/cookbook"],
						  ["7","autoplot","http://autoplot.org/gallery"],
						  ["9","autoplot","http://autoplot.org/developer"],
						  ["10","autoplot","http://autoplot.org/jnlp.cgi"],
						  ["11","autoplot","http://autoplot.org/data/"],
						  ["12","autoplot","http://autoplot.org/bookmarks/"],
						  ["13","autoplot","http://autoplot.org/autoplot.jnlp"],
						  ["14","autoplot","http://autoplot.org/autoplot.jnlp?version=hudson"],
						  ["15","autoplot","http://autoplot.org/autoplot.jnlp?version=latest"],
						  ["16","autoplot","http://autoplot.org/hudson/"],
						 ];

Presets[id].URLTemplate = "http://mag.gmu.edu/linkcheck/mag/autoplot/$1/%Y%m%d.log";

Presets[id].CatalogName = "Link Checks for autoplot.org";
Presets[id].CatalogID   = id;

Presets[id].CatalogDescription    = ""; // Could be a URL or [{title:"",description:""}] or {title:"",description:""}
Presets[id].CatalogDescriptionURL = "http://mag.gmu.edu/linkcheck/mag/autoplot/";

Presets[id].StartDates       = ["2012-12-07"];
Presets[id].StopDates        = ["2013-07-10"];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "A collection of links that are checked every minute, with the response time and response size recorded.  URL is to source code (to be posted)."; 
Presets[id].DatasetDescriptionURL = "https://github.com/rweigel/linkcheck";

Presets[id].TimeColumns      = "1,2,3,4,5,6";
Presets[id].TimeFormat       = "$Y $m $d $H $M $S";
Presets[id].TimeUnits        = "Year, Month, Day, Hour, Minute, Second";
Presets[id].TimeLabels       = "";

Presets[id].ColumnLabels       = ["Year","Month","Day","Hour","Min","Sec","Response time","Response size"];
Presets[id].ColumnLongnames    = Presets[id].ColumnLabels;
Presets[id].ColumnUnits        = ["Year","Month","Day","h","m","s","ms","byte"];
Presets[id].ColumnGroupings    = [];

Presets[id].DataColumns      = "7,8";
Presets[id].DataIDs          = "ResponseTime,ResponseSize";
Presets[id].DataNames        = "Response Time,ResponseSize";
Presets[id].DataLabels       = "Response Time,ResponseSize";
Presets[id].DataValues       = "";
Presets[id].DataTypes        = "d,d";
Presets[id].DataUnits        = "ms,byte";
Presets[id].DataRenderings   = "%d,%d";
Presets[id].DataFillValues   = "99999,99999";

Presets[id].DataGroupIDs     = ""
Presets[id].DataGroupNames   = ""
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "0";
Presets[id].LineRegex        = "^[0-9]";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "\\s";
Presets[id].DataLineFormat   = "";

Presets[id].IOSP             = "lasp.tss.iosp.ColumnarAsciiReader";
