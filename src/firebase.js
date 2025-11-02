// src/firebase.js

const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("./config/firebaseServiceKey.json");

// Initialize Firebase Admin
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: "medinest-20.appspot.com" 
  // Example: "medinest-health-app.appspot.com"
});

const bucket = firebaseAdmin.storage().bucket();

module.exports = bucket;
