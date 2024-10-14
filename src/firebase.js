// Importa solo las funciones que necesitas
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importa Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Importa Firestore

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAB2Hsk39vgAUrPymqaI41kdaTD5-kPpuU",
  authDomain: "control-de-gastos-767c7.firebaseapp.com",
  projectId: "control-de-gastos-767c7",
  storageBucket: "control-de-gastos-767c7.appspot.com",
  messagingSenderId: "466650032296",
  appId: "1:466650032296:web:447b22476aa659d389fa9d",
  measurementId: "G-31BV16FF0Z"
};

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializa Firestore
const auth = getAuth(app); // Inicializa Firebase Authentication

export { db, auth }; // Exporta Firestore y Authentication




// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {

//     // Permitir solo a usuarios autenticados leer y escribir sus propios documentos
//     match /usuarios/{userId} {
//       allow read, write: if request.auth != null && request.auth.uid == userId;
//     }

//     // Permitir que todos los usuarios autenticados lean y escriban en la colección "gastos"
//     match /gastos/{documentId} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }