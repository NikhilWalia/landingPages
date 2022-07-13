import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, Timestamp, query, where, setDoc, doc, DocumentReference, updateDoc } from 'firebase/firestore'
import { getDatabase, ref, child, get } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCR7CAl0XTaarMBBlkac9rT0So04hmmH7s",
    authDomain: "aryotest-7a458.firebaseapp.com",
    databaseURL: "https://aryotest-all-project-details-7a458-a767b.firebaseio.com/",
    projectId: "aryotest-7a458",
    storageBucket: "aryotest-7a458.appspot.com",
    messagingSenderId: "814626812052",
    appId: "1:814626812052:web:c78fa20629b98323248481",
    measurementId: "G-R01FFJW83G"
}

const firebaseConfigAryoProjects = {
    apiKey: "AIzaSyCR7CAl0XTaarMBBlkac9rT0So04hmmH7s",
    authDomain: "aryotest-7a458.firebaseapp.com",
    databaseURL: "https://aryoprojectdetails.firebaseio.com",
    projectId: "aryotest-7a458",
    storageBucket: "aryotest-7a458.appspot.com",
    messagingSenderId: "814626812052",
    appId: "1:814626812052:web:c78fa20629b98323248481",
    measurementId: "G-R01FFJW83G"
}

const app = initializeApp(firebaseConfig);
var db = getFirestore();
var rtdb = ref(getDatabase(app));
const rtdbAryoProjectDetails = ref(getDatabase(initializeApp(firebaseConfigAryoProjects, 'secondry')))


export const _getFirestore = () => { return db; }

export const _getRtdb = () => { return rtdb; }

export const _getCurrentFirebaseTime = () => { 

    return Timestamp.now().toDate();
 }

export const _getAryoProjectLink = (path, callBack) => {

    get(child(rtdbAryoProjectDetails, `${path}/LINK`)).then((snapshot) => {

        if (snapshot.exists()) {
            // console.log("links -> ", snapshot.val());
            callBack(snapshot.val());
        } else {
            callBack(null);
        }
    }).catch((error) => {
        callBack(null);
    });

}

export const _getProjectLink = (projName, callBack) => {
    // console.log("link at ", projName);
    get(child(rtdb, `${projName}/LINK`)).then((snapshot) => {

        if (snapshot.exists()) {
            // console.log("links -> ", snapshot.val());
            callBack(snapshot.val());
        } else {
            callBack(null);
        }
    }).catch((error) => {
        callBack(null);
    });
}

export const _submitLeadWithCallBack = async (lead, id, callBack) => {
    const divLoader = document.createElement("div");
    divLoader.className = "loader";
    document.body.appendChild(divLoader);
    //check if lead already exist
    const leadRef = collection(db, `/AryoDB/${id}/LeadsDB`);
    // console.log("projectname ", lead.projectName, " mobile ", lead.customerMobile)
    const q = query(leadRef, where("projectName", "==", lead.projectName)
        , where("customerMobile", "==", lead.customerMobile));
    const querySnapshot = await getDocs(q);
    console.log("day  ", Timestamp.now().toDate().toDateString())
    // setDoc(doc(db, 'WorkingAgentsDB', id), {
    //     dateOfSubmission: Timestamp.now().toDate()
    // })
    //     .then(docref => {
            if (querySnapshot.size > 0) {
                querySnapshot.forEach((docRef) => {
                    // console.log("-> ", docRef.id, " => ", docRef.data());
                    const leadDocRef = doc(db, `/AryoDB/${id}/LeadsDB`, `${docRef.id}`);
                    updateDoc(leadDocRef,
                        {
                            customerName: lead.customerName,
                            customerEmail: lead.customerEmail,
                            customerPincode: lead.customerPincode,
                        }
                    ).then(_doc => {
                        // console.log("Document updated with ID: dref ", docRef.id)
                        callBack(true);
                    })
                });
            } else {
                try {
                    const leadsCol = collection(db, `/AryoDB/${id}/LeadsDB`);
                    addDoc(leadsCol, lead)
                        .then((docRef) => {
                            // console.log("Document written with ID: ", docRef.id);
                            divLoader.remove();
                            //show successfull message
                            callBack(true);
                            
                            const aryoLeadsCol = doc(db, `/AryoLeadsDB/`, `${docRef.id}`);
                            setDoc(aryoLeadsCol, lead).then(docRef=>{
                                console.log("aryoLeadsDB updated");
                            })
                        });

                }
                catch (err) {
                    // console.log(err);
                    callBack(false);
                }
            }
        // })

}

export const _submitLeadToAryoLeadsDBCallBack = async (lead, id, callBack) => {

    const divLoader = document.createElement("div");
    divLoader.className = "loader";
    document.body.appendChild(divLoader);
    //check if lead already exist
    const leadRef = collection(db, `AryoLeadsDB`);
    // console.log("projectname ", lead.projectName, " mobile ", lead.customerMobile)
    const q = query(leadRef, where("projectName", "==", lead.projectName)
        , where("customerMobile", "==", lead.customerMobile)
        , where("agentId", "==", lead.agentId));
    const querySnapshot = await getDocs(q);
    console.log("day  ", Timestamp.now().toDate().toDateString())

            if (querySnapshot.size > 0) {
                querySnapshot.forEach((docRef) => {
                    // console.log("-> ", docRef.id, " => ", docRef.data());
                    const leadDocRef = doc(db, `AryoLeadsDB`, `${docRef.id}`);
                    updateDoc(leadDocRef,
                        {
                            customerName: lead.customerName,
                            customerEmail: lead.customerEmail,
                            customerPincode: lead.customerPincode,
                        }
                    ).then(_doc => {
                        // console.log("Document updated with ID: dref ", docRef.id)
                        divLoader.remove();
                        callBack(true);
                    })
                });
            } else {
                try {

                    const aryoLeadsCol = collection(db, `/AryoLeadsDB/`);
                    addDoc(aryoLeadsCol, lead).then(docRef=>{
                        console.log("lead submitted ");
                        divLoader.remove();
                        callBack(true);
                    })
                }
                catch (err) {
                    // console.log(err);
                    divLoader.remove();
                    callBack(false);
                }
            }
}

export const _submitLead = (lead, id) => {

    const divLoader = document.createElement("div");
    divLoader.className = "loader";
    document.body.appendChild(divLoader);

    try {
        const leadsCol = collection(db, `/AryoDB/${id}/LeadsDB`);
        addDoc(leadsCol, lead)
            .then((docRef) => {
                // console.log("Document written with ID: ", docRef.id);
                divLoader.remove();
                //show successfull message
                const successDiv = document.createElement('div');
                successDiv.className = "successmsg";
                let h2 = document.createElement('h2');
                h2.innerHTML = "Lead submitted succesfully!!";
                let img = document.createElement('img');
                img.src = 'images/ok_new.png';
                img.height = 35;
                img.width = 35;
                successDiv.appendChild(img);
                successDiv.appendChild(h2);
                document.body.appendChild(successDiv);
            });
    }
    catch (err) {
        // console.log(err);
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
    // console.log("_isProjectOnHold projName " + name);
    get(child(rtdb, `${name}/ONHOLD`)).then((snapshot) => {
        if (snapshot.exists()) {
            // console.log(snapshot.val());
            callBack(snapshot.val());
        } else {
            callBack(null);
        }
    }).catch((error) => {
        callBack(null);
    });
}

export const _getSubId = (prefix) => {
    
    return (prefix + Timestamp.now().toJSON().seconds + 
        Timestamp.now().toJSON().nanoseconds.toString().substring(0, 3));
    
}