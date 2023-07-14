'use client';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState, createContext, useContext, useEffect } from "react";
// import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase";

import { Account, Client, ID } from 'appwrite';


const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('kakoianime2003');


const account = new Account(client);





// const provider = new GoogleAuthProvider();

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

const UserContext = createContext();

export function useAuth() {
    return useContext(UserContext);
}


export function UserProvider({ children }) {
    const [user, setUser] = useState()

    // function signUp(email, password) {
    //     return createUserWithEmailAndPassword(auth, email, password)
    // }

    // const signIn = (email, password) => {
    //     return signInWithEmailAndPassword(auth, email, password)
    // }

    // function gLogin() {
    //     return signInWithPopup(auth, provider)
    // }

    // const logout = () => {
    //     return signOut(auth)
    // }

    // useEffect(() => {
    //     const unSubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setUser(user)
    //         } else {
    //             setUser(null)
    //         }
    //     });

    //     return () => {
    //         unSubscribe();
    //     }
    // }, [])



    const create = async (email, password, name) => {

        const CreateUser = account.create(
            ID.unique(),
            email,
            password,
            name
        );

        try {
            const createdUser = await CreateUser
            console.table(createdUser);
            console.log(createdUser);
        } catch (error) {
            throw error
        }

    }
    const LogInUser = async (email, password) => {

        const LogInUser = account.createEmailSession(
            email,
            password,
        );

        try {
            const LoggedUser = await LogInUser
            console.log(LoggedUser);
            setUser(LoggedUser)
        } catch (error) {
            throw error
        }

    }

    const getUser = async () => {
        try {
            const data = await account.get();
            setUser(data)
            console.log(data);
        } catch (error) {
            return
        }
    }
    useEffect(() => {
        getUser();
        return () => {
            getUser();
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, create, LogInUser }}>
            {children}
        </UserContext.Provider>
    );
}



