
// import { _getCurrentFirebaseTime, _getFirestore, _getProjectLink, _getRtdb, _isProjectOnHold, _submitLead, _submitLeadWithCallBack } from './firebase'

// const pincode = document.getElementById('pincodeId');
// pincode.addEventListener('input', function () {
//     console.log(this.value.length);
// });

// console.log("pincode " + pincode.val)
// const db = _getFirestore();
// const rtdb = _getRtdb();
// const PROJ_CODE = new Map([["FI00", 1], ["K811", 2], ["NIYX", 5], ["ESPR", 6]]);
// const PROJ_NAME = new Map([["FI00", "Fi"], ["K811", "Kotak 811"], ["NIYX", "NiyoX"],
// ["ESPR", "Espresso"], ["KB00", "KreditBee"], ["FSDM", "Fisdom"], ["5PSA", "5Paisa"]]);
// const LEAD_CATEGORY = new Map([["SA", "Savings Account"], ["DA", "Demat Account"], ["IL", "Instant loan"]]);

// const queryString = window.location.search;
// console.log(queryString);
// const urlParams = new URLSearchParams(queryString);
// const uid = urlParams.get("uid");
// const projCode = uid.substring(0, 4);
// const leadCat = uid.substring(4, 6);
// const id = uid.substring(6, uid.length);
// const projectName = PROJ_NAME.get(projCode);
// var mobile;
// console.log("param : " + uid + " " + projCode + " " + leadCat + " " + projectName);
// console.log("ARYO Leads");

// function result(output) {
//     console.log("onHold : " + output);
//     if (output == true) {
//         let submitButton = document.getElementById('submitleadId');
//         submitButton.disabled = true;
//         submitButton.value = "On Hold";
//         alert("Currently we  are on hold, please come back after sometime");
//         return;
//     }
//     else if (output == null) {
//         alert("Something went wrong, please try refersh !!")
//         return;
//     }
// }

// _isProjectOnHold(projectName, result);

// function getLink(link) {
//     if (link != null) {
//         let subId = getSubId(mobile, projCode);
//         let _link = link.replace("{aryoId}", subId);
//         console.log("link :" + _link)
//         window.open(_link, "_self");
//     }
//     else {
//         alert('Something went wrong, please try again!');
//         return;
//     }
// }
// function callBack(output) {
//     console.log("output ", output);
//     if (output) {
//         let subId = getSubId(mobile, projCode);
//         _getProjectLink(projectName, getLink);
//     }
//     else {
//         alert("Something went wrong, please try again!!")
//     }
// }
// document.getElementById('leadform').addEventListener('submit', submitLead);

// function submitLead(e) {
//     e.preventDefault();

//     let name = document.querySelector('#fullnameId').value;
//     mobile = document.querySelector('#mobileId').value;
//     let email = document.querySelector('#emailId').value;
//     let pincode = document.querySelector('#pincodeId').value;
//     console.log(name, " ", mobile, " ", email, " ", pincode);
//     const lead = {
//         customerName: name,
//         customerMobile: mobile,
//         customerEmail: email,
//         customerPincode: pincode,
//         projectName: projectName,
//         leadCategory: LEAD_CATEGORY.get(leadCat),
//         aggregatorName: "",
//         payoutState: "Not eligible",
//         status: "In process",
//         transactionId: "",
//         payoutAmount: 0,
//         dateOfSubmission: _getCurrentFirebaseTime(),
//         remarks: "",
//         eligibleForPayout: false
//     };
//     _submitLeadWithCallBack(lead, id, callBack);
// }

// function getSubId(mobile, projCode) {
//     console.log(PROJ_CODE, " ", projCode);
//     return (PROJ_CODE.get(projCode) + mobile.charAt(0) + mobile.charAt(2) + mobile.charAt(4) + mobile.charAt(6) + mobile.charAt(8));
// }
