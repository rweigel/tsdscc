all: node_modules/
	make clean
	make SuperMAG.xml	

node_modules/: 
	npm install

SuperMAG.xml: SuperMAG.js
	nodejs SuperMAG.js true
    #node SuperMAG.js false # To update xml file based on old .raw file

clean:
	- mv SuperMAG-tsds.xml archive/SuperMAG-tsds-`/bin/date +\%Y\%m\%d`.xml
	- rm SuperMAG-tsds.json
	- rm SuperMAG-tsds.xml
	- rm SuperMAG.raw