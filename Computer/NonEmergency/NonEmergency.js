//LOOKUP TABLES

var addressLookupTable = {
  " HWY ":"Highway",
  " ST ":" Street ",
  " CR ":" Crescent ",
  " AV ":" Avenue ",
  "CNR ":"Corner of ",
  " PDE ":"PARADE",
  " CIR ":" Circle ",
  " DR ":" Drive ",
  " RD ":" Road ",
  " TRL ":" Trail ",
  " CT ":" Court ",
};

var jobLookupTable = {
  " AV ":" A.V. ",
  "RESCUE / TRAPPED PERSONS":"RESCUE. TRAPPED PERSONS",
  "YO ":" Year Old ",
  "INTERNAL / PERIPHERAL ONLY":"INTERNAL, PERIPHERAL ONLY",
  "OTHER / UNDEFINED INCIDENT":"UNDEFINED INCIDENT",
};

//FUNCTIONS

function intersectionFunction () {
  if (cleanAddress[1] === undefined) {
    sayEmergency = (jobTypeAndNote + " at " + cleanAddress[0][0] + "." + " closest intersection is " + cleanAddress[0][1]);
  }
  else {
  sayEmergency = (jobTypeAndNote + " at " + cleanAddress[0][0] + "." + " closest intersection is " + cleanAddress[0][1] + " and " + cleanAddress[1][0]);
}}

function cleanAddressFunction () {
  cleanAddress = address.split(' //').map(e => e.split(' /'));
}

//INPUT VARIABLES

var input01 = "HbS210251824 CHEL - BUILDING DAMAGE - ROOF (SINGLE STOREY) - ROOF TILES DISLODGED - HAPPENED FEW DAYS AGO - 22A FIELD AV EDITHVALE /CLYDEBANK RD //MONTROSE AV M 93 A9 (342884) GEOFF ADAMS 0405905995 [CHEL]";//correct
var input02 = "HbS210251822 CHEL - FLOODING - ENTERING PREMISES - BEDROOM FLOODING BETWEEN ROOMS 4 AND 5 - POSSIBLY BURST PIPE IN WALL - 24 WARRIGAL RD PARKDALE /BEACH RD //DIXON ST M 87 B9 (305933) MICAELA 0419034987 [CHEL]";//correct
var input03 = "HbS210251574 CHEL - TREE DOWN - THREATENING TO FALL - TREE HAS SPLIT AND THREATENING TO FALL - 1 / 8 MCDONALD ST MORDIALLOC /ALBERT ST //BARKLY ST M 87 F12 (321918) HELEN BRUNT 0418527172 [CHEL]";//correct
var input04 = "HbS210251499 CHEL - TREE DOWN - TRAFFIC HAZARD - TREE DOWN BLOCKING BUSY RD. - 11 MASCOT AV BONBEACH /STATION ST //THE FAIRWAY - M 97 D6 (353846) BEN BAKER 0416027286 [CHEL]";//correct
var input05 = "HbS210251163 CHEL - FLOODING - POTENTIAL TO ENTER PREMISES - BURST WATER TANK POSS TO THREAT TO BUILDINGS - CHELSEA SES UNIT 101 SCOTCH PDE BONBEACH /BONDI RD M 97 D4 (356856) MALCOLM IRWIN 0409294466 [CHEL]";//correct
var input06 = "HbS210250863 CHEL - TREE DOWN - THREATENING TO FALL - TREE LEANING ON FENCE THREATENING TO FALL - 26 MUNDY ST MENTONE /BEACH RD //RIVOLI ST M 86 J7 (293941) DIANNE JOLLY 0401626041 [CHEL]";//correct
var input07 = "HbS201050472 CHEL - BUILDING DAMAGE - INTERNAL / PERIPHERAL ONLY - CEILING LEAKING - DOUBLE STOREY HOUSE - 9 CHALLENGER CT CHELSEA HEIGHTS /AMAROO DR M 93 F9 (361883) MIREK BIELINSKI 0427061180 [CHEL]";//correct
var input08 = "HbS200952024 CHEL - TREE DOWN - TRAFFIC HAZARD - CNR SPRINGVALE RD/CHELTENHAM RD BRAESIDE M 88 J8 (370935) STUART ROBERTS 0409417983 [CHEL]";//correct
var input09 = "HbS200951565 CHEL - OTHER / UNDEFINED INCIDENT - CALLER DROPPED LAP TOP DOWN DRAIN - 18 KURRAWA CR PATTERSON LAKES /WYONG CT //COLAC CT M 97 J8 (375841) LEANNE 0406975057 [CHEL]";
var input10 = "HbS200650769 CHEL - TREE DOWN - POWER LINES INVOLVED - TREE DOWN ON POWER LINES - 8A WARATAH AV MORDIALLOC /KINGSTON ST //FELICIA ST M 87 H9 (327932) JANE NAYLOR 0401639533 [CHEL]";
var input11 = "HbS200650500 CHEL - BUILDING DAMAGE - RESULT OF VEHICLE - CAR INTO BUILDING - CNR GOVERNOR RD/BOUNDARY RD BRAESIDE M 92 J1 (335916) MARK 0415655019 [CHEL]";

//SAYABLE CONVERSION SCRIPT

var pagerEmergencyMessage = input11;

output00 = pagerEmergencyMessage.replace(/(HbS[0-9]{9,} CHEL - )/, "");
output01 = output00.replace(/\[CHEL\]/, "");
output02 = output01.split(" M ");
output03 = output02[0].split(" - ");
output04 = (output03[output03.length - 1] + " ");
output05 = output03.slice(0, -1);

jobTypeAndNote = output05.join(". ");

address = output04.replace(/ HWY | ST | AV |CNR | CR | PDE | CIR | DR | RD | TRL | CT /gi, function(matched){
  return addressLookupTable[matched];});

jobTypeAndNote = jobTypeAndNote.replace(/YO | AV |RESCUE \/ TRAPPED PERSONS|INTERNAL \/ PERIPHERAL ONLY|OTHER \/ UNDEFINED INCIDENT/gi, function(matched){
  return jobLookupTable[matched];});

if (address.match(/(?= \/ )(?! \/[a-zA-Z])/)) {
  cleanAddressFunction();
  sayEmergency = (jobTypeAndNote + " at " + cleanAddress[0][0] + " of" + cleanAddress[0][1] + "." + " closest intersection is " + cleanAddress[0][2] + " and " + cleanAddress[1]);}
else if (address.match(/ \/[a-zA-Z]/)) {
  cleanAddressFunction();
  intersectionFunction();}
else if (address.match(" / ")) {
  cleanAddressFunction();
  sayEmergency = (jobTypeAndNote + " at " + cleanAddress[0][0] + " of" + cleanAddress[0][1]);}
else if (address.includes("Corner of")) {
  cleanAddress = address.split('/');
  sayEmergency = (jobTypeAndNote + " at " + cleanAddress[0] + " and " + cleanAddress[1]);} 
else {
  sayEmergency = (jobTypeAndNote);}

console.log(sayEmergency);