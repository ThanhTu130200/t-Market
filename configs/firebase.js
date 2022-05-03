import firebase from "firebase/app";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRvGDGH63PNaKX4ZKpv4fhS0Mc4xlIWtk",
  authDomain: "t-market-2b11c.firebaseapp.com",
  projectId: "t-market-2b11c",
  storageBucket: "t-market-2b11c.appspot.com",
  messagingSenderId: "1017269412807",
  appId: "1:1017269412807:web:efd112e5965392e741afe2",
  measurementId: "G-1DPQBXLN3C",
};

const app = firebase.initializeApp(firebaseConfig);

const projectFirestore = getFirestore(app);

const projectAuth = getAuth();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { app, projectAuth, projectFirestore, projectAuth, timestamp };
