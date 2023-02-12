CAT=LISIRD
XSLT=AFB53D08-0ECC-3E98-B82F-30C55266E850

DATE=`date` 
DATE2=`date "+%Y%m%d"`
RAW=$(CAT)-$(DATE2).raw
#URL=http://tsds.org/catalogs/raw/$(RAW)
URL=http://mag.gmu.edu/tsds/catalogs/raw/$(RAW)
DIR_AUTOPLOT=/var/www/autoplot/bookmarks
DIR_TSDS=/var/www/tsds/catalogs
XML2THREDDS=http://virbo.org/exist/servlet/db/virbo/xq/xsltransform.xql?xslt=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=$(XSLT)%26filetype=data

thredds: $(CAT).thredds

# grep -Po 'urlPath=".*?"' catalog.thredds | grep -Po '".*?"' | perl -pi -e 's#"(.*)"#$1#g'
# grep -Po 'urlPath=".*?"' catalog.thredds | grep -Po '".*?"' | perl -pi -e 's#"(.*)"#$1#g'

all: $(CAT).xml

$(CAT).xml:
	perl times.pl
	perl thredds.pl

# This can take 2 minutes or more.  XSLT must make a web hit to LISIRD to get start/stop for each parameter.
$(CAT).thredds: $(CAT).raw
	mkdir -p $(DIR_TSDS)/raw
	cp $(CAT).raw $(DIR_TSDS)/raw/$(RAW)
	wget -O $(CAT).thredds "$(XML2THREDDS)&output=thredds&date=$(DATE)"
	mkdir -p $(DIR_TSDS)/archive
	cp $(CAT).thredds $(DIR_TSDS)/archive/$(CAT)-$(DATE2).thredds; ln -f $(DIR_TSDS)/archive/$(CAT)-$(DATE2).thredds $(DIR_TSDS)/$(CAT).thredds

clean:
	- rm -f *.raw
	- rm -f src/*.class
	- rm -f *.txt
	- rm -f *.xml*