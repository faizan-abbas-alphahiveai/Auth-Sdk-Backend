import admin from 'firebase-admin';
import path from 'path';
import { readFileSync } from 'fs';


const initializeFirebase = () => {
  try {
    
    let serviceAccount;

    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    } else {
      serviceAccount = JSON.parse(readFileSync('./auth-sdk-backend-firebase-adminsdk-fbsvc-3f46303730.json', 'utf8'));
    }

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID || 'auth-sdk-backend'
      });
    }

    console.log('Firebase Admin SDK initialized successfully');
    return admin;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
};

export { initializeFirebase, admin };
