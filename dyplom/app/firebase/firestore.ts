import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebaseConfig";

export const db = getFirestore(app);
