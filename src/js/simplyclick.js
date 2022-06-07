import { _getCurrentFirebaseTime, _getFirestore, _getProjectLink, _getRtdb, _isProjectOnHold, _submitLead, _submitLeadWithCallBack } from './firebase'

const db = _getFirestore();
const rtdb = _getRtdb();

const PROJ_CODE = "C"
const PROJ_NAME = "Simply click";
const LEAD_CATEGORY = "Credit Card";
var mobile;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const id = uid.substring(0, uid.length);
const child = LEAD_CATEGORY + "/" + PROJ_NAME;
console.log("uid :", id);

function result(output) {
    console.log("onHold : " + output);
    if (output == true) {
        let submitButton = document.getElementById('submitleadId');
        submitButton.disabled = true;
        submitButton.value = "On Hold";
        if(!alert('Currently we  are on hold, please come back after sometime')){window.location.reload();}
        return;
    }
    else if (output == null) {
       if(!alert("Something went wrong, please try refersh !!")){window.location.reload();}
        return;
    }
}

_isProjectOnHold(child, result);

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
        agentId: id,
        customerName: name,
        customerMobile: mobile,
        customerEmail: email,
        customerPincode: pincode,
        projectName: PROJ_NAME,
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
    console.log(PROJ_CODE);
    return (PROJ_CODE + mobile.charAt(0) + mobile.charAt(2) + mobile.charAt(4) + mobile.charAt(6) + mobile.charAt(8));
}

