import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEPoUkMuLzWSc8NULuKYQvW5GT02VcU3A",
  authDomain: "event-managing-82ae4.firebaseapp.com",
  projectId: "event-managing-82ae4",
  storageBucket: "event-managing-82ae4.firebasestorage.app",
  messagingSenderId: "1040587539636",
  appId: "1:1040587539636:web:0f291159574637d91c83e1",
  measurementId: "G-DQKDFH5813"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };