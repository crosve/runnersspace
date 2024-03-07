import admin from 'firebase-admin';
import { fireConfig } from './fireconfig';

try {
  admin.initializeApp({
    credential: admin.credential.cert(fireConfig),
  });
  console.log('Firebase Admin initialized.');
} catch (error) {

  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error:', error.stack);
  }
}

export const db = admin.firestore(); // Initialize Firestore

export default admin;
