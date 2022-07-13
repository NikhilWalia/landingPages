
import { _getCurrentFirebaseTime, _getFirestore, _getAryoProjectLink, _getRtdb,
     _submitLeadToAryoLeadsDBCallBack, _getSubId } from './firebase'
import { ONHOLD } from './helper';
const pincode = document.getElementById('pincodeId');
pincode.addEventListener('input', function () {
    console.log(this.value.length);
});

//console.log("pincode " + pincode.val)
const db = _getFirestore();
const rtdb = _getRtdb();
const PROJ_CODE = new Map([["FI00", 1], ["K811", 2], ["NIYX", 5], ["EQTS", 7], ["AXIS", 8], ["AUSF", 9], 
    ["JPTR", "0"]]);
const PROJ_NAME = new Map([["FI00", "Fi"], ["K811", "Kotak 811"],
     ["NIYX", "NiyoX"], ["EQTS", "Equitas"], ["AXIS", "Axis"], ["AUSF", "AU Small finance"],
     ["JPTR", "Jupiter"]]);
const LEAD_CATEGORY = "Savings Account";

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const projectCode = uid.substring(0, 6);
const projCode = uid.substring(0, 4);
const leadCat = uid.substring(4, 6);
const id = uid.substring(6, uid.length);
const projectName = PROJ_NAME.get(projCode);
const child = LEAD_CATEGORY + "/" + projectName;

var mobile;
const subId = _getSubId(PROJ_CODE.get(projCode));
if (projectName == undefined || id.length != 28) {

    console.log("Invalid url");
    let logo = document.getElementById('plogoId')
    let lead = document.getElementById('leadform');
    let mtag = document.getElementById('taglineId');
    logo.src = "/images/sad.png";
    lead.style.visibility = 'hidden';
    mtag.innerHTML = "This is an invalid URL!";
    
}

if (ONHOLD.includes(projectCode)){
    console.log("onhold")
    let lead = document.getElementById('leadform');
    let mtag = document.getElementById('taglineId');
    lead.style.visibility = 'hidden';
    mtag.innerHTML = "Currently we are on hold, please visit us later!";
}

function getLink(link) {
    if (link != null) {
    
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
    };

    _submitLeadToAryoLeadsDBCallBack(lead, id, callBack);
}
