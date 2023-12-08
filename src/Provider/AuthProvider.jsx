import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/firebase.config';
import { getRole } from '../API/auth';
import { da } from 'date-fns/locale';
import axios from 'axios';


export const AuthContext = new createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        if (user) {
            getRole(user.email)
                .then(data => setRole(data))
        }
    }, [user])

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const resetPassword = email => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email)
    }

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem('access-token');
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                axios.post('http://localhost:5000/jwt', {
                    email: currentUser?.email
                }).then(data => {
                    console.log(data.data.token);
                    localStorage.setItem('access-token', data.data.token)
                    setLoading(false)
                })
            } else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            console.log('current user:', currentUser);

        })

        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        resetPassword,
        logOut,
        updateUserProfile,
        role,
        setRole
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;