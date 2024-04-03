// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCipyhzG0hPAX2-FjDpaVX5NkD2o2Hd_uI",
  authDomain: "from-37eb1.firebaseapp.com",
  projectId: "from-37eb1",
  storageBucket: "from-37eb1.appspot.com",
  messagingSenderId: "64571307863",
  appId: "1:64571307863:web:10854c60493f982a003012"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;