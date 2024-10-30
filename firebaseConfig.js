// lib/firebaseConfig.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';


/*
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
*/

const firebaseConfig = {
  apiKey: "AIzaSyA86tDTFZ3MlfOnkOIVC5-rEJv3eIKKe8Y", // Ensure this matches your Firebase Console
  authDomain: "bargainbuddy-99abb.firebaseapp.com", // Ensure this matches your Firebase Console
  projectId: "bargainbuddy-99abb", // Ensure this matches your Firebase Console
  storageBucket: "bargainbuddy-99abb.appspot.com", // Optional, but check
  messagingSenderId: "735437299454", // Ensure this matches your Firebase Console
  appId: "1:735437299454:web:f37a51ceeeef48a291cfaf", // Ensure this matches your Firebase Console
  measurementId: "G-LQKS57DWDE" // Optional, only if you're using Google Analytics
};



// Initialize Firebase
const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

// Export the services you need
export const auth = getAuth(app);
export default app;