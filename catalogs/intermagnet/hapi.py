import re

# lftp ftp://ftp.seismo.nrcan.gc.ca/intermagnet/
# du -a > manifest.txt

filename = 'manifest.txt'
print('Reading ' + filename)
with open(filename) as f:
	lines = f.readlines()

print('Parsing ' + str(len(lines)) + ' lines in ' + filename)
s = {}
for line in lines:
	if 'IAGA2002' in line and '.min' in line:
		file = re.sub(r'.*/(.*)',r'\1',line.strip())
		path = re.sub(r'.*\s+(.*)',r'\1',line.strip())
		quality = re.sub(r'.*/minute/(.*?)/.*',r'\1',line.strip())
		if not quality in s:
			print('Found first ' + quality + ' file.')
			s[quality] = {}
		tlc = file[0:3]
		date = file[3:11]
		#print(date)
		if not tlc in s[quality]:
			s[quality][tlc] = {}
			s[quality][tlc]['dates'] = [date]
			s[quality][tlc]['first'] = path
			s[quality][tlc]['last'] = path
		else:
			s[quality][tlc]['dates'].append(date)
			s[quality][tlc]['last'] = path

for quality in s:
	for tlc in s[quality]:
		print(quality,tlc,s[quality][tlc]['dates'][0],s[quality][tlc]['dates'][-1],s[quality][tlc]['first'],s[quality][tlc]['last'])