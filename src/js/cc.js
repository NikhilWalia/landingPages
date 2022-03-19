import { initializeApp } from '@firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database'
import { _getFirestore, _submitLead, _getCurrentFirebaseTime, _submitLeadWithCallBack } from './firebase'
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
const id = uid.substring(0, uid.length);
console.log("uid :", id);
const pincode = document.getElementById('pincodeId');

pincode.addEventListener('input', function () {
    console.log(this.value);
    if (this.value.length == 6) {
        const divLoader = document.createElement("div");
        divLoader.className = "loader";
        document.body.appendChild(divLoader);
        get(child(ccRtdb, `CCPINCODES`)).then((snapshot) => {
            let subBtn = document.getElementById('submitleadId');
            if (snapshot.exists()) {
                console.log(snapshot.val().includes(this.value));
                if (!snapshot.val().includes(this.value)) {
                    //show error message
                    console.log("show error !")
                    subBtn.disabled = true;
                    // form.disable = true;
                    divLoader.remove();
                    const errDiv = document.createElement('div');
                    errDiv.className = "errormsg";
                    let h2 = document.createElement('h2');
                    h2.innerHTML = "Sorry we can not issue credit card at this pincode";
                    let img = document.createElement('img');
                    let btn = document.createElement('button');
                    btn.innerText = "Ok";
                    btn.id = "OkId";
                    img.className = "errimg"
                    img.src = 'images/sad.png';
                    img.height = 45;
                    img.width = 45;
                    errDiv.appendChild(img);
                    errDiv.appendChild(h2);
                    errDiv.appendChild(btn);
                    document.body.appendChild(errDiv);
            
                    document.getElementById('OkId').addEventListener('click', () => {
                        console.log('onclick')
                        // window.location.reload();
                        let pincode = document.getElementById('pincodeId');
                        pincode.value = "";
                        subBtn.disabled = false;
                        errDiv.remove();
                    })
                }
                else {
                    divLoader.remove();
                    // subBtn.disabled = false;
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
    _submitLeadWithCallBack(lead, id, result);
}

function result(output) {
    console.log("output ", output);
    if (output) {
        //show successfull message
        const successDiv = document.createElement('div');
        successDiv.className = "successmsg";
        let h2 = document.createElement('h2');
        h2.innerHTML = "Thank you for submitting your details\nyou will be contacted shortly to help complete your credit card application process";
        let img = document.createElement('img');
        img.id = "okimgId"
        img.src = 'images/ok_new.png';
        img.height = 35;
        img.width = 35;
        let btn = document.createElement('button');
        btn.innerHTML = "Ok";
        btn.id = "okbtnId";
        successDiv.appendChild(img);
        successDiv.appendChild(h2);
        successDiv.appendChild(btn);
        document.body.appendChild(successDiv);
        document.getElementById('okbtnId').addEventListener('click', () => {
            console.log('onclick')
            window.location.reload();
        })
    }
    else {
        if (!alert("Something went wrong, please try again!!")) { window.location.reload(); }
    }

}
