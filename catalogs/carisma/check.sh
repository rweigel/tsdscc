#!/bin/bash

# Check for months with missing last day
for i in $(seq -f "%02g" 1 12);
do
	for j in `seq 1986 2014`;
	do
		ls -1 ./data/www.carisma.ca/zip/$j-$i*.zip
	done
done

for j in `seq 1986 2014`;
#for j in `seq 2005 2014`;
do
	for i in $(seq -f "%02g" 1 12);
	do
		ls -1 ./data/www.carisma.ca/FGM/$j$i* | wc
		ls -1 ./data/www.carisma.ca/zip/$j-$i*.zip
	done
done

