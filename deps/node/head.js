function head(files, callback) {
	var http = require('http');
	url = require("url");

	var tic = new Date().getTime();
	
	function _head(i,callback) {
			urlp = url.parse(files[i]);
			var options = {method: 'HEAD', host: urlp.hostname, port: 80, path: urlp.path};
			var tic = new Date().getTime();
			
			var req = http.request(options, function(res) {callback(i,res.headers);}).end();
			if (i < files.length-1) {
				_head(i+1,callback);
			} 
	}

	var j = 0;
	headers = new Array();
	_head(0, function (i,header) {
				//console.log("Sent " + i + " at " + (new Date().getTime()-tic + " ms"));
				headers[i] = header;
				if (j == files.length-1) {
					var elapsed = new Date().getTime() - tic;
					if (debug) {
						console.log("HEAD time: " + elapsed + " ms (" + Math.round(elapsed/files.length) + " ms/URL)");
					}
					callback(headers);
				} else {
					j = j+1;
				}
			});
}