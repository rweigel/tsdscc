function checkproxy(testurl, proxy, report) {

	console.log("checkproxy.js: Trying unproxied AJAX HEAD request to " + testurl);
	//$(report).text("checkproxy.js: Trying unproxied AJAX HEAD request to " + testurl);
 	
 	//console.log(report);
 	var errmsg1 = "";
	$.ajax({
		type: 'HEAD',
		async: false,
		timeout: 300,
		url: testurl, 
		success: function () {needproxy = false;console.log("checkproxy.js: AJAX HEAD request to " + testurl + " worked.");},
		error: function (err) {errmsg1 = err;needproxy = true;console.log("checkproxy.js: AJAX HEAD request " + testurl + " failed.");}
	});

	var errmsg2 = "";
	$.ajax({
		type: 'HEAD',
		async: false,
		timeout: 300,
		url: proxy, 
		success: function () {haveproxy = true;console.log("checkproxy.js: AJAX HEAD request to " + proxy + " worked.");},
		error: function (err) {errmsg2 = err;haveproxy = false;console.log("checkproxy.js: AJAX HEAD request " + proxy + " failed.");}
	});
	
	var errmsg3 = "";
	if (haveproxy || needproxy) {
		console.log("checkproxy.js: Trying proxied AJAX HEAD request with " + proxy + testurl);
		$.ajax({
				type: 'HEAD',
				async: false,
				timeout: 300,
				url: proxy + testurl, 
				success: function () {proxyhead = true;console.log("checkproxy.js: Success.");},
				error: function (err) {errmsg3=err;proxyhead = false;console.log("checkproxy.js: Error.");}
		});
	}

	if (needproxy && !haveproxy) {
		// 
		$(report).text("A proxy server is needed and " + proxy + " is not available.  See <a href='http://tsds.org/tsdsgen#Full_functionality'>http://tsds.org/tsdsgen</a> for proxy configuration information.");
	}
		
	if (needproxy && !proxyhead) {
		//$(report).append("checkproxy.js: HEAD request to " + proxy + testurl + " failed.");
		return false;
	}
	if (!needproxy) {
		proxy = "";
	}
	return proxy;
}
