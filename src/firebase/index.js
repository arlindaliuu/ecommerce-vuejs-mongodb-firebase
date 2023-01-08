import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDhsaUd4YdDZqFGpY1GYXGRfX7T68qh-ho",
    authDomain: "e-commerce-d7663.firebaseapp.com",
    projectId: "e-commerce-d7663",
    storageBucket: "e-commerce-d7663.appspot.com",
    messagingSenderId: "723100336428",
    appId: "1:723100336428:web:e7266fbad1be14a375ac89",
    measurementId: "G-SM7L5C1RS4"
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  export { auth };