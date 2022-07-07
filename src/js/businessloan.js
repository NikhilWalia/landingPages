import { _getFirestore, _getRtdb, _getCurrentFirebaseTime,
    _submitLead, _isProjectOnHold, _submitLeadWithCallBack,
    _getProjectLink } from './firebase';
import { pancardValidation, ONHOLD } from './helper'

const db = _getFirestore();
const rtdb = _getRtdb();

const PROJ_NAME = new Map([["IIFL", "India Infoline"]]);
const LEAD_CATEGORY = "Business loan";

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const projCode = uid.substring(0, 4);
const projectCode = uid.substring(0, 6);
const id = uid.substring(6, uid.length);
const projectName = PROJ_NAME.get(projCode);
const child = LEAD_CATEGORY + "/" + projectName;
let logo = document.getElementById('plogoId');
let mtag = document.getElementById('taglineId');

if (projectName == undefined || id.length != 28) {

    console.log("Invalid url");
    let logo = document.getElementById('plogoId')
    let lead = document.getElementById('leadform');
    let mtag = document.getElementById('taglineId');
    logo.src = "/images/sad.png";
    lead.style.visibility = 'hidden';
    mtag.innerHTML = "This is an invalid URL!";
    
}

if (projCode == 'IIFL') {
   logo.src = "images/iifllogo.png";
   mtag.innerHTML = "Apply for a business loan from IIFL!";
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
       leadCategory: LEAD_CATEGORY,
       aggregatorName: "",
       payoutState: "Not eligible",
       status: "In process",
       transactionId: "",
       payoutAmount: 0,
       dateOfSubmission: _getCurrentFirebaseTime(),
       remarks: "",
       eligibleForPayout: false
   }
   _submitLeadWithCallBack(lead, id, callBack);
}

function callBack(output) {
   console.log("output ", output);
   if (output) {
       _getProjectLink(child, getLink);
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