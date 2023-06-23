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
};

//FUNCTIONS

function cleanAddressFunction () {
  cleanAddress = address.split(' //').map(e => e.split(' /'));
}

//SAYABLE CONVERSION SCRIPT 

var pagerEmergencyMessage = sayemergency;  

if (pagerEmergencyMessage.match(/(S[0-9]{9,}).*/)) {
  output00 = pagerEmergencyMessage.replace(/(S[0-9]{9,} [a-zA-Z]{4,} - )/, "");}
else if (pagerEmergencyMessage.match(/(F[0-9]{9,}).*/)){
  output00 = pagerEmergencyMessage.replace(/(F[0-9]{9,}.*\* )/, "");}
else {
  output00 = pagerEmergencyMessage.replace(/(.*\*)/, "");}
output01 = output00.replace(/\[.*\]/, "");
output02 = output01.split(/ M |SVSE|SVC|SVNE|SVNW|SVSW/);
output03 = output02[0].split(" - ");
if (pagerEmergencyMessage.match(/(S[0-9]{9,}).*/)) { 
  output04 = (output03[output03.length - 1] + " ");}
else {
  output04 = output03[1].replace(/POSS PERSON TRAPPED |POSS PERSON TRAPPED\/FIRE /, "")}
output05 = output03.slice(0, -1);

jobTypeAndNote = output05.join(". ");

address = output04.replace(/ HWY | ST | AV |CNR | CR | PDE| CIR | DR | RD | TRL | CT /gi, function(matched){
  return addressLookupTable[matched];});
jobTypeAndNote = jobTypeAndNote.replace(/YO | AV |RESCUE \/ TRAPPED PERSONS|INTERNAL \/ PERIPHERAL ONLY|OTHER \/ UNDEFINED INCIDENT|VEH INTO BUILDING/gi, function(matched){
  return jobLookupTable[matched];});

if (address.includes("Corner of")) {
  cleanAddress = address.split("/");
  sayemergency = (jobTypeAndNote + " at " + cleanAddress[0] + " and " + cleanAddress[1]);} 

else if (address.match(" /")) {
  cleanAddressFunction();
  console.log(cleanAddress[0].length)
  if (cleanAddress[0].length = 3) {
    sayemergency = (jobTypeAndNote + " at " + cleanAddress[0][0] + " of " + cleanAddress[0][1] + "." + " closest intersection is " + cleanAddress[0][2] + " and " + cleanAddress[1]);}
  else {
    sayemergency = (jobTypeAndNote + " at " + cleanAddress[0][0] + "." + " closest intersection is " + cleanAddress[0][1] + " and " + cleanAddress[1]);}}
else {
  cleanAddress = address;
  sayemergency = (jobTypeAndNote + " at " + cleanAddress);}

console.log(sayemergency);