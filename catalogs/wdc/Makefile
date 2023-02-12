# TODO:
# Write plug-in for wdcmn.
# Check lat longs

DIR=/media/disk/Data/tsds_data/original-s0
all:
	mirror
	fix
	metadata

# (Could do reads on remote directories and files, but more code is needed.  So first mirror and then create metadata based on files)
mirror:
	wget -m ftp://ftp.nmh.ac.uk/wdc/obsdata/

# Deal with problem zip file that expands to
# data/anon_ftp/wdc/obsdata/1minval/1996/liv9612m.wdc
fix:
	cd $(DIR)/ftp.nmh.ac.uk/wdc/obsdata/1minval/1996/; unzip liv1996m.zip; 
	cd $(DIR)/ftp.nmh.ac.uk/wdc/obsdata/1minval/1996/; mv data/anon_ftp/wdc/obsdata/1minval/1996/liv9612m.wdc .
	cd $(DIR)/ftp.nmh.ac.uk/wdc/obsdata/1minval/1996/; rm -rf data/;
	cd $(DIR)/ftp.nmh.ac.uk/wdc/obsdata/1minval/1996/; rm -f liv1996m.zip; zip -r liv1996m.zip liv9612m.wdc; 
	cd $(DIR)/ftp.nmh.ac.uk/wdc/obsdata/1minval/1996/; rm liv9612m.wdc

metadata:
	node metadata.js
