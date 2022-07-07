import { _getFirestore, _getRtdb, _getCurrentFirebaseTime,
    _submitLead, _isProjectOnHold,
    _getAryoProjectLink, 
    _submitLeadToAryoLeadsDBCallBack} from './firebase';
import { ONHOLD } from './helper'

const db = _getFirestore();
const rtdb = _getRtdb();

const PROJ_NAME = new Map([["MDRX", "Mudrex"], ["GOTS", "Giottus"], ["UNCN", "Unocoin"]]);
const LEAD_CATEGORY = "Crypto";

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const projCode = uid.substring(0, 4);
const id = uid.substring(4, uid.length);
const projectName = PROJ_NAME.get(projCode);

const child = LEAD_CATEGORY + "/" + projectName;

if (projectName == undefined || id.length != 28) {

    console.log("Invalid url");
    let logo = document.getElementById('plogoId')
    let lead = document.getElementById('leadform');
    let mtag = document.getElementById('taglineId');
    logo.src = "/images/sad.png";
    lead.style.visibility = 'hidden';
    mtag.innerHTML = "This is an invalid URL!";
    
}

if (ONHOLD.includes(projCode)){
    console.log("onhold")
    let lead = document.getElementById('leadform');
    let mtag = document.getElementById('taglineId');
    lead.style.visibility = 'hidden';
    mtag.innerHTML = "Currently we are on hold, please visit us later!";
}

let logo = document.getElementById('plogoId');
let mtag = document.getElementById('taglineId');
if (projCode == 'MDRX') {
   logo.src = "images/mudraxlogo.png";
   mtag.innerHTML = "Open Mudraex crypto account for free!";
} else if (projCode == 'GOTS') {
    let divGiottusCoupon = document.getElementById('giottuscopuonId');
    divGiottusCoupon.style.display = "block";
    logo.src = "images/giottus.png";
   mtag.innerHTML = "Open Giottus crypto account for free!";
} else if (projCode == 'UNCN') {
    logo.src = "images/unocoinlogo.png";
   mtag.innerHTML = "Open Unocoin crypto account for free!";
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


document.getElementById('leadform').addEventListener('submit', submitLead);

function submitLead(e) {
   e.preventDefault();

   let name = document.querySelector('#fullnameId').value;
   let mobile = document.querySelector('#mobileId').value;
   let email = document.querySelector('#emailId').value;
   let pincode = document.querySelector('#pincodeId').value;
   console.log(name, " ", mobile, " ", email, " ", pincode);
   const lead = {
       agentId: id,
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
   _submitLeadToAryoLeadsDBCallBack(lead, id, callBack);
}

function callBack(output) {
   console.log("output ", output);
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