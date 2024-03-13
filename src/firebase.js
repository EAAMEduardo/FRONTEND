// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNlgtHEr6OYiTtxP-YfWw6FrSjRm50avE",
  authDomain: "mern-estate-8d154.firebaseapp.com",
  projectId: "mern-estate-8d154",
  storageBucket: "mern-estate-8d154.appspot.com",
  messagingSenderId: "1086124019771",
  appId: "1:1086124019771:web:ab39d0198e504e85294c1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)



export {
 app
}