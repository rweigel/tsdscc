# TODO: Request stations one-by-one for a given day instead of mirroring.
# May need to run mirror.js several times.  Sometimes the requests fail for an unknown reason.
# Code skips month if failure.  If re-run, existing data is not re-downloaded.

# Note that October sometimes fails.  31 days are requested, but file created is for 30 days.

mirror:
	node mirror.js "CARISMA"
	node mirror.js "CANOPUS"

metadata:
	node metadata.js "CARISMA"
	node metadata.js "CANOPUS"

