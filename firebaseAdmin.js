// lib/firebaseAdmin.js
import admin from 'firebase-admin';

// Ensure you have a service account JSON file downloaded from your Firebase project
const serviceAccount = require('');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://<YOUR-FIREBASE-PROJECT-ID>.firebaseio.com', // Adjust this URL accordingly
  });
}

const db = admin.firestore(); // If you're using Firestore

export { admin, db };
