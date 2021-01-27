import firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs31T1jZcg_mj4eI10T2t__FT56Yn83cQ",
  authDomain: "rn-firebase-9ca39.firebaseapp.com",
  databaseURL: "https://rn-firebase-9ca39.firebaseio.com",
  projectId: "rn-firebase-9ca39",
  storageBucket: "your-project-id-1234.appspot.com",
  messagingSenderId: "620356585802",
  appId: "1:620356585802:android:605cbd016d8a313fa859b3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
