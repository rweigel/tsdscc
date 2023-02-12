
DIR=Weygand/Wind/MFI/Propagated.3DP/GSM/V3/
all:
	curl http://vmo.igpp.ucla.edu/data1/sandbox/Weygand/Wind/MFI/Propagated.3DP/GSM/V3/PT60S.xml > PT60S.xml
	mkdir -p $(DIR)
	node spase2tsds-demo.js PT60S.xml $DIR