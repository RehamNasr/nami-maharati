// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <-- تحتاج إلى استيراد هذه الدالة

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEDIUxkovrA0zfI5NgztHaLZpMTfJce1w",
  authDomain: "nami-maharat.firebaseapp.com",
  projectId: "nami-maharat",
  storageBucket: "nami-maharat.appspot.com", // <-- تصحيح هنا (يجب أن يكون .appspot.com بدلاً من .app)
  messagingSenderId: "551978782342",
  appId: "1:551978782342:web:b3597b8b5b2de01bff8b07",
  measurementId: "G-1PJ7P08575"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app); // <-- هذا هو تعريف db المطلوب

// تصدير db والخدمات الأخرى التي قد تحتاجها
export { db, app, analytics };