CADENCE=PT1S
CAT=catalog_$(CADENCE).txt

# Creates catalog_CADENCE.txt and catalog_CADENCE_full.json (a list of available files)
catalogs:
	make catalog CADENCE=PT1M 
	make catalog CADENCE=PT1S

catalog:
	make $(CAT) CADENCE=$(CADENCE)

$(CAT): catalog.js
	node catalog.js $(CADENCE) 2>&1 | tee catalog_$(CADENCE).log


mirrors:
	make mirror CADENCE=PT1M 
	make mirror CADENCE=PT1S

# First mirror requests zip of 180 files. Second mirror requests one
# file per day (if zip request includes day with no data, returned zip
# file is empty).
mirror: mirror.js $(CAT)
	node mirror.js $(CADENCE) 1 2>&1 | tee mirror_$(CADENCE).log
	node mirror.js $(CADENCE) 1 1 2>&1 | tee mirror_$(CADENCE).log
	- cd data; find . -name "*.min" | grep -v ".gz" | xargs -P12 gzip --fast {} > /dev/null 2>&1
	make metadata CADENCE=$(CADENCE)

# Update.  Run 2x because sometimes files that are said to exist in
# metadata are not successfully downloaded first time.
#
# TODO: After each run, execute
#       cd data/www.intermagnet.org/; find . -name "*.x" | wc
#       when output of above is the same for two runs, stop.

updates: mirror.js $(CAT)
	make catalogs
	make update CADENCE=PT1M
	make update CADENCE=PT1S
	make update CADENCE=PT1M
	make update CADENCE=PT1S

update:
	node mirror.js $(CADENCE) 1 1 2>&1 | tee mirror_$(CADENCE).log
	- cd data; find . -name "*.min" | grep -v ".gz" | xargs -P12 gzip --fast {} > /dev/null 2>&1
	make metadata CADENCE=$(CADENCE)

# Create TSML
metadatas:
	make metadata CADENCE=PT1M
	make metadata CADENCE=PT1S

metadata:
	make INTERMAGNET_$(CADENCE)-tsds.xml CADENCE=$(CADENCE) 2>&1 | tee metadata_$(CADENCE).log

INTERMAGNET_$(CADENCE)-tsds.xml: metadata.js
	node metadata.js $(CADENCE)

clean:
	- rm -f *tsds.xml
	- rm -f catalog_*.txt	