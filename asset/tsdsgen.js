function expand() {

	var options   = {};
	var starts = $("#StartDates").val().split("\n");
	var stops  = $("#StopDates").val().split("\n");

	options.type  = "strftime";
	options.check = false;
	options.debug = false;
	options.side  = "client";

	var urls = [];
	var Nc = 0;
	Datasets = $('#Datasets').val().split("\n");
	
	if (options.debug) console.log(Datasets)
	
	for (var k=0;k<Datasets.length;k++) {
		if (starts.length > 1) {
			options.timeRange = starts[k]+"/"+stops[k];
		} else {
			options.timeRange = starts[0]+"/"+stops[0];
		}

		options.template = expanddollar($("#URLTemplate").val(),Datasets[k].split(","));
		//console.log(options)
		options.k = k;
		options.N = Datasets.length;
		$('#urls').show().val("Computing URLs ...");
		expandtemplate(options,function (files,headers,options) {
			Nc = Nc+1;
			urls[options.k] = files.toString().replace(/,/g,"\n");
			console.log("Dataset " + Nc + " has " + files.length + " urls.")
			if (Nc == options.N) {
				//console.log(urls.length);
				//console.log("Setting " + urls.length + " urls.");
				if (urls.length > 1) {
					console.log("Too many URLs.  Setting first group.");
					$('#urls').show().val(urls[0]);
				} else {
					$('#urls').show().val(urls.join("\n\n"));
				}
					
				$('#urls').scrollLeft(1000);
				console.log("Done.");
			}
		});
	}
}
function expanddollar(tmpstr,Dataset) {
	
	if (typeof(Dataset) !== "number") {
		for (var i=0;i < Dataset.length; i++) {
			tmpstr = tmpstr.replace(/\$([0-9])/,"'+Dataset[$1-1]+'");
		}
		if (tmpstr.match("Dataset")) {
			tmpstr = "'" + tmpstr + "'";
			tmpstr = eval(tmpstr);
		}
	} else {
		tmpstr = tmpstr.replace(/\$([0-9])/,Dataset);
	}
	return tmpstr;
}

function guessstartstop() {
	
	urlblocks = $('#urls').val().replace('\n$','').split('\n\n');
	
	Start = "";
	Stop = "";
	nl = "";
	
	if ($('#startdates').val() === "") {
		if ($('#startmin').val() === "") {
			guessstartstop();
		} else {
			Startx = $('#startmin').val();
			Stopx = $('#stopmax').val();
			//console.log(urlblocks.length);
			for (i = 0; i < $('#templateexpanded').val().split("\n").length; i++) {
				if (i > 0) nl = "\n";
				Start = Start + nl + Startx;
				Stop = Stop + nl + Stopx;	
			}
			$('#startdates').val(Start);
			$('#stopdates').val(Stop);

		}
		return;
	}

	for (i = 0; i < urlblocks.length; i++) {
		urls = urlblocks[i].split('\n');
		template = $('#Template').val();

		// Need to determine this based on template (%Y -> +2, %m->+0, %D->+0);
		N = template.length + 2+0+0;

		// Will only handle two types of times
		timere = new RegExp(/.*([0-9]{4}-[0-9]{2}-[0-9]{2}).*/);
		timerep = new RegExp(/([0-9]{4})-([0-9]{2})-([0-9]{2})/);
		timeord = '$1-$2-$3';

		timere = new RegExp(/.*([0-9]{8}).*/);
		timerep = new RegExp(/([0-9]{4})([0-9]{2})([0-9]{2})/);
		timeord = '$1-$2-$3';
		if (urls[0].match(timere)) {
			first = urls[0].replace(timere,'$1');
			first = first.replace(timerep,timeord);
			first = new Date(first); 

			last = urls[urls.length-1].replace(timere,'$1');
			last = last.replace(timerep,timeord);
			last = new Date(last);
		}
		
		if (i > 0)
			nl = "\n";
		Start = Start + nl + first.strftime('%Y-%m-%d');
		Stop = Stop + nl + last.strftime('%Y-%m-%d');	
	}
	
	if (Start.length) {
		note = "(Determined based on URL list.)";
	} else {
		note = "(Was not able to determine exact start and stop dates for each valid URL.)";
	}
	$('#guessstartnote').text(note).show();
	$('#guessstopnote').text(note).show();

	$('#startdates').val(Start);
	$('#stopdates').val(Stop);

}

function links() {
	linkblocks = $('#urls').val().split("\n\n");
	$("#tryurls").html("");
	for (i = 0;i < linkblocks.length-1;i++) {
		var url = "http://datacache.org/dc/syncsubmit?source="+encodeURI(linkblocks[i]);
		$("#tryurls").append("<a id='" +i + "' href='"+url+"'>"+i+"</a> ");
	}
	$("#links").show();		
}

function detectchange() {			
		
		var newval = "";
		$('.enter').each(function () {newval = newval + $(this).val()});
		if (detectchange.lastval && newval != detectchange.lastval) {
			console.log("Change detected:");// + detectchange.lastval + " | " + newval);
			$('input[type=button].try').click();
		} else {
			console.log("No change detected");
		}
		detectchange.lastval = newval;	
}

function stats(i,j,N) {
	
	//console.log(i + " " + j)
	if (!stats.L) {
		var L = new Array();
		stats.L = L;
		stats.L[i] = 0;
	}

	stats.L[i] = stats.L[i]+1;
	$("#s"+i).text(" " + stats.L[i] + "/" + N);
}

function report(el,Nvalid) {
	$(el+'_results').text(Nvalid + "/" + Nurls + " are valid. Done.");
	$('#urlsvalid').show();
	$('#urlsinvalid').show();
	//console.log(urlsv.filter(function(element){return element.length}))
	//console.log(urlsi.filter(function(element){return element.length}).join('\n\n').replace(/(,,)+/g,'\n').replace(/\n,/g,''))
	$('#urlsv').val(urlsv.filter(function(element){return element.length}).join('\n\n').replace(/(,,)+/g,'\n').replace(/\n,/g,'').replace(/,/g,'\n'));
	$('#urlsi').val(urlsi.filter(function(element){return element.length}).join('\n\n').replace(/(,,)+/g,'\n').replace(/\n,/g,'').replace(/,/g,'\n'));
}

function ajaxReport(el,type) {

	el = '#' + $(el).attr('id');
	$(el+'_span').show();
	$('#report0dataurls_results').hide();
	urls = new Array();
	if ($("#urlsv").val() !== "") { 
		// If GET or HEAD check has been run, this textarea will have been populated.
		urls = $($('#urlsv')).val().split("\n\n").filter(function(element){return element.length});	
		data = encodeURI($("#urlsv").val());
	} else {
		urls = $($('#urls')).val().split("\n\n").filter(function(element){return element.length});			
		data = encodeURI($("#urls").val());
	}
	
	if (urls.length == 0) {return}

	if (type === "report") {
	
		// See if AJAX GET needs Proxy.
		//testurl = urls[0].split(/\n/g).filter(function(element){return element.length})[0];
		//Proxy = checkproxy(DataCache, Proxy, el+'_results');
		//if (Proxy === false) return;
		
		_DataCache = DataCache + "?source=";
		
		$(el+'_span').show();
		$(el + "_results").empty();
		//$.scrollTo($(el+'_span'));
		for (var i = 0; i < urls.length; i++) {
			$(el + "_results").append($("<a/>",
					{"href":_DataCache.replace('source=','&return=stream&source=')+encodeURI(urls[i]), 
					 "text":"Download concatanation of all responses"}));
			$(el + "_results").append($("<iframe/>",
					{"id":i,
					 "src":_DataCache.replace("sync","report") + encodeURI(urls[i])}));
		}
	}
	
	if (type === "plot") {
		$(el+'_span').show();
		DataSet = $('#Datasets').val().split("\n");

		var timeFormat = $('#TimeFormat').val().replace(/(%.*\s).*/g,'');
		timeFormat = timeFormat.replace(/ \$/g,"+$").replace(/ $/,'');
		timeFormat = timeFormat.replace(/,/g,' ');
		console.log(timeFormat);

		var skipLines = $('#SkipLines').val();

		// Need to compute based on given information.
		var PlotColumns = parseInt($('#PlotColumns').val())-1;
		
		var urlss = new Array();
		el = el + "_results";
		for (var i = 0; i < urls.length; i++) {
			urlss[i] = urls[i].split(/\n/g).filter(function(element){return element.length});
			$(el).append("<div style='font-size:60%'>"+DataSet[i].split(",")[0]+"<span id='s"+i+"'></span></div>");
			$(el).append("<div style='overflow-x:scroll;white-space: nowrap;' id='"+i+"'/>");
			for (j = 0; j < urlss[i].length; j++) { 
				var apu  = "vap+dat:"+urlss[i][j]+"?skipLines="+skipLines+"&time=field0&timeFormat="+timeFormat+"&column="+PlotColumns;
				var aurl =  AutoplotServlet + plotoptions + "&url=" + encodeURIComponent(apu);			
				var ld   = "onload='stats(" + i + "," + j + "," + urlss[i].length + ")'";
				//console.log(ld);
				$(el + " #"+i).append('<img ' + ld + ' src="' + aurl + '"/>');
				$(el + " #"+i + " img").click(function () {
					console.log("Plot was clicked");
				});
			}
		}	
	}
}

function ajaxRequest(el,type) {
	
	function urlarrays() {
		
		var Nurls = 0; 			  // Total number of urls
		var urlss = new Array();  // All urls
		var urlsv = new Array();  // Valid urls
		var urlsi = new Array();  // Invalid urls

		for (var i = 0;i < urls.length;i++) {	
			urlsv[i] = new Array();
			urlsi[i] = new Array();
			urlss[i] = new Array();
			urlss[i] = urls[i].split(/\n/g).filter(function(element){return element.length});
			Nurls    = Nurls + urlss[i].length;
		}
		return [urlss,urlsv,urlsi,Nurls]
	}

	function status(z, Nvalid) {
		$(el+'_results').text(Nvalid + "/" + z + " checked are valid. " + (Nurls-z) + " checks left.");
	}

	function closurehead(i,j) {			
		// Do HEAD or GET request on urlss[i][j].
		$.ajax({
			type: type,
			url: Proxy + urlss[i][j], 
			error: function () {
						z = z + 1;
						urlsi[i][j] = urlss[i][j];
						if (z % 100) {status(z,Nvalid);}
						if (z == Nurls) {report(Nvalid);}
					}, 
			success: function (data, textStatus, jqXHR) {
					z = z + 1;
					Nvalid = Nvalid + 1;
					//console.log(data);
					//console.log(jqXHR.getAllResponseHeaders())
					// See proxy.js - it places Content-Length in Content-Type header
					// because only Content-Type and Last-Modified headers can be
					// accessed reliable from jqXHR object.
					if (jqXHR.getResponseHeader('Content-Type').match(/Content-Length/i)) {
						var ContentLength = jqXHR.getResponseHeader('Content-Type').replace(/.*:\s+([0-9].*),.*/,'$1');
					} else {
						var ContentLength = jqXHR.getResponseHeader('Content-Length')
					}
					if (parseInt(ContentLength) > 0) {
						urlsv[i][j] = urlss[i][j];
					} else {
						urlsi[i][j] = urlss[i][j];
					}
					if (z % 100) {status(z,Nvalid);}
					if (z == Nurls) {report(el,Nvalid);}
				}

		});
	}
	
	el = '#' + $(el).attr('id');	
	$(el+'_span').show();

	urls = $($('#urls')).val().split("\n\n").filter(function(element){return element.length});

	// See if AJAX HEAD requests needs Proxy.  If so, return Proxy.  Otherwise, return "".
	//testurl = urls[0].split(/\n/g).filter(function(element){return element.length})[0];
	Proxy   = checkproxy("http://www.google.com/", Proxy, el+'_results');

	if (Proxy === false) return;

	U     = urlarrays(); // urls in blocks of datasets.
	urlss = U[0];
	urlsv = U[1];
	urlsi = U[2];
	Nurls = U[3];

	var z = 0;
	var Nvalid = 0;
	for (var i = 0;i < urlss.length;i++) {
		for (var j = 0;j < urlss[i].length;j++) {
			closurehead(i,j);				
		}				
	}
}

function dlscript(language) {
	//$('#checkdataurls').click();
	if ($('#urlsv').text().length == 0) {
		var urls = $('#urls').val().split('\n').filter(function(element){return element.length});		
	} else {
		var urls = $('#urlv').val().split('\n').filter(function(element){return element.length});		
	}
	var dlurls = new Array();
	//console.log(urls);
	//urls.length
	script = "prefix = '';\nfiles={...\n";

	for (var i = 0;i < 10; i++) {
		dlurls[i] = DataCache + "?return=data&source=" + encodeURI(urls[i]);
		script = script + "'" + encodeURI(urls[i]) + "',...\n";
	}
	script = script + "}";
	$('#script').val(script).parent().show();
}
