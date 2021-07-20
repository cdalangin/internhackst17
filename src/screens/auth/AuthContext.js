import React, { createContext, useState } from 'react'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db, auth } from '../../firebase/config'
import { useEffect } from 'react/cjs/react.development';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState([])

    if (user) {
        // useEffect(() => {
        const userRef = db.collection("users").doc(user.uid)
        userRef.onSnapshot((doc) => {
            if (doc.exists) {
                const allData = doc.data()
                setUserData(allData)
            } else {
                console.log("No such document!")
            }
        })
        // }, [userData])

    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                userData,
                login: (email, password) => {
                    auth.signInWithEmailAndPassword(email, password)
                    // .then((res) => {
                    //     const uid = res.user.uid
                    //     const usersRef = db.collection('users')
                    //     usersRef
                    //         .doc(uid)
                    //         .get()
                    //         .then((firestoreDocument) => {
                    //             if (firestoreDocument.exists) {
                    //                 const userData = firestoreDocument.data()
                    //             } else {
                    //                 alert("User does not exist anymore.")
                    //                 return;
                    //             }
                    //         })
                    //         .catch(error => {
                    //             alert(error)
                    //         });
                    // })
                    // .catch(error => {
                    //     alert(error)
                    // })
                },
                register: (fullName, email, password, confirmPassword) => {
                    if (password !== confirmPassword) {
                        alert("Error: Passwords don't match.")
                        return
                    } else {
                        auth.createUserWithEmailAndPassword(email, password)
                            .then((res) => {
                                const uid = res.user.uid
                                const data = {
                                    id: uid,
                                    email,
                                    fullName,
                                };
                                const usersRef = db.collection('users')
                                usersRef
                                    .doc(uid)
                                    .set(data)
                                    .then(() => {
                                        console.log("signed up!")
                                    })
                                    .catch((error) => {
                                        alert(error)
                                    });
                            })
                            .catch((error) => {
                                alert(error)
                            })
                    }
                },
                logout: () => {
                    auth.signOut()
                    // .then(() => {
                    //     console.log('logged out')
                    // }).catch((error) => {
                    //     console.log(error.message)
                    // })
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}
