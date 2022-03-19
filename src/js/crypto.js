import { _getFirestore, _getRtdb, _getCurrentFirebaseTime,
    _submitLead, _isProjectOnHold, _submitLeadWithCallBack,
    _getProjectLink } from './firebase';
import { pancardValidation } from './helper'

const db = _getFirestore();
const rtdb = _getRtdb();

const PROJ_NAME = new Map([["MDRX", "Mudrex"]]);
const LEAD_CATEGORY = "Crypto";

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const projCode = uid.substring(0, 4);
const id = uid.substring(4, uid.length);
const projectName = PROJ_NAME.get(projCode);

const child = LEAD_CATEGORY + "/" + projectName;

let logo = document.getElementById('plogoId');
let mtag = document.getElementById('taglineId');
if (projCode == 'MDRX') {
   logo.src = "images/mudraxlogo.png";
   mtag.innerHTML = "Open Mudraex crypto account for free!";
}


function output(output) {
   console.log("output : " + output);
   if (output == true) {
       let submitButton = document.getElementById('submitleadId');
       submitButton.disabled = true;
       submitButton.value = "On Hold";
       if (!alert("Currently we  are on hold, please come back after sometime")){window.location.reload();}
       return;
   }
   else if (output == null){
       if (!alert("Something went wrong, please try refersh !!")){window.location.reload();}
       return;
   }
}

_isProjectOnHold(child, output);

document.getElementById('leadform').addEventListener('submit', submitLead);

function submitLead(e) {
   e.preventDefault();

   let name = document.querySelector('#fullnameId').value;
   let mobile = document.querySelector('#mobileId').value;
   let email = document.querySelector('#emailId').value;
   let pincode = document.querySelector('#pincodeId').value;
   console.log(name, " ", mobile, " ", email, " ", pincode);
   const lead = {
       customerName: name,
       customerMobile: mobile,
       customerEmail: email,
       customerPincode: pincode,
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
   };
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