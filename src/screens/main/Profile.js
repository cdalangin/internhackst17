import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import styles from './styles/homestyle'; <= add css
import { db, auth } from '../../firebase/config'
import { AuthContext } from "../auth/AuthContext"

export default function Profile({ navigation }) {
    const { user, logout } = useContext(AuthContext)

    // useEffect(() => {
    //     const userRef = db.collection("users").doc(user.uid)
    //     userRef.onSnapshot((doc) => {
    //         if (doc.exists) {
    //             const taskList = doc.data()["tasks"]
    //             setTasks(taskList)

    //             const eventsList = doc.data()["events"]
    //             setEvents(eventsList)
    //         } else {
    //             console.log("No such document!")
    //         }
    //     })
    // }, [])

    return (
        <View>
            <Text>Profile</Text>
            <TouchableOpacity onPress={() => logout(navigation)}>
                <Text>LogOut</Text>
            </TouchableOpacity>
        </View>
    )
}