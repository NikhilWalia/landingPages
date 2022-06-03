import { _getCurrentFirebaseTime, _getFirestore, _getProjectLink, _getRtdb, _isProjectOnHold, _submitLead, _submitLeadWithCallBack } from './firebase'
import { ONHOLD } from './helper';

const db = _getFirestore();
const rtdb = _getRtdb();

const PROJ_NAME = new Map([["sbiss", "Simply save"], ["icici", "ICICI"], ["sbisc", "Simply click"]])
const PROJ_CODE = new Map([["sbiss", 'S'], ["icici", 'I'], ["sbisc", 'C'] ]);
const LEAD_CATEGORY = "Credit Card";
var mobile;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const projCode = uid.substring(0, 5);
const id = uid.substring(5, uid.length);
const projectName = PROJ_NAME.get(projCode);
const child = LEAD_CATEGORY + "/" + projectName;
console.log("uid :", id);

let logo = document.getElementById('plogoId');
let mtag = document.getElementById('taglineId');

if (ONHOLD.includes(projCode)){
    console.log("onhold")
    let lead = document.getElementById('leadform');
    let mtag = document.getElementById('taglineId');
    lead.style.visibility = 'hidden';
    mtag.innerHTML = "Currently we are on hold, please visit us later!";
}

if (projCode == 'sbisc') {
    logo.src = "images/simplyclickcardimage.jpg";
    mtag.innerHTML = "Get Your SBI Simply Click Card Now!";
}
else if (projCode == 'sbiss') {
    logo.src = "images/simplysave.jpg"
    mtag.innerHTML = "Get Your SBI Simply Save Card Now!";
} else if (projCode === 'icici') {
    logo.src = "images/icicilogo.png";
    mtag.innerHTML = "Get Your ICICI Credit Card Now!";
}

function getLink(link) {
    if (link != null) {
        let subId = getSubId(mobile);
        let _link = link.replace("{aryoId}", subId);
        console.log("link :" + _link)
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
        _getProjectLink(child, getLink);
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
    _submitLeadWithCallBack(lead, id, callBack);
}

function getSubId(mobile) {
    return (PROJ_CODE.get(projCode) + mobile.charAt(0) + mobile.charAt(2) + mobile.charAt(4) + mobile.charAt(6) + mobile.charAt(8));
}

