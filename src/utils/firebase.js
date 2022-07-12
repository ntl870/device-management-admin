import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDzPt47358FEtBw-SpVKNhzc5eGvrpnWSk",
  authDomain: "device-management-admin.firebaseapp.com",
  projectId: "device-management-admin",
  storageBucket: "device-management-admin.appspot.com",
  messagingSenderId: "173978718347",
  appId: "1:173978718347:web:00be816a34f951dcc1448e",
};

const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
