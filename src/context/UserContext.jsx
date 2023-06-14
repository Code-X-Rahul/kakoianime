'use client';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState, createContext, useContext, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase";

const provider = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const UserContext = createContext();

export function useAuth() {
    return useContext(UserContext);
}


export function UserProvider({ children }) {
    const [user, setUser] = useState()

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function gLogin() {
        return signInWithPopup(auth, provider)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        });

        return () => {
            unSubscribe();
        }
    }, [])


    return (
        <UserContext.Provider value={{ user, signIn, signUp, gLogin, logout }}>
            {children}
        </UserContext.Provider>
    );
}



