# Usage: perl wdcHR2dat.pl
# 
# Reads in all xyz*.wdc files in current directory.
# Output file is named xyz_HR.dat, where xyz is the
# observatory 3-letter code.
# 
# Output file has columns YEAR MONTH DAY ELEMENT QD TB DATA AVE
# Element is 0,1,2,3,4,5 for D,H,X,Y,Z,F
# QD = 1 for international quiet and 2 for disturbed
# TB is the tabular base.
# DATA is 24 columns
# AVE is the average

# R.S. Weigel, 03/10/2005

# To do: put in a check for files that don't appear to be WDC 1-hour
# data files.

use File::Find;

system("rm -f *.dat");
@directory = ('./');

open(ER_LOG,">>$ARGV[0]/wdcMIN2dat.log");

find(\&wanted, @directory);

close(ER_LOG);

$chunk_end = 0;

sub wanted {

    $k = 1;
    $k_bad = 0;

# To process only one station
#    if ($_ =~ m/sjg.*\.wdc/){
    if ($_ =~ m/.*\.wdc/){
	print "wdcHR2dat.pl is reading $_ ...";
	open(DATA_in,"$_");

	$line1      = <DATA_in>;
	$DATA_OUT   = $line1;
	$DATA_OUT   =~ s/^([A-Z][A-Z][A-Z]).*/$1_HR\.dat/;
	
	open(DATA_out,">>$ARGV[0]/$DATA_OUT");	    

	$ST = substr($line1,0,3);

	#$YR = substr($line1,3,2); # Get year from file
	$YR = $_; # Get year from filename

	$YR = substr($_,3,4);

	if ($_ =~ m/liv9612h\.wdc/) {
	    $YR = "1996"; # Correct a misnamed file 
	}

	$MO = substr($line1,5,2);
	$EL = substr($line1,7,1);
	$EL =~ s/D/ 0 /;
	$EL =~ s/H|h/ 1 /; 
	$EL =~ s/X/ 2 /;
	$EL =~ s/Y/ 3 /;
	$EL =~ s/Z/ 4 /;
	$EL =~ s/F/ 5 /;
	$EL =~ s/I/ 6 /;

	$DY = substr($line1,8,2);

	$QD = substr($line1,14,1);
	$TB = substr($line1,16,4);

	$DAT = substr($line1,20,96);
	$DAT =~ s/(....)/$1 /g;
	$AVE = substr($line1,116,4);

	if ($QD =~ m/ /) {
	    $QD = 99999; # If no quiet day information
	}
	if ($QD =~ m/Q/) {
	    $QD = 1; # Some files use letter instead of number
	}
	if ($QD =~ m/D/) {
	    $QD = 2; # Some files use letter instead of number
	}

	print DATA_out "$YR $MO $DY $EL $QD $TB $DAT $AVE\n";
#	print "$YR $MO $DY $EL $QD $TB $DAT $AVE\n";
	while ($line = <DATA_in>) {

	    $MO = substr($line,5,2);
	    $EL = substr($line,7,1);
	    $EL =~ s/D/ 0 /;
	    $EL =~ s/H|h/ 1 /;
	    $EL =~ s/X/ 2 /;
	    $EL =~ s/Y/ 3 /;
	    $EL =~ s/Z/ 4 /;
	    $EL =~ s/F/ 5 /;
	    $EL =~ s/I/ 5 /;
	    $DY = substr($line,8,2);

	    $QD = substr($line,14,1);
	    $TB = substr($line,16,4);
	    
	    $DAT = substr($line,20,96);
	    $DAT =~ s/(....)/$1 /g;
	    $AVE = substr($line,116,4);

	    if ($QD =~ m/ /) {
		$QD = 99999; # If no quiet day information
	    }
	    if ($QD =~ m/Q/) {
		$QD = 1; # Some files use letter instead of number
	    }
	    if ($QD =~ m/D/) {
		$QD = 2; # Some files use letter instead of number
	    }

	    $line = "$YR $MO $DY $EL $QD $TB $DAT $AVE\n";

	    # Check number of columns
	    @Line = split(" ", $line);

	    if ($#Line != 30) {
		print ER_LOG "$_: Line $k before: $line1\n";
		print ER_LOG "$_: Line $k after : $line\n";
		$k_bad = $k_bad + 1;
	    } else {
		print DATA_out $line;
	    }

#	    print "$YR $MO $DY $EL $QD $TB $DAT $AVE\n";
	    $k = $k+1;

	}
	
	chomp($DATA_OUT);
	$k = $k-1;
	print " Concatanated to $ARGV[0]/$DATA_OUT.  Dropped $k_bad/$k lines.\n";

    }
    close(DATA_OUT);
    close(DATA_in);
#    print "\n";
}

