// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUZVMxkbckE6MVyxAwhlrBYv1pdlq2hK0",
  authDomain: "victory-bg-project.firebaseapp.com",
  projectId: "victory-bg-project",
  storageBucket: "victory-bg-project.appspot.com",
  messagingSenderId: "365695827580",
  appId: "1:365695827580:web:381b594114b7d12d4c93f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
