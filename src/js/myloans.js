import { _getFirestore, _getRtdb, _getCurrentFirebaseTime,
    _getAryoProjectLink, 
    _submitLeadToAryoLeadsDBCallBack} from './firebase';
import { pancardValidation, ONHOLD } from './helper'

const db = _getFirestore();
const rtdb = _getRtdb();

const PROJ_NAME = new Map([["IIFL", "India Infoline"], ["KB00", "KreditBee"]]);
const LEAD_CATEGORY = new Map([["PL", "Personal loan"], ["BL", "Business loan"], ["IL", "Instant loan"]]);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const projCode = uid.substring(0, 4);
const projectCode = uid.substring(0, 6);
const id = uid.substring(6, uid.length);
const projectName = PROJ_NAME.get(projCode);
const leadCategory = LEAD_CATEGORY.get(uid.substring(4, 6));
const child = leadCategory + "/" + projectName;

let logo = document.getElementById('plogoId');
let mtag = document.getElementById('taglineId');
// console.log(projCode, " = ", leadCategory, " = ", child)
if (projCode == 'IIFL' && leadCategory == 'Business loan') {
   logo.src = "images/iifllogo.png";
   mtag.innerHTML = "Apply for a business loan from IIFL!";
} else if (projCode == 'IIFL' && leadCategory == 'Personal loan' ) {
    logo.src = "images/iifllogo.png";
   mtag.innerHTML = "Apply for a personal loan from IIFL!";
} else if (projCode == 'KB00') {
    logo.src = "images/kreditbeelogo.png";
    mtag.innerHTML = "Get an Instant loan in 2 min!";
}

if (projectName == undefined || id.length != 28) {

    console.log("Invalid url");
    let logo = document.getElementById('plogoId')
    let lead = document.getElementById('leadform');
    let mtag = document.getElementById('taglineId');
    logo.src = "/images/sad.png";
    lead.style.visibility = 'hidden';
    mtag.innerHTML = "This is an invalid URL!";
    
}

if (ONHOLD.includes(projectCode)){
   let lead = document.getElementById('leadform');
   let mtag = document.getElementById('taglineId');
   lead.style.visibility = 'hidden';
   mtag.innerHTML = "Currently we are on hold, please visit us later!";
}

document.getElementById('leadform').addEventListener('submit', submitLead);

function submitLead(e) {
   e.preventDefault();

   let name = document.querySelector('#fullnameId').value;
   let mobile = document.querySelector('#mobileId').value;
   let email = document.querySelector('#emailId').value;
   let pincode = document.querySelector('#pincodeId').value;
   let pan = document.querySelector('#panId').value;
   if (!pancardValidation(pan)) {
       alert("Please enter valid pan number");
       return;
   }

   const lead = {
       agentId: id,
       customerName: name,
       customerMobile: mobile,
       customerEmail: email,
       customerPincode: pincode,
       customerPan: pan,
       projectName: projectName,
       leadCategory: leadCategory,
       aggregatorName: "",
       payoutState: "Not eligible",
       status: "In process",
       transactionId: "",
       payoutAmount: 0,
       dateOfSubmission: _getCurrentFirebaseTime(),
       remarks: "",
       eligibleForPayout: false
   }
   _submitLeadToAryoLeadsDBCallBack(lead, id, callBack);
}

function callBack(output) {
  
   if (output) {
        _getAryoProjectLink(child, getLink);
   }
   else {
       if (!alert("Something went wrong, please try again!!")){window.location.reload();}
   }
}

function getLink(link) {
   if (link != null) {
       window.open(link, "_self");
   }
   else {
       if (!alert('Something went wrong, please try again!')){window.location.reload();}
       return;
   }
}