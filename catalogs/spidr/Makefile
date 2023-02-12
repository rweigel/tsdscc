CAT=SPIDR
XSLT=49B86C81-0DDA-01DC-5B62-E513E02B4F7F

DATE=`date` 
DATE2=`date "+%Y%m%d"`
RAW=CDAWeb-$(DATE2).raw
#URL=http://tsds.org/catalogs/raw/$(RAW)
URL=http://mag.gmu.edu/tsds/catalogs/raw/$(RAW)
DIR_AUTOPLOT=/var/www/autoplot/bookmarks
DIR_TSDS=/var/www/tsds/catalogs
XML2THREDDS=http://virbo.org/exist/servlet/db/virbo/xq/xsltransform.xql?xslt=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=$(XSLT)%26filetype=data

autoplot: $(CAT).xml

thredds: $(CAT).thredds

all: clean thredds autoplot clean


$(CAT).raw: 
	wget -O $(CAT).raw "http://spidr.ngdc.noaa.gov/spidr/servlet/GetMetadata?ts_catalog=xml"

$(CAT).xml: $(CAT).raw
	mkdir -p $(DIR_TSDS)/raw
	cp $(CAT).raw $(DIR_TSDS)/raw/$(RAW)
	wget -O $(CAT).xml "$(XML2THREDDS)&url=$(URL)&output=autoplot"
	gzip -c $(CAT).xml > $(CAT).xml.gz
	mkdir -p $(DIR_AUTOPLOT)/archive
	cp $(CAT).xml $(DIR_AUTOPLOT)/archive/$(CAT)-$(DATE2).xml; ln -f $(DIR_AUTOPLOT)/archive/$(CAT)-$(DATE2).xml $(DIR_AUTOPLOT)/$(CAT).xml
	cp $(CAT).xml.gz $(DIR_AUTOPLOT)/archive/$(CAT)-$(DATE2).xml.gz; ln -f $(DIR_AUTOPLOT)/archive/$(CAT)-$(DATE2).xml.gz $(DIR_AUTOPLOT)/$(CAT).xml.gz

$(CAT).thredds: $(CAT).raw
	mkdir -p $(DIR_TSDS)/raw
	cp $(CAT).raw $(DIR_TSDS)/raw/$(RAW)
	wget -O $(CAT).thredds "$(XML2THREDDS)&output=thredds&date=$(DATE)"
	mkdir -p $(DIR_TSDS)/archive
	cp $(CAT).thredds $(DIR_TSDS)/archive/$(CAT)-$(DATE2).thredds; ln -f $(DIR_TSDS)/archive/$(CAT)-$(DATE2).thredds $(DIR_TSDS)/$(CAT).thredds

clean:
	- rm -f *.thredds
	- rm -f *.raw
	- rm -f *.txt
	- rm -f *.xml*