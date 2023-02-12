#wget -O VSEO.raw "http://vseo.space.swri.edu/sddas/GetFullInventory.cgi"
cp VSEO.raw ../../tsds/catalogs

#wget -O ../../tsds/catalogs/VSEO.thredds "http://virbo.org/exist/servlet/db/virbo/xq/xsltransform.xql?xml=/db/virbo/XSL/7F34AF69-3ADE-89E9-6449-D63B65673413.xml&xslt=/db/virbo/XSL/7F34AF69-3ADE-89E9-6449-D63B65673413.xml&output=thredds"

#wget -O VSEO.xml "http://virbo.org/exist/servlet/db/virbo/xq/xsltransform.xql?xml=/db/virbo/XSL/7F34AF69-3ADE-89E9-6449-D63B65673413.xml&xslt=/db/virbo/XSL/7F34AF69-3ADE-89E9-6449-D63B65673413.xml&output=autoplot-reduced"

wget -O VSEO.xml "http://virbo.org/exist/servlet/db/virbo/xq/xsltransform.xql?xml=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=7F34AF69-3ADE-89E9-6449-D63B65673413%26filetype=data&xslt=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=7F34AF69-3ADE-89E9-6449-D63B65673413%26filetype=data&output=autoplot-reduced"
gzip -c VSEO.xml > VSEO.xml.gz

#wget -O VSEO_full.xml "http://virbo.org/exist/servlet/db/virbo/xq/xsltransform.xql?xml=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=7F34AF69-3ADE-89E9-6449-D63B65673413%26filetype=data&xslt=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=7F34AF69-3ADE-89E9-6449-D63B65673413%26filetype=data&output=autoplot-full"
#gzip -c VSEO_full.xml > VSEO_full.xml.gz

#wget -O VSEO_pspase.xml "http://virbo.org/exist/servlet/db/virbo/xq/xsltransform.xql?xml=/db/virbo/XSL/7F34AF69-3ADE-89E9-6449-D63B65673413.xml&xslt=/db/virbo/XSL/7F34AF69-3ADE-89E9-6449-D63B65673413.xml&output=pspase"