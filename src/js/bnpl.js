import { _getCurrentFirebaseTime, _getFirestore, _getProjectLink, _getRtdb, _isProjectOnHold, _submitLead, _submitLeadWithCallBack } from './firebase'

const PROJ_NAME = new Map([["ASPR", "Aspire"]]);
const LEAD_CATEGORY = "BNPL";

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const projCode = uid.substring(0, 4);
const id = uid.substring(6, uid.length);
const projectName = PROJ_NAME.get(projCode);
const child = LEAD_CATEGORY + "/" + projectName;
console.log("code ",child, "  ", projCode, " ", projectName);
var mobile;

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
        // let subId = getSubId(mobile, projCode);
        _getProjectLink(child, getLink);
    }
    else {
        if (!alert("Something went wrong, please try again!!")){window.location.reload();}
    }
}

function getLink(link) {
    if (link != null) {
        // let subId = getSubId(mobile, projCode);
        // let _link = link.replace("{aryoId}", subId);
        console.log("link :" + _link)
        window.open(_link, "_self");
    }
    else {
        if (!alert('Something went wrong, please try again!')){window.location.reload();}
        return;
    }
}