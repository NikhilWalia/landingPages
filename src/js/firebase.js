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

const app = initializeApp(firebaseConfig);
var db = getFirestore();
var rtdb = ref(getDatabase(app));


export const _getFirestore = () => { return db; }

export const _getRtdb = () => { return rtdb; }

export const _getCurrentFirebaseTime = () => { return Timestamp.now().toDate(); }

export const _getProjectLink = (projName, callBack) => {
    get(child(rtdb, `${projName}/link`)).then((snapshot) => {

        if (snapshot.exists()) {
            console.log(snapshot.val());
            callBack(snapshot.val());
        } else {
            callBack(null);
        }
    }).catch((error) => {
        callBack(null);
    });
}

export const _submitLeadWithCallBack = (lead, id, callBack) => {
    const divLoader = document.createElement("div");
    divLoader.className = "loader";
    document.body.appendChild(divLoader);
    try{
        const leadsCol = collection(db, `/AryoDB/${id}/LeadsDB`);
        addDoc(leadsCol, lead)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            divLoader.remove();
            //show successfull message
            callBack(true);
        });
    }
    catch(err){
        console.log(err);
        callBack(false);
    }
}
export const _submitLead = (lead, id) => {

    const divLoader = document.createElement("div");
    divLoader.className = "loader";
    document.body.appendChild(divLoader);

    try{
        const leadsCol = collection(db, `/AryoDB/${id}/LeadsDB`);
        addDoc(leadsCol, lead)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            divLoader.remove();
            //show successfull message
            const successDiv = document.createElement('div');
            successDiv.className = "successmsg";
            let h2 = document.createElement('h2');
            h2.innerHTML = "Lead submitted succesfully!!";
            let img = document.createElement('img');
            img.src = 'images/ok.png';
            img.height = 35;
            img.width = 35;
            successDiv.appendChild(img);
            successDiv.appendChild(h2);
            document.body.appendChild(successDiv);
        });
    }
    catch(err){
        console.log(err);
        const errDiv = document.createElement('div');
        errDiv.className = "errormsg";
        let h2 = document.createElement('h2');
        h2.innerHTML = "Error: submitting lead, Please try again!";
        let img = document.createElement('img');
        img.className = "errimg"
        img.src = 'images/sad.png';
        img.height = 45;
        img.width = 45;
        errDiv.appendChild(img);
        errDiv.appendChild(h2);
        document.body.appendChild(errDiv);
    }
}

export const _isProjectOnHold = (name, callBack) => {
    console.log("_isProjectOnHold projName " + name);
    get(child(rtdb, `${name}/onHold`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            callBack(snapshot.val());
        } else {
            callBack(null);
        }
    }).catch((error) => {
        callBack(null);
    });
}