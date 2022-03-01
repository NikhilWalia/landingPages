import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, Timestamp } from 'firebase/firestore'
import { getDatabase, ref, child, get } from 'firebase/database'

const ccConfig = {
    databaseURL: "https://aryotest-ccpincodes-12bc8.firebaseio.com/"
  }

  const ccApp = initializeApp(ccConfig);
  const ccRtdb = ref(getDatabase(ccApp));

  const picode = document.getElementById('pincodeId');
  console.log("entered pincode :" + picode)
  get(child(ccRtdb, `CCPINCODES`)).then((snapshot) => {
  
      if (snapshot.exists()) {
          console.log(snapshot.val());
      
          
      } else {
          console.log("No data available");
          alert("Error fetching details, please try again!");
      }
  }).catch((error) => {
      console.error(error);
      alert("Error submitting your lead, please try again!");
  });


