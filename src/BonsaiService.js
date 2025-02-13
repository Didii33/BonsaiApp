import { db, auth } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const bonsaiCollection = collection(db, "bonsais");

export const addBonsai = async (name, type, birthdate) => {
  if (!auth.currentUser) return;
  await addDoc(bonsaiCollection, {
    userId: auth.currentUser.uid,
    name,
    type,
    birthdate,
  });
};

export const getBonsais = async () => {
  if (!auth.currentUser) return [];
  const q = query(bonsaiCollection, where("userId", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
