import firebase from 'firebase/app';
import 'firebase/auth';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLICK_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLICK_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLICK_FIREBASE_PROJECT_ID,
  });
}

export default firebase;
