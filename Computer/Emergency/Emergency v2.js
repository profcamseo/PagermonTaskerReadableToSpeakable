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
  
  var servicesTable = {
    "(AFPRS)":" All Services Dispatched",
    "(AF)":" Ambulance and Fire Dispatched",
    "(S)":"SES Dispatched Only",
    "(AFPR)":"Ambulance, Fire, Police and Rescue Dispatched",
    "(PS)":"Police and SES Dispatched",
    "(FPR)":"Fire, Police and Rescue Dispatched",
    "(APS)":"Ambulance, Police and SES Dispatched",
  };
  
  //FUNCTIONS
  
  function cleanAddressFunction () {
    address01 = address.replace(" //", " /");
    address02 = address01.split(" /");
    cleanAddress = address02.filter((el) => {
      return el !== null && typeof el !== 'undefined';
    });
  }
  
  //INPUT VARIABLES
  
  var input01 = "S220750464 CHEL - PRI 1: RESCUE / TRAPPED PERSONS - M STRUGGLING IN WATER - PARKDALE BEACH CAFE AND KIOSK - PARKDALE BEACH RD PARKDALE /PARKERS RD //HERBERT ST MAP: M 87 C11 310924 (AFPRS) [CHEL]"
  
  //SAYABLE CONVERSION SCRIPT 
  
  //Input
  var pagerEmergencyMessage = input01;
  
  //Remove Sierra or Foxtrot Number
  if (pagerEmergencyMessage.match(/(S[0-9]{9,}).*/)) {
    output00 = pagerEmergencyMessage.replace(/(S[0-9]{9,} [a-zA-Z]{4,} - )/, "");}
  else if (pagerEmergencyMessage.match(/(F[0-9]{9,}).*/)){
    output00 = pagerEmergencyMessage.replace(/(F[0-9]{9,}.*\* )/, "");}
  else {
    output00 = pagerEmergencyMessage.replace(/(.*\*)/, "");}
  
  //Priority 1
  output00 = output00.replace("PRI 1:", "PRIORITY 1");
  
  //Remove Unit Abbreviation at End
  output01 = output00.replace(/\[.*\]/, "");
  
  //Map Break
  output02 = output01.split(" MAP:");
  
  //???
  output03 = output02[0].split(" - ");
  if (pagerEmergencyMessage.match(/(S[0-9]{9,}).*/)) { 
    output04 = (output03[output03.length - 1] + " ");}
  else {
    output04 = output03[1].replace(/POSS PERSON TRAPPED |POSS PERSON TRAPPED\/FIRE /, "")}
  
  //???
  output05 = output03.slice(0, -1);
  
  //Join Job Notes and put a full stop in-between sections
  jobTypeAndNote = output05.join(". ");
  
  //Replace Address Abbreviations with Full Words
  address = output04.replace(/ HWY | ST | AV |CNR | CR | PDE| CIR | DR | RD | TRL | CT /gi, function(matched){
    return addressLookupTable[matched];});
  
  //Replace Job Abbreviations with Full Words
  jobTypeAndNote = jobTypeAndNote.replace(/YO | AV |RESCUE \/ TRAPPED PERSONS|INTERNAL \/ PERIPHERAL ONLY|OTHER \/ UNDEFINED INCIDENT|VEH INTO BUILDING/gi, function(matched){
    return jobLookupTable[matched];});
  
  //Services Attending
  servicesAttendingAbbreviation = output02[1].match(/(\(.*\))/);
  servicesAttending = servicesAttendingAbbreviation[0].replace(/\(AFPRS\)|\(AF\)|\(S\)/gi, function(matched){
    return servicesTable[matched];});
  
  //Address Structure 
  if (address.includes("Corner of")) {
    cleanAddress = address.split("/");
    sayEmergency = (jobTypeAndNote + " at " + cleanAddress[0] + " and " + cleanAddress[1] + "." + servicesAttending);} 
  else if (address.match(" /")) {
    cleanAddressFunction ()
    if (cleanAddress.length === 4) {
      sayEmergency = (jobTypeAndNote + " at " + cleanAddress[0] + " of " + cleanAddress[1] + "." + " closest intersection is " + cleanAddress[2] + " and " + cleanAddress[3] + "." + servicesAttending);}
    else {
      if (cleanAddress[2] == null) {
      sayEmergency = (jobTypeAndNote + " at " + cleanAddress[0] + "." + " closest intersection is " + cleanAddress[1] + "." + servicesAttending);}
    else{
      sayEmergency = (jobTypeAndNote + " at " + cleanAddress[0] + "." + " closest intersection is " + cleanAddress[1] + " and " + cleanAddress[2] + "." + servicesAttending);}}
    }
  else {
  
    cleanAddress = address;
    sayEmergency = (jobTypeAndNote + " at " + cleanAddress + "." + servicesAttending);}
  
  
  //FINAL OUTPUT
  console.log(sayEmergency);
  
  // Console Logging
  // console.log("cleanAddress - " + cleanAddress);
  // console.log("cleanAddress[0] - " + cleanAddress[0]);
  // console.log("cleanAddress[1] - " + cleanAddress[1]);
  // console.log("cleanAddress[2] - " + cleanAddress[2]);
  // console.log("cleanAddress[3] - " + cleanAddress[3]);
  // console.log("cleanAddress[0][0] - " + cleanAddress[0][0]);
  // console.log("cleanAddress[0][1] - " + cleanAddress[0][1]);
  // console.log("cleanAddress[0][2] - " + cleanAddress[0][2]);
  // console.log("cleanAddress[0][3] - " + cleanAddress[0][3]);
  
  
  // console.log("output00 - " + output00);
  // console.log("output01 - " + output01);
  // console.log("output02 - " + output02);
  // console.log("output03 - " + output03);
  // console.log("output04 - " + output04);
  // console.log("output05 - " + output05);
  // console.log("output06 - " + output06);
  
  // pagerEmergencyMessage
  // console.log("jobTypeAndNote -" + jobTypeAndNote);
  // console.log("address - " + address);
  //console.log("address01 - " + address01);
  
  