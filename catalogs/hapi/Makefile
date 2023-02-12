all:
	cdaweb2
	datashop
	testdata

cdaweb2:
	node hapi2tsds.js "http://voyager.gsfc.nasa.gov/hapiproto/hapi/" CDAWeb2 > CDAWeb2.json

datashop:
	node hapi2tsds.js "http://datashop.elasticbeanstalk.com/hapi/" DataShop > DataShop.json

testdata:
	node hapi2tsds.js "http://localhost:8999/hapi/" TestData > TestData.json
