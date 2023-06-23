import * as admin from 'firebase-admin';

// Initialize the Firebase Admin SDK with your project credentials
const serviceAccount = require('../key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Get a reference to the Firestore database
export const firestore = admin.firestore();

export const firestoreInstance = firestore;