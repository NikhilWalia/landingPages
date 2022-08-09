import { _getCurrentFirebaseTime, _getFirestore, _getAryoProjectLink, _getRtdb,
     _submitLeadToAryoLeadsDBCallBack, 
     _submitLeadWithCallBack, _getSubId } from './firebase'
import { ONHOLD } from './helper';

const pincode = document.getElementById('pincodeId');
pincode.addEventListener('input', function () {
    console.log(this.value.length);
});

const PROJ_CODE = new Map([ ["ESPR", 6], ["AXIS", "X"], ["ICID", "D"], ["KTKC", "C"], ["EDLW", "E"], ["YESS", "Y"]]);

const PROJ_NAME = new Map([["ESPR", "Espresso"], ["PYTM", "Paytm"], ["ANGL", "Angel"],
     ["EDLW", "Edelweiss"], ["KTKC", "Kotak Cherry"], ["ICID", "ICICI Direct"], ["YESS", "Yes Securities"] ]);

const LEAD_CATEGORY = "Demat Account";

const queryString = window.location.search;
// console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const projCode = uid.substring(0, 4);
const projectCode = uid.substring(0, 6);
const id = uid.substring(6, uid.length);
const projectName = PROJ_NAME.get(projCode);
const child = LEAD_CATEGORY + "/" + projectName;
// console.log("code => ",child, "  ", projCode, " ", projectName);
var buttonSub = document.getElementById('submitleadId');
var subId = _getSubId(PROJ_CODE.get(projCode));
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

if (ONHOLD.includes(projectCode)){
    // console.log("onhold")
    let lead = document.getElementById('leadform');
    let mtag = document.getElementById('taglineId');
    lead.style.visibility = 'hidden';
    mtag.innerHTML = "Currently we are on hold, please visit us later!";
}

function getLink(link) {
    if (link != null) {
        // let subId = subId;
        let _link = link.replace("{aryoId}", subId);
        console.log("link :" + _link)
        window.open(_link, "_self");
    }
    else {
        if (!alert('Something went wrong, please try again!')){window.location.reload();}
        return;
    }
}

function callBack(output, newSubId) {
    // console.log("output ", output,  " newSubid " , newSubId);
    buttonSub.disabled = false;
    buttonSub.style.backgroundColor = "#4285F4";
    if (output) {
        if (newSubId != null) {
            subId = newSubId;
        }
        _getAryoProjectLink(child, getLink);
    }
    else {
        if (!alert("Something went wrong, please try again!!")){window.location.reload();}
    }
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
        subId: subId,
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
