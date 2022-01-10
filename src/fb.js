import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);
const authService = getAuth();
const createUser = createUserWithEmailAndPassword;
const signIn = signInWithEmailAndPassword;
const authStateChanged = onAuthStateChanged;
const googleAuthProvider = GoogleAuthProvider;
const loginWithRedirect = signInWithRedirect;
const getResult = getRedirectResult;

const dbService = getFirestore();
const storageService = getStorage();

export {
  authService,
  createUser,
  signIn,
  authStateChanged,
  googleAuthProvider,
  loginWithRedirect,
  getResult,
  dbService,
  storageService,
};
