import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9fsoMG1iGcUyQuYcdGIsWgh9QEvFVsF0",
  authDomain: "animal-5a91c.firebaseapp.com",
  projectId: "animal-5a91c",
  storageBucket: "animal-5a91c.firebasestorage.app",
  messagingSenderId: "454923787942",
  appId: "1:454923787942:web:091b7f289ec38f7d32de67",
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage=getStorage(app);
