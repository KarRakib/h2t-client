import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import app from '../Firebase/Firebase.config';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, updateProfile } from 'firebase/auth';
import { useEffect } from 'react';
// eslint-disable-next-line react-refresh/only-export-components
export const auth = getAuth(app)
export const UserContext = createContext()
// eslint-disable-next-line react/prop-types
const AuthContext = ({ children }) => {
    const [user, setUser] = useState()
    const [loader, setLoader] = useState(true)
    // const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const userRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const userLogIn =(email,password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
           console.log('check Auth',currentUser);
        //    if(currentUser===null || currentUser.emailVerified){
        //        setUser(currentUser)
        //    }
        setUser(currentUser)
            setLoader(false)
        });
        return ()=>unsubscribe
    }, [])
    const upDateUser= (name,photo)=>{
        console.log(name,photo);
        return updateProfile(auth.currentUser, {
            displayName:name, photoURL:photo
          })
    }
    const emailVerify = () =>{
        sendEmailVerification(auth.currentUser)
    }
    const restPassword = (email) =>{
        return sendPasswordResetEmail(auth,email)
    }
    // const signInGoogle =()=>{
    //     return signInWithPopup(auth,googleProvider)
    // }
    const signInFacebook =()=>{
        return signInWithPopup(auth,facebookProvider)
    }
    const userSignOut = () =>{
       window.localStorage.clear()
        return signOut(auth)

    }
    const userValue = { user,userRegister,userLogIn,loader,setLoader,upDateUser,emailVerify,restPassword,signInFacebook ,userSignOut}
    return (
        <UserContext.Provider value={userValue}>
            {children}
        </UserContext.Provider>
    );
};

export default AuthContext;