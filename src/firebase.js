// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlI1xrq_UsORZQyV98HT-9WqS3KrpvCWk",
  authDomain: "blog-system-fca95.firebaseapp.com",
  projectId: "blog-system-fca95",
  storageBucket: "blog-system-fca95.firebasestorage.app",
  messagingSenderId: "456576120469",
  appId: "1:456576120469:web:6cef0979d4311175d7cd9c",
  measurementId: "G-VGCFPLT3CH"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export default { app, auth, db,storage };

