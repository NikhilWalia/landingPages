import { _getFirestore, _getRtdb, _getCurrentFirebaseTime, _submitLead, _isProjectOnHold } from './firebase';
import { pancardValidation } from './helper'

const db = _getFirestore();
const rtdb = _getRtdb();

const PROJ_NAME = new Map([["KB00", "KreditBee"], ["ASPR", "Aspire"]]);
const LEAD_CATEGORY = new Map([["IL", "Instant loan"], ["BP", "BNPL"]]);

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const projCode = uid.substring(0, 4);
const id = uid.substring(4, uid.length);
const projectName = PROJ_NAME.get(projCode);
const leadCat = LEAD_CATEGORY.get(uid.substring(4, 6));

let logo = document.getElementById('plogoId');
// let mtag = document.getElementById('taglineId');
if (projCode == 'KB00') {
    logo.src = "images/kreditbee_web_lp.png";
    // mtag.innerHTML = "Instant loan";
}
else if (projCode == 'ASPR') {
    logo.src = "images/aspirebanner.png"
    mtag.innerHTML = "BNPL";
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

_isProjectOnHold(projectName, output);

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
    }
    let occupation = document.getElementById('occupationId').value;
    console.log('occupation ' + occupation);
    if (!occupation.localeCompare('Occupation')) {
        alert("Please Select Occupation");
        return;
    }

    const lead = {
        customerName: name,
        customerMobile: mobile,
        customerEmail: email,
        customerPincode: pincode,
        customerPan: pan,
        projectName: projectName,
        leadCategory: leadCat,
        aggregatorName: "",
        payoutState: "Not eligible",
        status: "In process",
        transactionId: "",
        payoutAmount: 0,
        dateOfSubmission: _getCurrentFirebaseTime(),
        remarks: "",
        eligibleForPayout: false
    }
    _submitLead(lead, id);
}

