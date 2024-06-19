import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDE5aFFbOteAvKPkdDWOOx16XR74iLhjJ0",
    authDomain: "evently-5a1ee.firebaseapp.com",
    projectId: "evently-5a1ee",
    storageBucket: "evently-5a1ee.appspot.com",
    messagingSenderId: "961251963937",
    appId: "1:961251963937:web:aa708d4a9dc9477df69f60",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
