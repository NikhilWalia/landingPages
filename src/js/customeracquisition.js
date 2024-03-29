import {
    _getFirestore, _getRtdb, _getCurrentFirebaseTime,
    _submitLead, _submitLeadToAryoLeadsDBCallBack,
    _getAryoProjectLink, _getSubId
} from './firebase';
import { ONHOLD } from './helper'

const db = _getFirestore();
const rtdb = _getRtdb();

const PROJ_CODE = new Map([["IMBL", "R"], ["JARS", "j"], ["GULK", "G"]]);
const PROJ_NAME = new Map([["IMBL", "iMobile"], ["JARS", "Jar"], ["GULK", "Gullak"]]);
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
var subId = _getSubId(PROJ_CODE.get(projCode));
let logo = document.getElementById('plogoId');
let mtag = document.getElementById('taglineId');
var buttonSub = document.getElementById('submitleadId');

if (projectName == undefined || id.length != 28) {

    console.log("Invalid url");
    let logo = document.getElementById('plogoId')
    let lead = document.getElementById('leadform');
    let mtag = document.getElementById('taglineId');
    logo.src = "/images/sad.png";
    lead.style.visibility = 'hidden';
    mtag.innerHTML = "This is an invalid URL!";

}

if (projCode == 'GULK') {
    logo.src = "images/gullaklogo.png";
    mtag.innerHTML = "Now save and invest in gold through Gullak app!"
}

if (ONHOLD.includes(projCode)) {
    let lead = document.getElementById('leadform');
    let mtag = document.getElementById('taglineId');
    lead.style.visibility = 'hidden';
    mtag.innerHTML = "Currently we are on hold, please visit us later!";
}

document.getElementById('leadform').addEventListener('submit', submitLead);

function submitLead(e) {
    e.preventDefault();

    buttonSub.disabled = true;
    buttonSub.style.background = "#D3D3D3";
    let name = document.querySelector('#fullnameId').value;
    mobile = document.querySelector('#mobileId').value;
    let email = document.querySelector('#emailId').value;
    let pincode = document.querySelector('#pincodeId').value;

    const lead = {
        agentId: id,
        customerName: name,
        customerMobile: mobile,
        customerEmail: email,
        customerPincode: pincode,
        projectName: projectName,
        leadCategory: LEAD_CATEGORY,
        subId: subId,
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

function callBack(output, newSubId) {
    //    console.log("output ", output);
    buttonSub.disabled = false;
    buttonSub.style.backgroundColor = "#4285F4";
    if (output) {
        if (newSubId != null) {
            subId = newSubId;
        }
        _getAryoProjectLink(child, getLink);
    }
    else {
        if (!alert("Something went wrong, please try again!!")) { window.location.reload(); }
    }
}

function getLink(link) {
    if (link != null) {
        let _link = link.replace("{aryoId}", subId);
        window.open(_link, "_self");
    }
    else {
        if (!alert('Something went wrong, please try again!')) { window.location.reload(); }
        return;
    }
}