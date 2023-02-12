import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.StringTokenizer;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

public class xmlcatalog {

	public static String Parameter(String id, String longName,String cadence,String start,String end){
		String temp= "\t<dataset name='"+longName+"' id='"+id+"' timecolumns='1,2,3' timeformat='$Y,$j,$H:$M:$S' urlprocessor='sscweb' urltemplate='https://sscweb.gsfc.nasa.gov/cgi-bin/Locator.cgi?SPCR="+id+"%26START_TIME%3D$Y%2B$j%2B00%3A00%3A00%26STOP_TIME%3D$Y%2B$j%2B23%3A59%3A59%26RESOLUTION=1%26TOD=7%26TOD=8%26J2000=7%26J2000=8%26GEO=7%26GEO=8%26GEO=6%26GM=7%26GM=8%26GM=6%26GSE=7%26GSE=8%26GSE=6%26GSM=7%26GSM=8%26SM=7%26SM=8%26SM=6%26OPT=1%26OPT=2%26OPT=6%26OPT=7%26FILTER_DIST_UNITS=1%26TOD_APPLY_FILTER=%26TODX_MNMX=%26TOD_XGT=%26TOD_XLT=%26TODY_MNMX=%26TOD_YGT=%26TOD_YLT=%26TODZ_MNMX=%26TOD_ZGT=%26TOD_ZLT=%26TODLAT_MNMX=%26TOD_LATGT=%26TOD_LATLT=%26TODLON_MNMX=%26TOD_LONGT=%26TOD_LONLT=%26TODLT_MNMX=%26TOD_LTGT=%26TOD_LTLT=%26J2000_APPLY_FILTER=%26J2000X_MNMX=%26J2000_XGT=%26J2000_XLT=%26J2000Y_MNMX=%26J2000_YGT=%26J2000_YLT=%26J2000Z_MNMX=%26J2000_ZGT=%26J2000_ZLT=%26J2000LAT_MNMX=%26J2000_LATGT=%26J2000_LATLT=%26J2000LON_MNMX=%26J2000_LONGT=%26J2000_LONLT=%26J2000LT_MNMX=%26J2000_LTGT=%26J2000_LTLT=%26GEO_APPLY_FILTER=%26GEOX_MNMX=%26GEO_XGT=%26GEO_XLT=%26GEOY_MNMX=%26GEO_YGT=%26GEO_YLT=%26GEOZ_MNMX=%26GEO_ZGT=%26GEO_ZLT=%26GEOLAT_MNMX=%26GEO_LATGT=%26GEO_LATLT=%26GEOLON_MNMX=%26GEO_LONGT=%26GEO_LONLT=%26GEOLT_MNMX=%26GEO_LTGT=%26GEO_LTLT=%26GM_APPLY_FILTER=%26GMX_MNMX=%26GM_XGT=%26GM_XLT=%26GMY_MNMX=%26GM_YGT=%26GM_YLT=%26GMZ_MNMX=%26GM_ZGT=%26GM_ZLT=%26GMLAT_MNMX=%26GM_LATGT=%26GM_LATLT=%26GMLON_MNMX=%26GM_LONGT=%26GM_LONLT=%26GMLT_MNMX=%26GM_LTGT=%26GM_LTLT=%26GSE_APPLY_FILTER=%26GSEX_MNMX=%26GSE_XGT=%26GSE_XLT=%26GSEY_MNMX=%26GSE_YGT=%26GSE_YLT=%26GSEZ_MNMX=%26GSE_ZGT=%26GSE_ZLT=%26GSELAT_MNMX=%26GSE_LATGT=%26GSE_LATLT=%26GSELON_MNMX=%26GSE_LONGT=%26GSE_LONLT=%26GSELT_MNMX=%26GSE_LTGT=%26GSE_LTLT=%26GSM_APPLY_FILTER=%26GSMX_MNMX=%26GSM_XGT=%26GSM_XLT=%26GSMY_MNMX=%26GSM_YGT=%26GSM_YLT=%26GSMZ_MNMX=%26GSM_ZGT=%26GSM_ZLT=%26GSMLAT_MNMX=%26GSM_LATGT=%26GSM_LATLT=%26GSMLON_MNMX=%26GSM_LONGT=%26GSM_LONLT=%26GSMLT_MNMX=%26GSM_LTGT=%26GSM_LTLT=%26SM_APPLY_FILTER=%26SMX_MNMX=%26SM_XGT=%26SM_XLT=%26SMY_MNMX=%26SM_YGT=%26SM_YLT=%26SMZ_MNMX=%26SM_ZGT=%26SM_ZLT=%26SMLAT_MNMX=%26SM_LATGT=%26SM_LATLT=%26SMLON_MNMX=%26SM_LONGT=%26SM_LONLT=%26SMLT_MNMX=%26SM_LTGT=%26SM_LTLT=%26OTHER_FILTER_DIST_UNITS=1%26RD_APPLY=%26FS_APPLY=%26NS_APPLY=%26BS_APPLY=%26MG_APPLY=%26LV_APPLY=%26IL_APPLY=%26REG_FLTR_SWITCH=%26SCR_APPLY=%26SCR=%26RTR_APPLY=%26RTR=%26BTR_APPLY=%26NBTR=%26SBTR=%26EXTERNAL=3%26EXT_T1989c=1%26KP_LONG_89=4%26INTERNAL=1%26ALTITUDE=100%26DAY=1%26TIME=2%26DISTANCE=1%26DIST_DEC=2%26DEG=1%26DEG_DEC=2%26DEG_DIR=1%26OUTPUT_CDF=1%26LINES_PAGE=1%26RNG_FLTR_METHOD=%26PREV_SECTION=TOS%26SSC=LOCATOR_GENERAL%26SUBMIT=Submit+query+and+wait+for+output%26.cgifields=TRC_GEON%26.cgifields=REG_OPT%26.cgifields=TOD%26.cgifields=GEO%26.cgifields=TRC_GMS%26.cgifields=OPT%26.cgifields=GM%26.cgifields=J2000%26.cgifields=GSE%26.cgifields=TRC_GMN%26.cgifields=GSM%26.cgifields=SM%26.cgifields=TRC_GEOS'>\n";
		temp+= "\t\t<documentation xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='https://sscweb.gsfc.nasa.gov/users_guide/Users_Guide_pt1.html#1.1' xlink:title='Description of ephemeris calculations'/>\n";
		temp+="\t\t<timeCoverage>"+"\n";
		temp+="\t\t\t<Start>"+start+"</Start>"+"\n";
		temp+="\t\t\t<End>"+end+"</End>"+"\n";
		temp+="\t\t\t<Cadence>PT"+cadence.toUpperCase()+"</Cadence>"+"\n";
		temp+="\t\t</timeCoverage>"+"\n";
		return temp;
	}

	public static String Template() {
		String inputLine = "";
		String outputLines = "";
		try {
			BufferedReader in = new BufferedReader(new FileReader("template.xml"));
			while ((inputLine = in.readLine()) != null){
				outputLines = outputLines + "\t\t" + inputLine + "\n";//System.out.println(inputLine);
			}
		} catch (Exception e) {
			System.out.print(e);
		}

		return outputLines;
	}
	
	public static void main(String[] args) {
		String template = Template();
		try{
			BufferedReader in = new BufferedReader(new FileReader(args[0]));

			TimeZone tz = TimeZone.getTimeZone("UTC");
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
			df.setTimeZone(tz);
			String now = df.format(new Date());

			String inputLine;
			System.out.print("<catalog xmlns:xlink='http://www.w3.org/1999/xlink' id='SSCWeb' name='SSCWeb'>\n");
			System.out.print("\t<documentation xlink:href='http://sscweb.gsfc.nasa.gov/WebServices/' xlink:title='Catalog derived using the SSCWeb Service'/>\n");
	  		System.out.print("\t<documentation xlink:href='https://github.com/tsds/tsds2/tree/gh-pages/tsdscc' xlink:title='Catalog generation software'/>\n");
  			System.out.print("\t<documentation xlink:href='/' xlink:title='Catalog generation date: " + now + "Z" + "'/>\n");
  			System.out.print("\t<documentation xlink:href='https://github.com/rweigel/datacache/blob/master/plugins/sscweb.js' xlink:title='DataCache plug-in'/>\n");

			//System.out.println("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>"+"\n");
			while ((inputLine = in.readLine()) != null){
				if(inputLine.equalsIgnoreCase("Satellites:")){

					while (!inputLine.contains("Time to execute getAllSatellites")){
						inputLine = in.readLine();
						if(!inputLine.contains("Time to execute getAllSatellites")){
							String[] result=inputLine.split(",");
							System.out.println(Parameter(result[0],result[1],result[2],result[3],result[4]) + "\n" + template + "\t</dataset>");
						}
					}

				}

			}
			System.out.println("</catalog>");
			in.close();
		}catch(Exception e){
			System.out.print(e);
		}

	}

}
