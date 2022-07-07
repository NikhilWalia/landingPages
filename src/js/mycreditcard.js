import { _getCurrentFirebaseTime, _getFirestore, _getAryoProjectLink, _getRtdb, _isProjectOnHold, _submitLead, _submitLeadToAryoLeadsDBCallBack, _submitLeadWithCallBack } from './firebase'
import { ONHOLD } from './helper';

const db = _getFirestore();
const rtdb = _getRtdb();

const PROJ_NAME = new Map([["axisc", "Axis"], ["frcrg", "Freecharge"], ["bajaj", "Bajaj EMI Card"],
                    ["indus", "IndusInd"], ["kotak, Kotak"], "bobcc", "Bank Of Baroda"], ["icici", "ICICI"])
const PROJ_CODE = new Map([["frcrg", "f"], ["bajaj", "b"], ["indus", "i"], ["kotak", "k"],
                    ["bobcc", "o"], ["icici", "c"]]);

const LEAD_CATEGORY = "Credit Card";
var mobile;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const projCode = uid.substring(0, 5);
const id = uid.substring(5, uid.length);
const projectName = PROJ_NAME.get(projCode);
const child = LEAD_CATEGORY + "/" + projectName;
// console.log("uid :", id, " projname ", projectName, " projCode ", projCode);

let logo = document.getElementById('plogoId');
let mtag = document.getElementById('taglineId');

var isValidUrl = true;
if (projectName == undefined) {

    // console.log("Invalid url");
    let logo = document.getElementById('plogoId')
    let lead = document.getElementById('leadform');
    let mtag = document.getElementById('taglineId');
    logo.src = "/images/sad.png";
    lead.style.visibility = 'hidden';
    mtag.innerHTML = "This is an invalid URL!";
    isValidUrl = false;
}

if (isValidUrl) {
    if (ONHOLD.includes(projCode)) {
        console.log("onhold")
        let lead = document.getElementById('leadform');
        let mtag = document.getElementById('taglineId');
        lead.style.visibility = 'hidden';
        mtag.innerHTML = "Currently we are on hold, please visit us later!";
    }

    
    if (projCode === 'axisc') {
        logo.src = "images/axisbanklogo.png";
        mtag.innerHTML = "Get Your Axis Bank Credit Card Now!";
    } else if (projCode === 'frcrg') {
        logo.src = "images/freechargebnpllogo.png";
        mtag.innerHTML = "Get Your Pay Later Digital Credit Card Now!";
    } else if (projCode === 'bajaj') {
        logo.src = "images/bajajlogo.png";
        mtag.innerHTML = "Get Your Bajaj EMI Card Now!";
    } else if (projCode === 'indus') {
        logo.src = "images/indusindcclogo.png";
        mtag.innerHTML = "Get Your Life Time Free IndusInd Bank Credit Card Now!";
    } else if (projCode === 'bobcc') {
        logo.src = "images/bobcclogo.png";
        mtag.innerHTML = "Get Your Bank Of Baroda Credit Card Now!";
    } else if (projCode === 'kotak') {
        logo.src = "images/kotak.png";
        mtag.innerHTML = "Get Your Kotak Bank Credit Card Now!";
    } else if (projCode === 'icici') {
        logo.src = "images/icicilogo.png";
        mtag.innerHTML = "Get Your ICICI Bank Credit Card Now!";
    }
}


function getLink(link) {
    if (link != null) {
        let subId = getSubId(mobile);
        let _link = link.replace("{aryoId}", subId);
        // console.log("link :" + _link)
        window.open(_link, "_self");
    }
    else {
        if (!alert('Something went wrong, please try again!')){window.location.reload();}
        return;
    }
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

document.getElementById('leadform').addEventListener('submit', submitLead);

function submitLead(e) {
    e.preventDefault();

    let name = document.querySelector('#fullnameId').value;
    mobile = document.querySelector('#mobileId').value;
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
        subId: getSubId(mobile),
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

function getSubId(mobile) {
    if (PROJ_CODE.get(projCode) != undefined) {
        return (PROJ_CODE.get(projCode) + mobile.charAt(0) + mobile.charAt(2) + mobile.charAt(4) + mobile.charAt(6) + mobile.charAt(8));
    }    
}

