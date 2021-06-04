//LOOKUP TABLES

var addressLookupTable = {
  " HWY ":" Highway ",
  " ST ":" Street ",
  " CR ":" Crescent ",
  " AV ":" Avenue ",
  "CNR ":"Corner of ",
  " PDE":" PARADE",
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
  "VEH INTO BUILDING":"",
};

//FUNCTIONS

function cleanAddressFunction () {
  cleanAddress = address.split(' //').map(e => e.split(' /'));
}

//INPUT VARIABLES

var input01 = "F210412626 NITH4 RESCC1 * TRUCK ROLLOVER ACCIDENT - POSS PERSON TRAPPED THURLOWS RD SHADY CREEK SVSE 6768 H9 (176815) CNITH CYGON WGUL1 [WGUL]"
var input02 = "F210412023 NSW1 RESCC1 * CAR ACCIDENT - POSS PERSON TRAPPED/FIRE CNR ALCHERINGA DR/GOL GOL NORTH RD GOL GOL (NSW) SVNW 4276 D6 (136193) MDRA1 [MDRA]"
var input03 = "RYEA2 RESCC1 * CAR ACCIDENT - POSS PERSON TRAPPED 2015 PT NEPEAN RD TOOTGAROOK /ROMNEY AV //LAURA ST M 169 A4 (116508) AFPR CRYEA P95 SORR1 F210412210 [SORR]"
var input04 = "S210450400 CASE - ASSIST AMBULANCE - SES TO ASSIST AV WITH 85YO F PT - PROCEED CODE 3 - 98 HARGRAVES ST CASTLEMAINE /CAMPBELL ST //DOVETON ST SVC 8135 G6 (528946) [CASE]"
var input04 = "S210450393 - RESCUE / TRAPPED PERSONS - FEMALE WITH LEG TRAPPED IN BOULDER AT SQUEEZE TEST - CENTENARY PARK ACCESS TRK ARAPILES SVSW 8467 D7 (754318) [STAW]"
var input05 = "S201251487 CHEL - RESCUE PERSONS - VEHICLE INTO STRUCTURE - CAR INTO BUILDING - POSS TRAPPED - 2 / 42 BAY ST MORDIALLOC /GEORGE ST //ROYAL PDE M 87 D11 (316923) [CHEL]"

//Code

var pagerEmergencyMessage = input05;

if (pagerEmergencyMessage.match(/(S[0-9]{9,}).*/)) {
  output00 = pagerEmergencyMessage.replace(/(S[0-9]{9,} [a-zA-Z]{4,} - )/, "");}
else if (pagerEmergencyMessage.match(/(F[0-9]{9,}).*/)){
  output00 = pagerEmergencyMessage.replace(/(F[0-9]{9,}.*\* )/, "");}
else {
  output00 = pagerEmergencyMessage.replace(/(.*\*)/, "");}
//console.log(output00);
output01 = output00.replace(/\[.*\]/, "");
output02 = output01.split(/ M |SVSE|SVC|SVNE|SVNW|SVSW/);
//console.log(output02);
output03 = output02[0].split(" - ");
//console.log(output03);
if (pagerEmergencyMessage.match(/(S[0-9]{9,}).*/)) { 
  output04 = (output03[output03.length - 1] + " ");}
else {
  output04 = output03[1].replace(/POSS PERSON TRAPPED |POSS PERSON TRAPPED\/FIRE /, "")}
//console.log(output04);
output05 = output03.slice(0, -1);

jobTypeAndNote = output05.join(". ");

address = output04.replace(/ HWY | ST | AV |CNR | CR | PDE| CIR | DR | RD | TRL | CT /gi, function(matched){
  return addressLookupTable[matched];});
jobTypeAndNote = jobTypeAndNote.replace(/YO | AV |RESCUE \/ TRAPPED PERSONS|INTERNAL \/ PERIPHERAL ONLY|OTHER \/ UNDEFINED INCIDENT|VEH INTO BUILDING/gi, function(matched){
  return jobLookupTable[matched];});

if (address.includes("Corner of")) {
  cleanAddress = address.split("/");
  sayEmergency = (jobTypeAndNote + " at " + cleanAddress[0] + " and " + cleanAddress[1]);} 

else if (address.match(" /")) {
  cleanAddressFunction();
  console.log(cleanAddress[0].length)
  if (cleanAddress[0].length = 3) {
    sayEmergency = (jobTypeAndNote + " at " + cleanAddress[0][0] + " of " + cleanAddress[0][1] + "." + " closest intersection is " + cleanAddress[0][2] + " and " + cleanAddress[1]);}
  else {
    sayEmergency = (jobTypeAndNote + " at " + cleanAddress[0][0] + "." + " closest intersection is " + cleanAddress[0][1] + " and " + cleanAddress[1]);}}
else {
  cleanAddress = address;
  sayEmergency = (jobTypeAndNote + " at " + cleanAddress);}

console.log(sayEmergency);


