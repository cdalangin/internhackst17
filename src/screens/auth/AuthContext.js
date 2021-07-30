import React, { createContext, useState, useEffect } from 'react'
import 'firebase/firestore';
import format from 'date-fns/format'
import { db, auth } from '../../firebase/config'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [activeDate, setActiveDate] = useState(new Date())

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                activeDate,
                setActiveDate,
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
                                    joined: format(new Date(), "MMMM dd, yyyy"),
                                    tasks: [],
                                    events: [],
                                    taskCT: 1,
                                    eventCT: 1
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
