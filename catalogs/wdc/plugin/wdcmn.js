var fs = require('fs');

data = fs.readFileSync('ykc/ykc1412m.wdc').toString();
//data = fs.readFileSync('len1977.wdc').toString();
//data = fs.readFileSync('psm1883.wdc').toString();
dataa = data.split("\n");
N = dataa.length;
var Data = {};
for (var i = 0;i < N;i++) {
	if (dataa[i] === "") {
		break;
	}
	year    = dataa[i].substring(12,14);
	month   = dataa[i].substring(14,16).replace(/ ([0-9])/,'0$1')
	element = dataa[i][18].toUpperCase();
	day     = dataa[i].substring(16,18).replace(/ ([0-9])/,'0$1'); // In case " 1" listed instead of "01"
	QorD    = dataa[i][14]; // Preliminary (P) or Definitive (D) 
	yrbase  = data[25];
	hr = dataa[i].substring(19,21)
	if (QorD === "P") {
		QorD = 1;
	}
	if (QorD === "D") {
		QorD = 2;
	}
    if (yrbase === "0") {
    	yrbase = "20";
    } else if (yrbase === "8") {
    	yrbase = "18"
    } else {
    	yrbase = "19";
    }
    mnvals = dataa[i].substring(34,394);
	for (var j = 0; j < 60;j++) {
	  mn = "" + j;
	  if (j < 10) {mn = "0" + j}
	  var val = mnvals.substring(6*j,6*(j+1))
	  time = yrbase + year + "-" + month + "-" + day + "T" + hr + ":" + mn + ":00.000"
	  line =  time + " " + val;
		if (typeof(Data[time]) === "undefined") {
			Data[time] = {};
		}
	  //console.log(line)
      Data[time][element] = val;
	}
}
line = ""
for (key in Data) {
	line += key + " "
	for (var param in Data[key]) {
		line += (Data[key][param] || 999999) + " "
	}
	line += "\n"
}
console.log(line)
