import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, Timestamp } from 'firebase/firestore'
import { getDatabase, ref, child, get } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCR7CAl0XTaarMBBlkac9rT0So04hmmH7s",
    authDomain: "aryotest-7a458.firebaseapp.com",
    databaseURL: "https://aryotest-project-pre.firebaseio.com/",
    projectId: "aryotest-7a458",
    storageBucket: "aryotest-7a458.appspot.com",
    messagingSenderId: "814626812052",
    appId: "1:814626812052:web:c78fa20629b98323248481",
    measurementId: "G-R01FFJW83G"
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app);
const rtdb = ref(getDatabase(app));
const PROJ_CODE = new Map([["FI00", 1], ["K811", 2], ["NIYX", 5], ["ESPR", 6]]);
const PROJ_NAME = new Map([["FI00", "Fi"], ["K811", "Kotak 811"], ["NIYX", "NiyoX"],
     ["ESPR", "Espresso"], ["KB00", "KreditBee"]]);
const LEAD_CATEGORY = new Map([["SA", "Savings Account"], ["DA", "Demat Account"], ["IL", "Instant loan"]]);

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const projCode = uid.substring(0, 4);
const leadCat = uid.substring(4, 6);
const id = uid.substring(6, uid.length);
const projectName = PROJ_NAME.get(projCode);
console.log("param : " + uid + " " + projCode + " " + leadCat + " " + projectName);
console.log("ARYO Leads");
get(child(rtdb, `${projectName}/onHold`)).then((snapshot) => {

    if (snapshot.exists()) {
        console.log(snapshot.val());
        if (snapshot.val() == true)
        {
            //disable submit button
            let submitButton = document.getElementById('submitleadId');
            submitButton.disabled = true;
            submitButton.value = "On Hold";
        }

    } else {
        console.log("No data available");
        alert("Error fetching details, please try again!");
    }
}).catch((error) => {
    console.error(error);
    alert("Error submitting your lead, please try again!");
});
//get if project is on hold

document.getElementById('leadform').addEventListener('submit', submitLead);

function submitLead(e) {
    e.preventDefault();

    // const queryString = window.location.search;
    // console.log(queryString);
    // const urlParams = new URLSearchParams(queryString);
    // let uid = urlParams.get("uid");
    // console.log("param : " + uid);


    let name = document.querySelector('#fullnameId').value;
    let mobile = document.querySelector('#mobileId').value;
    let email = document.querySelector('#emailId').value;
    let pincode = document.querySelector('#pincodeId').value;
    console.log(name, " ", mobile, " ", email, " ", pincode);
    createLead(name, mobile, email, pincode, uid);
}

function getSubId(mobile, projCode) {
    console.log(PROJ_CODE, " ", projCode);
    return (PROJ_CODE.get(projCode) + mobile.charAt(0) + mobile.charAt(2) + mobile.charAt(4) + mobile.charAt(6) + mobile.charAt(8));
}

const getCurrentFirebaseTime = () => {

    return Timestamp.now().toDate();

}

function createLead(name, mobile, email, pincode, uid) {

    // let projCode = uid.substring(0, 4);
    // let leadCat = uid.substring(4, 6);
    // const id = uid.substring(6, uid.length);
    let subId = getSubId(mobile, projCode);
    // console.log("codes are : " + projCode, " ", leadCat, " ", id);
    console.log("subId :" + subId);
    // let projectName = PROJ_NAME.get(projCode);
    // let leadCategory = LEAD_CATEGORY.get(leadCat);
    // let aggregatorName = null;
    // let payoutState = "Not eligible"
    // let timeStamp = getCurrentFirebaseTime();
    // let status = "In process";
    // let transactionId = "";
    // let payoutAmount = 0;
    // let remarks = "";
    // let eligibleForPayout = false;

    // console.log("timestamp :" + timeStamp);

    const leadsCol = collection(db, `/AryoDB/${id}/LeadsDB`);
    addDoc(leadsCol, {
        customerName: name,
        customerMobile: mobile,
        customerEmail: email,
        customerPincode: pincode,
        projectName: projectName,
        leadCategory: LEAD_CATEGORY.get(leadCat),
        aggregatorName: "",
        payoutState: "Not eligible",
        status: "In process",
        transactionId: "",
        payoutAmount: 0,
        dateOfSubmission: getCurrentFirebaseTime(),
        remarks: "",
        eligibleForPayout: false
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            //get link
            get(child(rtdb, `${projectName}/link`)).then((snapshot) => {

                if (snapshot.exists()) {
                    // console.log(snapshot.val());
                    let link = snapshot.val().replace("{aryoId}", subId);
                    console.log("link :" + link)
                    window.open(link, "_self");
                } else {
                    console.log("No data available");
                    alert("Error fetching details, please try again!");
                }
            }).catch((error) => {
                console.error(error);
                alert("Error submitting your lead, please try again!");
            });

        });
}
