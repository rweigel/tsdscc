# TODO:
# Pipe processed data through gzip before writing.
# Automatically update coordinates.txt based on http://space.fmi.fi/image/coordinates.html

DATE1=`date --date '2 months ago' "+%Y-%m-%d"`
DATE2=`date +%Y-%m-%d"`

all:
	node mirror.js one_min "1982-10-01/2014-12-01"
	make metadata
	node mirror.js orig_int "1982-10-01/2014-12-01"
	make metadata
	make gz

update:
	node mirror.js one_min
	node metadata.js
	node mirror.js orig_int
	node metadata.js
	make gz

gz:
	find data/space.fmi.fi/ -name "*.col2" | xargs -P 12 -i gzip --fast {}

metadata:
	node metadata.js

rsync:
	rsync -av data/space.fmi.fi weigel@mag.gmu.edu:/media/disk/Data/tsds_data/original-s0/
