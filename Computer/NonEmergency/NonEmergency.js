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

var input01 = "HbS123456789 TEST - BUILDING DAMAGE - ROOF (SINGLE STOREY) - ROOF TILES DISLODGED - HAPPENED FEW DAYS AGO - 22A FIELD AV EDITHVALE /CLYDEBANK RD //MONTROSE AV M 93 A9 (342884) GEOFF JOHN SMITH 04123456789 [TEST]";//correct
var input02 = "HbS123456789 TEST - FLOODING - ENTERING PREMISES - BEDROOM FLOODING BETWEEN ROOMS 4 AND 5 - POSSIBLY BURST PIPE IN WALL - 24 WARRIGAL RD PARKDALE /BEACH RD //DIXON ST M 87 B9 (305933) JOHN SMITH 04123456789 [TEST]";//correct
var input03 = "HbS123456789 TEST - TREE DOWN - THREATENING TO FALL - TREE HAS SPLIT AND THREATENING TO FALL - 1 / 8 MCDONALD ST MORDIALLOC /ALBERT ST //BARKLY ST M 87 F12 (321918) JOHN SMITH 04123456789 [TEST]";//correct
var input04 = "HbS123456789 TEST - TREE DOWN - TRAFFIC HAZARD - TREE DOWN BLOCKING BUSY RD. - 11 MASCOT AV BONBEACH /STATION ST //THE FAIRWAY - M 97 D6 (353846) JOHN SMITH 04123456789 [TEST]";//correct
var input05 = "HbS123456789 TEST - FLOODING - POTENTIAL TO ENTER PREMISES - BURST WATER TANK POSS TO THREAT TO BUILDINGS - TESTSEA SES UNIT 101 SCOTCH PDE BONBEACH /BONDI RD M 97 D4 (356856) JOHN SMITH 04123456789 [TEST]";//correct
var input06 = "HbS123456789 TEST - TREE DOWN - THREATENING TO FALL - TREE LEANING ON FENCE THREATENING TO FALL - 26 MUNDY ST MENTONE /BEACH RD //RIVOLI ST M 86 J7 (293941) JOHN SMITH 04123456789 [TEST]";//correct
var input07 = "HbS123456789 TEST - BUILDING DAMAGE - INTERNAL / PERIPHERAL ONLY - CEILING LEAKING - DOUBLE STOREY HOUSE - 9 CHALLENGER CT TESTSEA HEIGHTS /AMAROO DR M 93 F9 (361883) JOHN SMITH 04123456789 [TEST]";//correct
var input08 = "HbS123456789 TEST - TREE DOWN - TRAFFIC HAZARD - CNR SPRINGVALE RD/TESTTENHAM RD BRAESIDE M 88 J8 (370935) JOHN SMITH 04123456789 [TEST]";//correct
var input09 = "HbS123456789 TEST - OTHER / UNDEFINED INCIDENT - CALLER DROPPED LAP TOP DOWN DRAIN - 18 KURRAWA CR PATTERSON LAKES /WYONG CT //COLAC CT M 97 J8 (375841) JOHN SMITH 04123456789 [TEST]";
var input10 = "HbS123456789 TEST - TREE DOWN - POWER LINES INVOLVED - TREE DOWN ON POWER LINES - 8A WARATAH AV MORDIALLOC /KINGSTON ST //FELICIA ST M 87 H9 (327932) JOHN SMITH 04123456789 [TEST]";
var input11 = "HbS123456789 TEST - BUILDING DAMAGE - RESULT OF VEHICLE - CAR INTO BUILDING - CNR GOVERNOR RD/BOUNDARY RD BRAESIDE M 92 J1 (335916) JOHN SMITH 04123456789 [TEST]";

//SAYABLE CONVERSION SCRIPT

var pagerEmergencyMessage = input10;

output00 = pagerEmergencyMessage.replace(/(HbS[0-9]{9,} TEST - )/, "");
output01 = output00.replace(/\[TEST\]/, "");
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