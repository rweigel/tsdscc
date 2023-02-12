# catalog.js gets catalog information from CDAWeb (XML) and writes into JSON files
# in ./json. It gets parameter names from ASCII listing of data. It may need to try multiple requests
# to get metadata if no data returned when time range in metadata is used.
# ids_vars.js reads these files and creates a list of parameters ids_vars-in.txt
# This file is used by getMetadata.jy to write ids_vars-out.txt, which contains additional metadata.
# json2tsml.js reads ids_vars-out.txt and files in ./json to create TSML.

all:
	- mv CDAWeb-tsds.xml archive/CDAWeb-tsds-`/bin/date +\%Y\%m\%d`.xml
	node catalog.js
	node ids_vars.js
	java -Djava.awt.headless=true -jar autoplot.jar org.virbo.autoplot.AutoplotUI --script getMetadata.jy
	node json2tsml.js

clean:
	- mv CDAWeb-tsml.xml archive/CDAWeb-tsds-`/bin/date +\%Y\%m\%d`.xml
	- rm -f json/*
	- rm -f CDAWeb-IDs.json