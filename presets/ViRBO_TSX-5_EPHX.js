id="ViRBO/TSX-5/EPHX";
Presets[id] = {};

Presets[id].CatalogName = "TSX-5/CEASE DAILY TEXT FILES, EXTENDED EPHEMERIS";
Presets[id].CatalogID   = id;

Presets[id].Datasets = [["ephx","Extended Ephemeris Information for TSX-5/CEASE"]];

						 
Presets[id].URLTemplate = "http://virbo.org/ftp/users/ginet/CEASE-TSX-5/ephx_00_$j.txt";

Presets[id].CatalogDescription    = "Catalog derived by inspection of ftp://virbo.org/users/ginet/CEASE-TSX-5/."
Presets[id].CatalogDescriptionURL = "ftp://virbo.org/users/ginet/CEASE-TSX-5/";

Presets[id].StartDates       = ["2000-08-15"];
Presets[id].StopDates        = ["2000-09-15"];

Presets[id].DatasetName        = "$2";
Presets[id].DatasetID          = "$1";
Presets[id].DatasetDescription = "Ephemeris information for the CEASE spacecraft, including CEASE look direction, magnetic field, S/C position, and S/C velocity."; 
Presets[id].DatasetDescriptionURL = "ftp://virbo.org/users/ginet/CEASE-TSX-5/readme_ephx_std_chs.txt"; 

Presets[id].TimeColumns      = "1,2,3";
Presets[id].TimeFormat       = "$Y $j $S";
Presets[id].TimeUnits        = "";
Presets[id].TimeLabels       = "";

Presets[id].DataColumns      = "4,5,6,7,8,9,10,11,12,13,14,15,16"
Presets[id].DataLabels       = "Pitch Angle, X component with resepct to the CEASE instrument look direction vector (normalized ECI coord system), Y component with resepct to the CEASE instrument look direction (vector normalized ECI coord system),Z component with resepct to the CEASE instrument look direction (vector normalized ECI coord system),X component of magnetic field (ECI coord system),Y component of magnetic field (ECI coord system),Z component of magnetic field (ECI coord system),X component of the ECI satellite position,Y  component of the ECI satellite position,Z component of the ECI satellite position,X component of the ECI satellite velocity,Y component of the ECI satellite velocity,Z component of the ECI satellite velocity";
Presets[id].DataNames        = Presets[id].DataLabels;
Presets[id].DataIDs          = "PitchAngle,C_V_X,C_V_Y,C_V_Z,BX,BY,BZ,X,Y,Z,VX,VY,VZ";
//
Presets[id].DataValues       = "";
Presets[id].DataTypes        = "f,f,f,f,f,f,f,f,f,f,f,f,f";
Presets[id].DataUnits        = "degrees, , , ,Gauss,Gauss,Gauss,km,km,km,km/s,km/s,km/s";
Presets[id].DataRenderings   = "%f,%f,%f,%f,%f,%f,%f,%f,%f,%f,%f,%f";
Presets[id].DataFillValues   = ""

Presets[id].DataGroupIDs     = ""
Presets[id].DataGroupNames   = ""
Presets[id].DataGroupLabels  = ""

Presets[id].SkipLines        = "0";
Presets[id].LineRegex        = "^\\s[0-9]";
Presets[id].CommentCharacter = "";
Presets[id].DataDelimiter    = "\\s";
Presets[id].DataLineFormat   = "";

Presets[id].IOSP             = "lasp.tss.iosp.ColumnarAsciiReader";
