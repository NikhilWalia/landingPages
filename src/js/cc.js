import { initializeApp } from '@firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database'
import { _getFirestore, _submitLead, _getCurrentFirebaseTime } from './firebase'
import { pancardValidation } from './helper';

const ccConfig = {
    projectId: "aryotest-7a458",
    databaseURL: "https://aryotest-ccpincodes-12bc8.firebaseio.com/"
}

const ccApp = initializeApp(ccConfig, 'ccapp');
const ccRtdb = ref(getDatabase(ccApp));
const db = _getFirestore();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uid = urlParams.get("uid");
const id = uid.substring(4, uid.length);
console.log("uid :", id);
const pincode = document.getElementById('pincodeId');
pincode.addEventListener('input', function () {
    console.log(this.value);
    if (this.value.length == 6) {
        const divLoader = document.createElement("div");
        divLoader.className = "loader";
        document.body.appendChild(divLoader);
        get(child(ccRtdb, `CCPINCODES`)).then((snapshot) => {

            if (snapshot.exists()) {
                console.log(snapshot.val().includes(this.value));
                if (!snapshot.val().includes(this.value)) {
                    //show error message
                    console.log("show error !")
                    divLoader.remove();
                    // <div class="errormsg">
                    // <img src="images/sad.png" alt="" height="45px" width="45px">
                    // <h2>Sorry we can't issue credit card at this pincode!!</h2>
                    // </div>
                    const errDiv = document.createElement('div');
                    errDiv.className = "errormsg";
                    // errDiv.innerHTML = '<img src="images/sad.png" alt="" height="45px" width="45px">'
                    // errDiv.innerHTML = '<h2>Sorry we can not issue credit card at this pincode!!</h2>'
                    // errDiv.innerHTML = 
                    let h2 = document.createElement('h2');
                    h2.innerHTML = "Sorry we can not issue credit card at this pincode";
                    let img = document.createElement('img');
                    img.className = "errimg"
                    img.src = 'images/sad.png';
                    img.height = 45;
                    img.width = 45;
                    errDiv.appendChild(img);
                    errDiv.appendChild(h2);
                    document.body.appendChild(errDiv);

                }
                else {
                    divLoader.remove();
                }
            } else {
                divLoader.remove();
                console.log("No data available");
                alert("Error fetching details, please try again!");
            }
        }).catch((error) => {
            console.error(error);
            alert("Error submitting your lead, please try again!");
        });
    }

});

document.getElementById('leadform').addEventListener('submit', submitLead);

function submitLead(e) {
    e.preventDefault();

    let name = document.querySelector('#fullnameId').value;
    let mobile = document.querySelector('#mobileId').value;
    let email = document.querySelector('#emailId').value;
    let pincode = document.querySelector('#pincodeId').value;
    let pan = document.querySelector('#panId').value;
    if (!pancardValidation(pan)) {
        alert("Please enter valid pan number");
    }
    let aadhaar = document.querySelector('#aadhaarId').value;
    let occupation = document.getElementById('occupationId').value;
    console.log('occupation ' + occupation);
    if (occupation.value == 'occupation') {
        alert("Please select occupation");
    }
    let orgName = document.querySelector('#organizationId').value;
    let currCard = document.querySelector('input[name="existingcc"]:checked').value;
    let income = document.querySelector('#incomeId').value;

    const lead = {
        customerName: name,
        customerMobile: mobile,
        customerEmail: email,
        customerPincode: pincode,
        customerPan: pan,
        customerAadhar: aadhaar,
        customerOccupation: occupation,
        customerOrgName: orgName,
        customerUsingCard: currCard,
        customerMonthlyIncome: income,
        projectName: "Credit Card",
        leadCategory: "Credit Card",
        aggregatorName: "",
        payoutState: "Not eligible",
        status: "In process",
        transactionId: "",
        payoutAmount: 0,
        dateOfSubmission: _getCurrentFirebaseTime(),
        remarks: "",
        eligibleForPayout: false
    }
    _submitLead(lead, id);
}
