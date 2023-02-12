# Usage: perl wdcMIN2dat.pl
# 
# Reads in all xyz*.wdc files in current directory.
# Output file is named xyz_MIN.dat, where xyz is the
# observatory 3-letter code.
# 
# Output file has columns YEAR MONTH DAY HOUR ELEMENT DATA AVE
# Element is 0,1,2,3,4,5 for D,H,X,Y,Z,F
# DATA is 60 columns
# AVE is the average

# R.S. Weigel, 03/10/2005

use File::Find;
use Cwd;

@directory = ('./');

open(ER_LOG,">>$ARGV[0]/wdcMIN2dat.log");

find(\&wanted, @directory);

close(ER_LOG);

$chunk_end = 0;

sub wanted {

    $k = 1;
    $k_bad = 0;
    $nD = 0;
    $nH = 0;
    $nX = 0;
    $nY = 0;
    $nZ = 0;
    $nF = 0;
    $error_century_digit = 0;

#    if ($_ =~ m/sjg.*\.wdc/i){
    if ($_ =~ m/.*\.wdc/i){

	print "wdcMIN2dat.pl is reading $_ ... ";
	open(DATA_in,"$_");

	$BASENAME = lc($_);
	$BASENAME =~ s/^([A-Z][A-Z][A-Z]).*/$1/;
	
#	print "wdcMIN2dat.pl is gunzipping $BASENAME*.dat ... ";
#	$com = "gunzip " + $BASENAME + "*.dat";
#	system($com);

	$DATA_OUT_D = lc($_);
	$DATA_OUT_D =~ s/^([A-Z][A-Z][A-Z]).*/$ARGV[0]\/$1\_D\_MIN\.dat/i;
	
	$DATA_OUT_H = lc($_);
	$DATA_OUT_H =~ s/^([A-Z][A-Z][A-Z]).*/$ARGV[0]\/$1\_H\_MIN\.dat/i;
	
	$DATA_OUT_X = lc($_);
	$DATA_OUT_X =~ s/^([A-Z][A-Z][A-Z]).*/$ARGV[0]\/$1\_X\_MIN\.dat/i;

	$DATA_OUT_Y = lc($_);
	$DATA_OUT_Y =~ s/^([A-Z][A-Z][A-Z]).*/$ARGV[0]\/$1\_Y\_MIN\.dat/i;
	
	$DATA_OUT_Z = lc($_);
	$DATA_OUT_Z =~ s/^([A-Z][A-Z][A-Z]).*/$ARGV[0]\/$1\_Z\_MIN\.dat/i;
    
	$DATA_OUT_F = lc($_);
	$DATA_OUT_F =~ s/^([A-Z][A-Z][A-Z]).*/$ARGV[0]\/$1\_F\_MIN\.dat/i;
	
	while ($line1 = <DATA_in>) {
	    
	    $ST = substr($line1,0,3);

	    $curr_dir = getcwd();
	    #print "$curr_dir\n";
	    $YR = substr($curr_dir,-4,4);
	    #print "$curr_dir\n";

	    # Too many problems with year and century digits in file, so
	    # use directory name (as above) instead to determine year.
	    if (0) {
		$YR    = substr($line1,12,2);
		$YR_cd = substr($line1,25,1);
		
		if ($YR_cd !~ m/8|9|0| /) {
		    $k_bad = $k_bad+1;
		    $good_line = 0;
		    $error_century_digit = 1;
		}
	    
		$YR =~ s/ ([0-9])/0$1/; # Years labeled as " 0" changed to "00"
		
		if ($YR_cd =~ m/9| |  /){
		    $YR = "19" . $YR;
		} 
		if ($YR_cd =~ m/8/){
		    $YR = "18" . $YR;
		}
		if ($YR_cd =~ m/0/){
		    $YR = "20" . $YR;
		}
	    }
	    
	    $MO = substr($line1,14,2);
	    $EL = substr($line1,18,1);
	    $ELstr = $EL;
	    $EL =~ s/D/ 0 /;
	    $EL =~ s/H|h/ 1 /; 
	    $EL =~ s/X/ 2 /;
	    $EL =~ s/Y/ 3 /;
	    $EL =~ s/Z/ 4 /;
	    $EL =~ s/F/ 5 /;
	    $DY = substr($line1,16,2);
	    $HR = substr($line1,19,2);

#	    $PorD = substr($line1,26,1);
#	    $PorD =~ s/P/ 0 /i;
#	    $PorD =~ s/D/ 1 /i;
	    
	    $DAT = substr($line1,34,360);
	    $DAT =~ s/(......)/$1 /g;
	    $AVE = substr($line1,394,6);
	    
	    $line = "$YR $MO $DY $HR $EL $DAT $AVE\n";
#	    $line = "$YR $MO $DY $HR $EL $DAT $AVE $PorD\n";
	    # Check number of columns
	    @Line = split(" ", $line);

	    if ($#Line != 65) {
		$k_bad = $k_bad + 1;
		if ($k_bad < 2) {
		    print ER_LOG "Problem with number of cols in $_\n";
		    print "Problem with number of cols $_\n";
		}
		$good_line = 0;
	    } else {
		$good_line = 1;
	    }
	    
	    if ($error_century_digit == 1) {
		if ($k_bad < 2) {
		    print ER_LOG "Problem with century digit in $_.\n";
		    print "\nProblem with century digit in $_.\n";
		}
	    }

	    if ( ($EL == 0) & ($good_line == 1) ){
		if ($nD == 0) { open(DATA_out_D,">>$DATA_OUT_D");}
		print DATA_out_D $line;
		$nD = $nD+1;
	    }
	    if ( ($EL == 1) & ($good_line == 1) ){
		if ($nH == 0){open(DATA_out_H,">>$DATA_OUT_H");}	    
		print DATA_out_H $line;
		$nH = $nH+1;
	    }
	    if ( ($EL == 2) & ($good_line == 1) ){
		if ($nX == 0){open(DATA_out_X,">>$DATA_OUT_X");}    
		print DATA_out_X $line;
		$nX = $nX+1;
	    }
	    if ( ($EL == 3) & ($good_line == 1) ){
		if ($nY == 0){open(DATA_out_Y,">>$DATA_OUT_Y");}	    
		print DATA_out_Y $line;
		$nY = $nY+1;
	    }
	    if ( ($EL == 4) & ($good_line == 1) ){
		if ($nZ == 0){open(DATA_out_Z,">>$DATA_OUT_Z");}
		print DATA_out_Z $line;
		$nZ = $nZ+1;
	    }
	    if ( ($EL == 5) & ($good_line == 1) ){
		if ($nF == 0){open(DATA_out_F,">>$DATA_OUT_F");}    
		print DATA_out_F $line;
		$nF = $nF+1;
	    }
	    
	    $k = $k+1;

	}


	if ($nD > 0){close(DATA_out_D);}
	if ($nH > 0){close(DATA_out_H)};
	if ($nX > 0){close(DATA_out_X)};
	if ($nY > 0){close(DATA_out_Y)};
	if ($nZ > 0){close(DATA_out_Z)};
	if ($nF > 0){close(DATA_out_F)};
    
	close(DATA_in);
	$k = $k-1;    
	print " Concatanated data to any existing files.  Dropped $k_bad/$k lines.\n";

#	print "wdcMIN2dat.pl is gzipping $BASENAME*.dat ... ";
#	$com = "gzip " + $BASENAME + "*.dat";
#	system($com);
	
    }

}

