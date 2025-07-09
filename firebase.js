// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase configuration (Your project's actual credentials)
const firebaseConfig = {
  apiKey: "AIzaSyCInD5L_WWTX9bD1sEOfkCdTt3sdGSeCo4",
  authDomain: "earngati-gpay-system.firebaseapp.com",
  databaseURL: "https://earngati-gpay-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "earngati-gpay-system",
  storageBucket: "earngati-gpay-system.appspot.com",
  messagingSenderId: "729473631351",
  appId: "1:729473631351:web:354f01b5fe32a4fe843272",
  measurementId: "G-7VT4TGL3N4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
