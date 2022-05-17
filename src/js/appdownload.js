import { _getFirestore, _getRtdb, _getCurrentFirebaseTime,
    _submitLead, _isProjectOnHold, _submitLeadWithCallBack,
    _getProjectLink } from './firebase';
import { ONHOLD } from './helper'

const db = _getFirestore();
const rtdb = _getRtdb();

const PROJ_CODE = new Map([ ["IMBL", "R"]]);
const PROJ_NAME = new Map([["IMBL", "iMobile"]]);
const LEAD_CATEGORY = "App download";

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const projCode = uid.substring(0, 4);
const id = uid.substring(6, uid.length);
const projectName = PROJ_NAME.get(projCode);
const child = LEAD_CATEGORY + "/" + projectName;
var mobile;

let logo = document.getElementById('plogoId');
let mtag = document.getElementById('taglineId');
if (projCode == 'IMBL') {
   logo.src = "images/imobilelogo.png";
   mtag.innerHTML = "Manage all your Banking services with iMobile pay App!";
}

if (ONHOLD.includes(projCode)){
   let lead = document.getElementById('leadform');
   let mtag = document.getElementById('taglineId');
   lead.style.visibility = 'hidden';
   mtag.innerHTML = "Currently we are on hold, please visit us later!";
}

document.getElementById('leadform').addEventListener('submit', submitLead);

function submitLead(e) {
   e.preventDefault();

   let name = document.querySelector('#fullnameId').value;
   mobile = document.querySelector('#mobileId').value;
   let email = document.querySelector('#emailId').value;
   let pincode = document.querySelector('#pincodeId').value;

   const lead = {
       customerName: name,
       customerMobile: mobile,
       customerEmail: email,
       customerPincode: pincode,
       projectName: projectName,
       leadCategory: LEAD_CATEGORY,
       subId: getSubId(mobile, projCode),
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

function getSubId(mobile, projCode) {
    return (PROJ_CODE.get(projCode) + mobile.charAt(0) + mobile.charAt(2) + mobile.charAt(4) + mobile.charAt(6) + mobile.charAt(8));
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