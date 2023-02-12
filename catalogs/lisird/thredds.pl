#!/bin/perl 

use LWP::Simple;
use LWP::UserAgent;
use HTTP::Request;
use HTTP::Response;

#Set up a browser agent to make requests from
$browser = LWP::UserAgent->new();

#Easier to get this string out of the way of code and insert later as a variable
$sorce_ssi_string="[0.50:1:309.50],310.25,310.48,310.71,310.95,311.18,311.42,311.65,311.89,312.12,312.36,312.60,312.84,313.08,313.32,313.56,313.80,314.04,314.28,314.53,314.77,315.02,315.26,315.51,315.75,316.00,316.25,316.50,316.75,317.00,317.25,317.50,317.75,318.01,318.26,318.51,318.77,319.02,319.28,319.54,319.80,320.06,320.32,320.58,320.84,321.10,321.36,321.62,321.89,322.15,322.42,322.69,322.95,323.22,323.49,323.76,324.03,324.30,324.57,324.85,325.12,325.39,325.67,325.94,326.22,326.50,326.78,327.06,327.34,327.62,327.90,328.18,328.47,328.75,329.04,329.32,329.61,329.90,330.19,330.48,330.77,331.06,331.35,331.64,331.94,332.23,332.53,332.83,333.12,333.42,333.72,334.02,334.32,334.63,334.93,335.23,335.54,335.85,336.15,336.46,336.77,337.08,337.39,337.71,338.02,338.33,338.65,338.96,339.28,339.60,339.92,340.24,340.56,340.88,341.21,341.53,341.86,342.18,342.51,342.84,343.17,343.50,343.83,344.17,344.50,344.84,345.17,345.51,345.85,346.19,346.53,346.88,347.22,347.56,347.91,348.26,348.60,348.95,349.30,349.66,350.01,350.36,350.72,351.08,351.43,351.79,352.15,352.52,352.88,353.24,353.61,353.98,354.34,354.71,355.08,355.46,355.83,356.20,356.58,356.96,357.34,357.72,358.10,358.48,358.86,359.25,359.64,360.03,360.42,360.81,361.20,361.59,361.99,362.39,362.79,363.19,363.59,363.99,364.39,364.80,365.21,365.62,366.03,366.44,366.85,367.27,367.69,368.10,368.52,368.95,369.37,369.79,370.22,370.65,371.08,371.51,371.94,372.38,372.81,373.25,373.69,374.13,374.58,375.02,375.47,375.92,376.37,376.82,377.28,377.73,378.19,378.65,379.11,379.57,380.04,380.51,380.98,381.45,381.92,382.39,382.87,383.35,383.83,384.31,384.80,385.28,385.77,386.26,386.76,387.25,387.75,388.25,388.75,389.25,389.76,390.26,390.77,391.29,391.80,392.32,392.84,393.36,393.88,394.40,394.93,395.46,395.99,396.53,397.07,397.61,398.15,398.69,399.24,399.79,400.34,400.89,401.45,402.01,402.57,403.13,403.70,404.27,404.84,405.41,405.99,406.57,407.15,407.74,408.33,408.92,409.51,410.11,410.70,411.31,411.91,412.52,413.13,413.74,414.36,414.98,415.60,416.22,416.85,417.48,418.11,418.75,419.39,420.04,420.68,421.33,421.98,422.64,423.30,423.96,424.63,425.30,425.97,426.65,427.32,428.01,428.69,429.38,430.08,430.77,431.47,432.18,432.89,433.60,434.31,435.03,435.75,436.48,437.21,437.94,438.68,439.42,440.17,440.92,441.67,442.43,443.19,443.96,444.73,445.50,446.28,447.06,447.85,448.64,449.43,450.23,451.04,451.85,452.66,453.48,454.30,455.13,455.96,456.80,457.64,458.48,459.33,460.19,461.05,461.92,462.79,463.66,464.54,465.43,466.32,467.22,468.12,469.03,469.94,470.86,471.78,472.71,473.64,474.58,475.53,476.48,477.44,478.40,479.37,480.34,481.33,482.31,483.31,484.30,485.31,486.32,487.34,488.37,489.40,490.43,491.48,492.53,493.59,494.65,495.72,496.80,497.89,498.98,500.08,501.19,502.30,503.42,504.55,505.69,506.83,507.99,509.14,510.31,511.49,512.67,513.86,515.06,516.27,517.49,518.71,519.94,521.18,522.43,523.69,524.96,526.24,527.52,528.82,530.12,531.44,532.76,534.09,535.43,536.79,538.15,539.52,540.90,542.29,543.69,545.11,546.53,547.96,549.41,550.86,552.33,553.80,555.29,556.79,558.30,559.82,561.36,562.90,564.46,566.03,567.61,569.21,570.81,572.43,574.06,575.71,577.37,579.04,580.72,582.42,584.13,585.86,587.59,589.35,591.11,592.90,594.69,596.50,598.33,600.17,602.03,603.90,605.78,607.69,609.60,611.54,613.49,615.46,617.44,619.44,621.46,623.49,625.54,627.61,629.70,631.81,633.93,636.07,638.23,640.41,642.61,644.82,647.06,649.31,651.59,653.88,656.20,658.53,660.89,663.27,665.66,668.08,670.52,672.99,675.47,677.98,680.50,683.06,685.63,688.23,690.85,693.49,696.16,698.85,701.56,704.30,707.07,709.85,712.67,715.51,718.37,721.26,724.18,727.12,730.09,733.08,736.10,739.15,742.22,745.33,748.46,751.61,754.80,758.01,761.26,764.53,767.83,771.15,774.51,777.90,781.31,784.76,788.23,791.73,795.27,798.83,802.42,806.05,809.70,813.39,817.10,820.85,824.62,828.43,832.26,836.13,840.03,843.96,847.92,851.91,855.93,859.99,864.07,868.18,872.33,876.50,880.71,884.94,889.21,893.50,897.83,902.19,906.57,910.99,915.43,919.91,924.41,928.94,933.50,938.09,942.70,947.35,952.74,957.41,962.11,966.83,971.58,976.35,981.15,985.98,990.82,995.70,1000.59,1005.51,1010.45,1015.42,1020.41,1025.41,1030.44,1035.49,1040.57,1045.66,1050.77,1055.90,1061.04,1066.21,1071.39,1076.59,1081.81,1087.04,1092.29,1097.55,1102.83,1108.13,1113.43,1118.75,1124.09,1129.43,1134.79,1140.16,1145.53,1150.92,1156.32,1161.73,1167.15,1172.57,1178.01,1183.45,1188.90,1194.35,1199.82,1205.28,1210.76,1216.23,1221.72,1227.20,1232.69,1238.19,1243.68,1249.18,1254.68,1260.19,1265.69,1271.20,1276.70,1282.21,1287.72,1293.22,1298.73,1304.24,1309.74,1315.24,1320.74,1326.24,1331.74,1337.23,1342.72,1348.21,1353.69,1359.17,1364.64,1370.12,1375.58,1381.04,1386.50,1391.95,1397.40,1402.84,1408.28,1413.71,1419.13,1424.55,1429.96,1435.36,1440.76,1446.15,1451.54,1456.91,1462.28,1467.64,1473.00,1478.34,1483.68,1489.01,1494.33,1499.65,1504.95,1510.25,1515.54,1520.82,1526.09,1531.36,1536.61,1541.86,1547.09,1552.32,1557.54,1562.75,1567.95,1573.14,1578.32,1583.49,1588.65,1593.80,1598.95,1601.18,1616.86,1632.42,1647.91,1663.31,1678.61,1693.82,1708.93,1723.95,1738.86,1753.69,1768.43,1783.07,1797.62,1812.08,1826.44,1840.72,1854.90,1869.00,1883.00,1896.92,1910.75,1924.48,1938.13,1951.71,1965.19,1978.59,1991.92,2005.15,2018.31,2031.38,2044.38,2057.30,2070.13,2082.89,2095.58,2108.19,2120.73,2133.20,2145.59,2157.91,2170.15,2182.34,2194.44,2206.48,2218.45,2230.36,2242.20,2253.97,2265.68,2277.33,2288.91,2300.43,2311.89,2323.28,2334.63,2345.90,2357.11,2368.28,2379.37,2390.42,2401.40,2412.34";


#Function for getting a list of datasets
sub GetPaths {
	$URL = @_[0];
	print "Getting Path URL: $URL\n";
	my $request = HTTP::Request->new(GET => $URL);
	my $response = $browser->request($request);
	if ($response->is_error()) {printf "%s\n", $response->status_line;}
	$contents = $response->content();
#Array of paths to datasets
	my @Paths;
	push @Paths, $1 while $contents=~/urlPath="(.+?)"/g;
	return @Paths;
}

#Function for getting the start and stop times of each dataset from the timeserver
sub GetTimes {
	my @times;
	$Base=@_[0];
	$URLstart="http://lasp.colorado.edu/lisird/tss/$Base.dat?time&first()&format_time(yyyy-MM-dd)";
	$URLstop="http://lasp.colorado.edu/lisird/tss/$Base.dat?time&last()&format_time(yyyy-MM-dd)";

#Two requests: one for start, one for stop
	my $request = HTTP::Request->new(GET => $URLstart);
	my $response = $browser->request($request);
	if ($response->is_error()) {printf "%s\n", $response->status_line;}
	$contents = $response->content();
	push @times, $contents;

	my $request = HTTP::Request->new(GET => $URLstop);
	my $response = $browser->request($request);
	if ($response->is_error()) {printf "%s\n", $response->status_line;}
	$contents = $response->content();
	push @times, $contents;

	return @times;
}

#Function to get the variables in each dataset
sub GetVars {
	$Base=@_[0];
	my %HoH;
	$URL="http://lasp.colorado.edu/lisird/tss/$Base.das";
	print "Getting Var URL: $URL\n";
	my $request = HTTP::Request->new(GET => $URL);
	my $response = $browser->request($request);
	if ($response->is_error()) {printf "%s\n", $response->status_line; return}
	$contents = $response->content();

	my $order=0;
#Start by splitting up the page contents by an ending curly brace
#This leaves the first few higher order nodes in the first element, but seperates the rest by variable
	@items = split('}',$contents);
	foreach $item(@items){
#Look for a line that ends in a variable name and an opening brace, capture the name
		$item=~/.*\W(\w+) \{/; 		
		$ID=$1;

#The first element will generally capture the name "attributes"
#If it matches, gather metadata and move on
		if($item=~/attributes/)
		{
			if($item=~/title "(.+?)"/){$HoH{'attributes'}{'name'}=$1;}
			if($item=~/description "(.+?)"/){$HoH{'attributes'}{'label'}=$1;}
			if($item=~/resolution "(.+?)"/){$HoH{'attributes'}{'cadence'}=$1;}
			next; #Skip the rest of the time element
		}
#If the element matches a Spectrum, get column widths and units as metadata, then move on
		if($item=~/Spectrum/) 
		{
			if($item=~/int32 length (\d+)/){$HoH{'attributes'}{'spectrum'}=$1;}
			if($item=~/string units "(.+?)"/){$HoH{'attributes'}{'columnlabelunits'}=$1;}
			next;
		}
#If not attributes or spectrum, it's a variable.
#Catch the ID (\w+) and the value (obscure bit), and put them in a hash
		while($item=~/(?:string|float64) (\w+) "?([^"]+)"?;/g)
		{
			$HoH{$ID}{$1}=$2;
		}
#Make note of the order variables were added to the hash to reproduce later
		$HoH{$ID}{'order'}=$order;
		$order=$order+1;
	}
	return %HoH;
}

############################
#Main function
############################

#Some variables need names replaced
my %replace =(
		resolution=>"cadence",
		long_name=>"label",
		description=>"description",
		missing_value=>"fillvalue",
		title=>"name");
my $reg = join "|", keys %replace;
$reg=qr/$reg/;

#Open an xml file to print everything to, and add default header info
open(FH,">./LISIRD.xml") or die "Can't open LISIRD.xml";
print FH <<EOF;
<catalog xmlns:xlink="http://www.w3.org/1999/xlink" id="LISIRD" name="LISIRD">
<documentation xlink:href="http://lasp.colorado.edu/lisird/tss/catalog.thredds" xlink:title="Catalog based on http://lasp.colorado.edu/lisird/tss/catalog.thredds"/>
EOF

#The default place to start looking for datasets
$startfile="http://lasp.colorado.edu/lisird/tss/catalog.thredds";
foreach $Path(GetPaths($startfile))
{
#Get the pre-found times. Run times.pl first.
	unless(open(TIME,"<./tmp/$Path.times")) {print "Can't open $Path.times. Did you run times.pl? Skipping.\n"; next;}
	@PathTimes=<TIME>;
	$PathTimeString=join('',@PathTimes);
	if($PathTimeString=~/(error|failed)/){print "Error in times from $Path. Skipping.\n"; next;}
	close(TIME);

#Get the variables from the das file, add them to a hash
	my %HoH=GetVars($Path);
	my @allvars; 
#Make a list of all variables in order, for adding to the urltemplate
	foreach $var(sort { $HoH{$a}{'order'} <=> $HoH{$b}{'order'} } keys %HoH){
		unless($var=~/attributes/) {push @allvars, $var;}
	}
	$allvarlist=join(',',@allvars);

#Check if this path is a spectrum, and if so, get the column width
	my $columnadd=(exists $HoH{'attributes'}{'spectrum'} ? $HoH{'attributes'}{'spectrum'}-1 : 0); 

#Check for and fill in the name and label attributes, if they exist
	my $name='';
	my $label='';
	if (exists $HoH{'attributes'}{'name'}){$name="name='$HoH{'attributes'}{'name'}'";}
	if (exists $HoH{'attributes'}{'label'}){$label="label='$HoH{'attributes'}{'label'}'";}

#Print out the dataset, documentation, and time coverage nodes
	print FH <<EOF;
	<dataset id='$Path' $name $label datareader='dat' timecolumns='1' timeformat='\$Y-\$m-\$dT\$H:\$M:\$S' urltemplate="http://lasp.colorado.edu/lisird/tss/$Path.dat?time,$allvarlist%26format_time(yyyy-MM-dd%27T%27HH:mm:ss)">
		<documentation xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='http://lasp.colorado.edu/lisird/tss/$Path.html' xlink:title='Dataset documentation'/>
		<timeCoverage>
		$PathTimes[0]		$PathTimes[1]		<Cadence>$HoH{'attributes'}{'cadence'}</Cadence>
		</timeCoverage>
EOF


#Start filling out the "variables" node with specific column labels if it's a spectrum
	print FH "<variables ";
	if($columnadd>0)
	{
#Set default string for columnlabels, overwrite it if it's any of the specified datasets
		$columnlabels="columnlabels='http://lasp.colorado.edu/lisird/tss/$Path.dat?time,wavelength'"; 
		if($Path=~/(sorce_ssi|timed_see_egs_l2|timed_see_ssi|uars_solstice_ssi|sme_ssi)/)
		{
			$columnlabels="columnlabels='";
			if($Path=~/sorce_ssi/){$columnlabels.="$sorce_ssi_string'";}
			elsif($Path=~/timed_see_egs_l2/){$columnlabels.="[26.05:0.1:194.95]'";}
			elsif($Path=~/timed_see_ssi(?:_l3a)?$/){$columnlabels.="[0.5:1:194.5]'";}
			elsif($Path=~/timed_see_ssi_l4/){$columnlabels.="[0.05:0.1:39.95]'";}
			elsif($Path=~/uars_solstice_ssi/){$columnlabels.="[119.5:1:419.5]'";}
			elsif($Path=~/sme_ssi/){$columnlabels.="[115.5:1:302.5]'";}
		}
#Whether changed or not, print it to the xml file along with units
		print FH "$columnlabels columnlabelunits='" .  $HoH{'attributes'}{'columnlabelunits'} . "'"; 
	}
	print FH ">\n";

#Start printing variables by looping over hash keys (IDs) in order
	$columncount=2;
	foreach $ID(sort { $HoH{$a}{'order'} <=> $HoH{$b}{'order'} } keys %HoH){
#This shouldn't be hit, but if attributes made it through, skip it
		if($ID=~/attributes/){next;}
#If not a spectrum, columnadd should be 0, and each variable should only have one column
		if($columnadd==0 or $ID=~/cor_1au/){print FH "\t\t<variable id='$ID' columns='$columncount'";}
#Otherwise print out the range of columns covered by each variable
		else #($columnadd>0)
		{
			print FH "\t\t<variable id='$ID' columns='$columncount-" . sprintf("%d",($columncount+$columnadd)) . "'";
		}
#Now loop over each key of each ID, corresponding to specific variables
		foreach $var(keys %{$HoH{$ID}})
		{
			if($var=~/order/){next;}
			$hashvar=$var;
#Replace names where needed by pre-made table
			$var =~ s/($reg)/$replace{$1}/g;
#Print varible and its value
			print FH " $var='$HoH{$ID}{$hashvar}'";
		}
		print FH "></variable>\n";

    if($ID=~/cor_1au/){$columncount=$columncount+1;}
		else{$columncount=$columncount+$columnadd+1;}
	}

#Close out the dataset, then notify user that this part is done
	print FH "\n\t\t</variables>\n\t</dataset>\n";
	print "Done with dataset: $Path\n";
}
#Close out the catalog, let user know file was written
print FH "</catalog>";
print "Done with file LISIRD.xml\n";
close(FH);


