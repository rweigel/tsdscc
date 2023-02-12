#!/bin/perl 

use LWP::Simple;
use LWP::UserAgent;
use HTTP::Request;
use HTTP::Response;

$browser = LWP::UserAgent->new();

sub GetPaths {
	$URL = @_[0];
	print "Getting Path URL: $URL\n";
	my $request = HTTP::Request->new(GET => $URL);
	my $response = $browser->request($request);
	if ($response->is_error()) {printf "%s\n", $response->status_line;}
	$contents = $response->content();
	my @Paths;
	push @Paths, $1 while $contents=~/urlPath="(.+?)"/g;
	return @Paths;
}

sub GetTimes {
	my @times;
	$Base=@_[0];
	$URLstart="http://lasp.colorado.edu/lisird/tss/$Base.dat?time&first()&format_time(yyyy-MM-dd)";
	$URLstop="http://lasp.colorado.edu/lisird/tss/$Base.dat?time&last()&format_time(yyyy-MM-dd)";

	my $request = HTTP::Request->new(GET => $URLstart);
	my $response = $browser->request($request);
	if ($response->is_error()) {printf "%s\n", $response->status_line;}
	$contents = $response->content();
	if($contents!~/\d\d\d\d-\d\d/)
	{
		print "Error retreiving times for $Base\n";
		return 0;
	}
	push @times, $contents;

	my $request = HTTP::Request->new(GET => $URLstop);
	my $response = $browser->request($request);
	if ($response->is_error()) {printf "%s\n", $response->status_line;}
	$contents = $response->content();
	if($contents!~/\d\d\d\d-\d\d/)
	{
		print "Error retreiving times for $Base\n";
		return 0;
	}
	push @times, $contents;

	return @times;
}



################
#Main function
$startfile="http://lasp.colorado.edu/lisird/tss/catalog.thredds";
#Make tmp directory if it doesn't exist
if(! -e "./tmp"){mkdir "tmp";}
foreach $Path(GetPaths($startfile))
{
	@PathTimes=GetTimes($Path);
	if($PathTimes[0]!~/\d\d/)
	{
		next;
	}
	chomp(@PathTimes);

	open(FH,">./tmp/$Path.times") or die "Can't open ./tmp/$Path.times for writing";
		print FH "<Start>$PathTimes[0]</Start>\n<End>$PathTimes[1]</End>\n";
	close(FH);
	print "Wrote $Path.times\n";
}


