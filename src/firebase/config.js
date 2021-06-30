import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUDrjiMCQfSjm-QzJyrByr6GmtpwlWjIw",
  authDomain: "internhackst17.firebaseapp.com",
  projectId: "internhackst17",
  storageBucket: "internhackst17.appspot.com",
  messagingSenderId: "1039522337384",
  appId: "1:1039522337384:web:70c83d701d46a56fbb21dd"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore()
const auth = firebase.auth()

export { db, auth }