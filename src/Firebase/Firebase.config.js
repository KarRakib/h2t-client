// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_SOME_KEY_apiKey,
  authDomain: import.meta.env.VITE_SOME_KEY_authDomain,
  projectId: import.meta.env.VITE_SOME_KEY_projectId,
  storageBucket: import.meta.env.VITE_SOME_KEY_storageBucket,
  messagingSenderId: import.meta.env.VITE_SOME_KEY_messagingSenderId,
  appId: import.meta.env.VITE_SOME_KEY_appId,
  measurementId: import.meta.env.VITE_SOME_KEY_measurementId,
};
// const firebaseConfig = {
//   apiKey: import.meta.env.apiKey,
//   authDomain: import.meta.env.authDomain,
//   projectId: import.meta.env.projectId,
//   storageBucket: import.meta.env.storageBucket,
//   messagingSenderId: import.meta.env.messagingSenderId,
//   appId: import.meta.env.appId,
//   measurementId: import.meta.env.measurementId
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app