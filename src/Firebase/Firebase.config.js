// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBp_JHr3A3BfUbRk-7bs_XykKmqV1rjjBw",
  authDomain: "simple-firebase-project-3b0bb.firebaseapp.com",
  projectId: "simple-firebase-project-3b0bb",
  storageBucket: "simple-firebase-project-3b0bb.appspot.com",
  messagingSenderId: "396051736766",
  appId: "1:396051736766:web:7b8e064445c0bc6b5ed6ef",
  measurementId: "G-K08ZG1T900"
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