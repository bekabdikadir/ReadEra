import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1hfSVDByNR16YYf5YW57ZXzCZpGU0VTs",
  authDomain: "readera-636cf.firebaseapp.com",
  projectId: "readera-636cf",
  storageBucket: "readera-636cf.appspot.com",
  messagingSenderId: "265245970113",
  appId: "1:265245970113:web:d28d64788cbd4a71f38e40",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
