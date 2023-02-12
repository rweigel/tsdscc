wget -O /var/www/tsds/catalogs/NSSDC.raw "ftp://cdaweb.gsfc.nasa.gov/pub/cdaweb/all.xml"

wget -O NSSDC.xml "http://virbo.org/exist/servlet/db/virbo/xq/xsltransform.xql?xml=http://autoplot.org/bookmarks/NSSDC.raw&xml&xslt=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=21B27A0B-F734-9F81-8B7B-6D71A8F1845E%26filetype=data&output=autoplot"
gzip -c NSSDC.xml > NSSDC.xml.gz

wget -O /var/www/tsds/catalogs/NSSDC.thredds "http://virbo.org/exist/servlet/db/virbo/xq/xsltransform.xql?xml=http://tsds.net/catalogs/NSSDC.raw&xml&xslt=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=21B27A0B-F734-9F81-8B7B-6D71A8F1845E%26filetype=data&output=thredds"


