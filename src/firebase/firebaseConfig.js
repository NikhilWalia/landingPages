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

initializeApp(firebaseConfig)