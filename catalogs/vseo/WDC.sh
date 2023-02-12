wget "http://virbo.org/exist/servlet/db/virbo/xq/xsltransformCache2.xql?xml=http://virbo.org/meta/outersearch%3FsourceUrl=http://virbo.org/meta/%26searchAction=outersearch%26section=NumericalData%26strictSearch=true%26keyNumericalDataResourceID=spase://VIRBO/NumericalData/WDC_geomag_hour-.*-v0%26output=keyNumericalDataResourceID%26output=keyResourceName%26output=keyResourceHeaderDescription%26output=keyStartDate%26output=keyStopDate&xslt=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=7A0B07A4-AEFB-2A0E-68B7-D5D70D732815%26filetype=data" -O WDC_1hour-flat.xml

wget "http://virbo.org/exist/servlet/db/virbo/xq/xsltransformCache2.xql?xml=http://virbo.org/meta/outersearch%3FsourceUrl=http://virbo.org/meta/%26searchAction=outersearch%26section=NumericalData%26strictSearch=true%26keyNumericalDataResourceID=spase://VIRBO/NumericalData/WDC_geomag_minute-.*-v0%26output=keyNumericalDataResourceID%26output=keyResourceName%26output=keyResourceHeaderDescription%26output=keyStartDate%26output=keyStopDate&xslt=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=7A0B07A4-AEFB-2A0E-68B7-D5D70D732815%26filetype=data" -O WDC_1minute-flat.xml

# xslt1 is to collapse when more than 30
# xslt2 is to place similar named-bookmarks in sub-folder

wget "http://virbo.org/exist/servlet/db/virbo/xq/chainedTransform.xql?xml=http://autoplot.org/bookmarks/WDC_1hour-flat.xml&xslt=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=6CC9AD43-DE58-095C-3612-06EC4AAF213F%26filetype=data&xslt1=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=CE21C80F-0944-6DC7-EDD0-9E4C8E1C1797%26filetype=data" -O WDC_1hour.xml

wget "http://virbo.org/exist/servlet/db/virbo/xq/chainedTransform.xql?xml=http://autoplot.org/bookmarks/WDC_1minute-flat.xml&xslt=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=6CC9AD43-DE58-095C-3612-06EC4AAF213F%26filetype=data&xslt1=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=CE21C80F-0944-6DC7-EDD0-9E4C8E1C1797%26filetype=data" -O WDC_1minute.xml

# Expand remoteURL nodes
wget -O WDC.xml "http://virbo.org/exist/servlet/db/virbo/xq/xsltransform.xql?xslt=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=C4D8877C-2B31-F543-BDE6-D6CA9066F204%26filetype=data&xml=http://virbo.org/meta/viewDataFile.jsp%3Fdocname=5DD471E2-456B-4ED5-4E56-80AF73F921A7%26filetype=data"
gzip -c WDC.xml > WDC.xml.gz

