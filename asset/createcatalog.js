function createcatalog() { 
	
	jQuery.xml2str = function(xmlData) {if (window.ActiveXObject) {return xmlData.xml} else {return (new XMLSerializer()).serializeToString(xmlData)}}

	Datasets = $('#Datasets').val().split("\n");

	var DatasetTemplates = [];
	for (var k=0;k<Datasets.length;k++) {
		DatasetTemplates[k] = expanddollar($("#URLTemplate").val(),Datasets[k].split(","));
	}

	var DataIDsa         = $('#DataIDs').val().split("\n");
	var DataNamesa       = $('#DataNames').val().split("\n");
	var DataLabelsa      = $('#DataLabels').val().split("\n");
	var DataFillValuesa  = $('#DataFillValues').val().split("\n");
	var DataColumnsa     = $('#DataColumns').val().split("\n");
	var DataRenderingsa  = $('#DataRenderings').val().split("\n");
	var DataUnitsa       = $('#DataUnits').val().split("\n");
	var DataValuesa      = $('#DataValues').val().split("\n");
	var DataGroupIDsa    = $('#DataGroupIDs').val().split("\n");
	var DataGroupNamesa  = $('#DataGroupNames').val().split("\n");
	var DataGroupLabelsa = $('#DataGroupLabels').val().split("\n");
	var DatasetDescription = $('#DatasetDescription').val().split("\n");
	var DatasetDescriptionURL = $('#DatasetDescriptionURL').val().split("\n");
	
	//console.log(DataLabelsa)
	$('#catalogdiv').show();
			
	var catalog = $($.parseXML($('#threddstemplate').val())).find('catalog');
	var catalog0 = $($.parseXML($('#threddstemplate').val())).find('catalog');
	//catalog.find('catalog').attr('name',$('#CatalogName').val());
			
	catalog.find('documentation').attr("xlink:title",$('#CatalogDescription').val());
	catalog.find('documentation').attr("xlink:href",$('#CatalogDescriptionURL').val());
	catalog.attr('id',$('#CatalogID').val());
	catalog.attr('name',$('#CatalogName').val());
	console.log($('#CatalogName').val())

	catalog.find('service').attr('base','http://tsds.org/tsds/'+$('#CatalogID').val())
	catalog.find('dataset').remove();

	var documentation = $(catalog0[0]).find('documentation');
	var dataset = $(catalog0[0]).find('dataset');
	var variables = $(catalog0[0]).find('variables');
	var variable = $(catalog0[0]).find('variable');
	var groups = $(catalog0[0]).find('groups');
	var group = $(catalog0[0]).find('group');	
	var StartDates = $('#StartDates').val().split('\n');
	var StopDates = $('#StopDates').val().split('\n');
	var DataReader = $('#DataReader').val();

	
	var TimeColumns = $('#TimeColumns').val();
	var TimeFormat = $('#TimeFormat').val();
			
	// Convert to Java's Simple Date Format, which TSDS (OpenDAP) uses.
	if (0) { // DataCache does not use, so not needed.
		TimeFormat = TimeFormat
					.replace('$Y','yyyy')
					.replace('$y','yy')
					.replace('$m','MM')
					.replace('$d','dd')
					.replace('$H','HH')
					.replace('$j','DDD')
					.replace('$M','mm')
					.replace('$S','ss')
					.replace("$(millis)","S");
	}
	
	// TODO: use delimiter
	//TimeFormat = TimeFormat.replace(',',' '); 

	for (j = 0; j < Datasets.length; j++) {

		var Dataset = Datasets[j].split(',');
		if (Dataset.length > 1) {
			dataset.attr('name',Dataset[1])
		} else {
			dataset.attr('name',Dataset[0])
		}
		dataset.attr('ID',Dataset[0]);

		DataIDs = DataIDsa[0].split(/,/g);
		if (DataIDsa.length > 1) {DataIDs = DataIDsa[j].split(/,/g);}
		
		DataNames = DataNamesa[0].split(/,/g);
		if (DataNamesa.length > 1) {DataNames = DataNamesa[j].split(/,/g);}

		DataLabels = DataLabelsa[0].split(/,/g);
		if (DataLabelsa.length > 1) {
			DataLabels = DataLabelsa[j].split(/,/g);
		}			
		
		DataFillValues = DataFillValuesa[0].split(/,/g);
		if (DataFillValuesa.length > 1) {DataFillValuess = DataFillValuesa[j].split(/,/g);}

		DataColumns = DataColumnsa[0].replace(/\(|\)|\[|\]/g,"").split(/,/g);
		if (DataColumnsa.length > 1) {DataColumns = DataColumnsa[j].replace(/\(|\)|\[|\]/g,"").split(/,/g);}

		DataRenderings = DataRenderingsa[0].split(/,/g);
		if (DataRenderingsa.length > 1) {DataRenderings = DataRenderingsa[j].split(/,/g);}

		DataUnits = DataUnitsa[0].split(/,/g);
		if (DataUnitsa.length > 1) {DataUnits = DataUnitsa[j].split(/,/g);}

		DataValues = DataValuesa[0].split(/,/g);
		if (DataValuesa.length > 1) {DataValues = DataValuesa[j].split(/,/g);}

		DataGroupIDs = DataGroupIDsa[0].split(/,/g);
		if (DataGroupIDsa.length > 1) {DataGroupIDs = DataGroupIDsa[j].split(/,/g);}

		DataGroupNames = DataGroupNamesa[0].split(/,/g);
		if (DataGroupNamesa.length > 1) {DataGroupNames = DataGroupNamesa[j].split(/,/g);}

		DataGroupLabels = DataGroupLabelsa[0].split(/,/g);
		if (DataGroupLabelsa.length > 1) {DataGroupLabels = DataGroupLabelsa[j].split(/,/g);}

		dataset.attr('timecolumns',TimeColumns);
		dataset.attr('timeformat',TimeFormat);
		dataset.attr('datareader',DataReader);
		dataset.attr('urltemplate',DatasetTemplates[j]);
		//dataset.find('access').attr('urlPath',Dataset[0]);
		dataset.find('Start').text(StartDates[j]);
		dataset.find('End').text(StopDates[j]);
		dataset.find('documentation').attr("xlink:title",DatasetDescription[j]);
		dataset.find('documentation').attr("xlink:href",DatasetDescriptionURL[j]);
		
		var lineregex = $('#LineRegex').val();
		
		String.prototype.repeat = function(times) {return (new Array(times + 1)).join(this);};
		
		for (i = 0;i < DataFillValues.length;i++) {
			DataFillValues[i] = DataFillValues[i].replace(/i([0-9].*)/,function (match,p1) {return "9".repeat(parseInt(p1))});
			DataFillValues[i] = DataFillValues[i].replace(/f([0-9].*)\.([0-9].*)/,function (match,p1,p2) {return "9".repeat(parseInt(p1-p2-1))+"."+"9".repeat(parseInt(p2))});
			DataFillValues[i] = DataFillValues[i].replace(/e([0-9].*)\.([0-9].*)/,function (match,p1,p2) {return "9."+"9".repeat(parseInt(p2))+"e+"+"09"});
			//console.log(DataFillValues[i]);
		}

		for (i = 0;i < DataIDs.length;i++) {
			DataIDs[i] = DataIDs[i].replace(/\$([0-9])/,"'+Dataset[$1-1]+'");
			DataNames[i] = DataNames[i].replace(/\$([0-9])/,"'+Dataset[$1-1]+'");
			DataLabels[i] = DataLabels[i].replace(/\$([0-9])/,"'+Dataset[$1-1]+'").replace(/&#44;/g,",");
		}

		var DataGroups             = $("#DataColumns").val().match(/\((.*?)\)/g);
		var DataGroupElementValues = $("#DataValues").val().match(/\((.*?)\)/g);
		var DataGroupElements      = $("#DataIDs").val().match(/\((.*?)\)/g);

		//var DataGroupIDs     = $("#DataGroupIDs").val().split(/,/g);
		//var DataGroupNames   = $("#DataGroupNames").val().split(/,/g);
		//var DataGroupLabels  = $("#DataGroupLabels").val().split(/,/g);

//		console.log(DataGroups)
		groups.empty();

		if (DataGroups) {
			for (i = 0;i < DataGroups.length;i++) {
				
				ID = DataGroupIDs[i].replace(/\$([0-9])/,"'+Dataset[$1-1]+'");
				if (ID.match(/Dataset\[/)) ID = eval("'" + ID + "'");
				group.attr('id',ID);

				if (DataGroupElementValues)	
					group.attr('values',DataGroupElementValues[i].replace(/\(|\)|\[|\]/g,""));

				name = DataGroupNames[i].replace(/\$([0-9])/,"'+Dataset[$1-1]+'");
				if (name.match(/Dataset\[/)) name = eval("'" + name + "'");
				group.attr('name',name);

				label = DataGroupLabels[i].replace(/\$([0-9])/,"'+Dataset[$1-1]+'");
				if (label.match(/Dataset\[/)) label = eval("'" + label + "'");
				group.attr('label',label);

				if (DataGroups[i].match(/\)/)) {
					group.attr('type','vector');
				} else {
					group.attr('type','spectrogram');
				}

				var elements = DataGroupElements[i].replace(/\(|\)|\[|\]/g,"");
				elements = elements.replace(/\$([0-9])/g,"'+Dataset[$1-1]+'");
				if (elements.match(/Dataset\[/)) elements = eval("'" + elements + "'");

				//group.attr('elements',elements);
				
				group.attr('id',elements);
				$($.parseXML($.xml2str(group[0]))).find('group').appendTo(groups);

			}
		}
		
		variables.empty();
		
		// Lengths should match.
		//console.log(DataUnits.length)
		//console.log(DataIDs.length)
		for (i = 0;i < DataIDs.length;i++) {
			ID = DataIDs[i].replace(/\$([0-9])/,"'+Dataset[$1-1]+'");
			ID = eval("'" + ID + "'");
			ID = ID.replace(/\(|\)|\[|\]/g,"");

			name = DataNames[i].replace(/\$([0-9])/,"'+Dataset[$1-1]+'");
			name = eval("'" + name + "'");
			name = name.replace(/\(|\)|\[|\]/g,"");

			label = DataLabels[i].replace(/\$([0-9])/,"'+Dataset[$1-1]+'");
			label = eval("'" + label + "'");
			label = label.replace(/\(|\)|\[|\]/g,"");

			fillvalue = DataFillValues[i];

			rendering = DataRenderings[i];
			columns = DataColumns[i];
			
			if (DataUnits.length == 1 && DataUnits[0] === "") {
				unit = "";
			} else {
				unit = DataUnits[i].replace(/\$([0-9])/,"'+Dataset[$1-1]+'");
				unit = eval("'" + unit + "'");
			}
			variable.attr('id',ID).attr('name',ID).attr('name',name).attr('label',label).attr('units',unit).attr('type','scalar').attr('fillvalue',fillvalue).attr('rendering',rendering).attr('columns',columns).attr('lineregex',lineregex);
			$($.parseXML($.xml2str(variable[0]))).find('variable').appendTo(variables);
		}
		$($.parseXML($.xml2str(dataset[0]))).find('dataset').appendTo(catalog);
		
	}
	return $.xml2str(catalog[0])
}
