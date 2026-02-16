import { getStorage } from "firebase/storage";
import { app } from "../firebase/firebaseConfig";

export const storage = getStorage(app);
