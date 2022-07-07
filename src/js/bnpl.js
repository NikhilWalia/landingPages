import { _getCurrentFirebaseTime, _getFirestore, _getProjectLink, _getRtdb, _isProjectOnHold, _submitLead, _submitLeadWithCallBack } from './firebase'
import { ONHOLD } from './helper';

const PROJ_NAME = new Map([["ASPR", "Aspire"]]);
const LEAD_CATEGORY = "BNPL";

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const projCode = uid.substring(0, 4);
const id = uid.substring(6, uid.length);
const projectName = PROJ_NAME.get(projCode);
const child = LEAD_CATEGORY + "/" + "Aspire-V1";
console.log("code ",child, "  ", projCode, " ", projectName);
var mobile;

if (projectName == undefined || id.length != 28) {

    console.log("Invalid url");
    let logo = document.getElementById('plogoId')
    let lead = document.getElementById('leadform');
    let mtag = document.getElementById('taglineId');
    logo.src = "/images/sad.png";
    lead.style.visibility = 'hidden';
    mtag.innerHTML = "This is an invalid URL!";
    
}

if (ONHOLD.includes(projectName)){
    console.log("onhold")
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
    let occupation = document.getElementById('occupationId').value;
    console.log("Occupation ", occupation);
    if (occupation == 'Occupation') {
        alert("Please select occupation");
    }
    let income = document.querySelector('#incomeId').value;
    let pincode = document.querySelector('#pincodeId').value;
    let state = document.getElementById('stateId').value;
    console.log("State ", state);
    if (state == 'State') {
        alert("Please select State");
    }

    const lead = {
        agentId: id,
        customerName: name,
        customerMobile: mobile,
        customerOccupation: occupation,
        customerMonthlyIncome: income,
        customerPincode: pincode,
        customerState: state,
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
        console.log("link :" + link)
        window.open(link, "_self");
    }
    else {
        if (!alert('Something went wrong, please try again!')){window.location.reload();}
        return;
    }
}