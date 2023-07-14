"use client";
import { createContext, useContext } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DbContext = createContext<any>(null);

export function useAuth() {
  return useContext(DbContext);
}

export function DbProvider({ children }: any) {
  const addToWatchlist = async (collection: any, data: any) => {
    try {
      const docRef = await addDoc(collection(db, collection), data);
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  
  return <DbContext.Provider value={{addToWatchlist}}>{children}</DbContext.Provider>;
}
