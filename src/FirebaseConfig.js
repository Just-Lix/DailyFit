import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDjzupgWk6T80scK02BmiiBuS004qo0_Co",
  authDomain: "smartwardobe-e8f90.firebaseapp.com",
  projectId: "smartwardobe-e8f90",
  storageBucket: "smartwardobe-e8f90.appspot.com",
  messagingSenderId: "237818771356",
  appId: "1:237818771356:web:c77c4918784afbf284ba59",
  measurementId: "G-BS6SDH0YLJ",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { auth, db, collection, getDocs, addDoc, updateDoc, doc, deleteDoc, analytics };
