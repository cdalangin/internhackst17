import { map } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import styles from '../screens/main/styles/homestyle';
import { db, auth } from '../firebase/config'
import ToDoListItem from './components/ToDoItem'

import { AuthContext } from '../screens/auth/AuthContext'

export default function ToDoList({ navigation }) {
    const { user } = useContext(AuthContext)
    const [tasks, setTasks] = useState([])

    const userRef = db.collection("users").doc(user.uid)

    // userRef.get().then((doc) => {
    //     if (doc.exists) {
    //         setTasks(doc.data()["tasks"])
    //     } else {
    //         console.log("No such document!")
    //     }
    // })

    userRef.onSnapshot((doc) => {
        if (doc.exists) {
            const taskList = doc.data()["tasks"]
            setTasks(taskList)
        } else {
            console.log("No such document!")
        }
    })

    return (
        <KeyboardAwareScrollView>
            <Text style={styles.title}>TODO LIST</Text>
            {
                tasks.map((task) => {
                    return (
                        <>
                            {/* <Text>{task}</Text> */}
                            <ToDoListItem
                                id={task.key}
                                task={task} />
                        </>
                    )

                }
                )
            }
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        display: "flex",
        alignSelf: "center",
        backgroundColor: "white",
        padding: 10,
        margin: 20
    }
})