import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6DdQICeizv1GAXpx3rmGZ_iWbLhth-SE",
  authDomain: "vistaar-21f2d.firebaseapp.com",
  projectId: "vistaar-21f2d",
  storageBucket: "vistaar-21f2d.firebasestorage.app",
  messagingSenderId: "300723949001",
  appId: "1:300723949001:web:6de1be8c14ab83deceac18",
  measurementId: "G-PQCG8VQST0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
