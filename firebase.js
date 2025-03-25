// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYY96N3JxeuODeaqkKCKfFgXs9P3WJHNs",
  authDomain: "chomp-course.firebaseapp.com",
  projectId: "chomp-course",
  storageBucket: "chomp-course.firebasestorage.app",
  messagingSenderId: "1064522943549",
  appId: "1:1064522943549:web:8024a44eb7fc5bbadd6e54",
  measurementId: "G-42HZWG9DKZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);


export { auth, db, app, database, storage };