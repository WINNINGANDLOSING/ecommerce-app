// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyDlUJOnOtHyERwJcdfUuOhvYwFFxH7B_Qw',
  authDomain: 'reactnative-simpleloginapp.firebaseapp.com',
  projectId: 'reactnative-simpleloginapp',
  storageBucket: 'reactnative-simpleloginapp.firebasestorage.app',
  messagingSenderId: '320162360696',
  appId: '1:320162360696:web:a9dc9d1f500750a818ac8d',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
