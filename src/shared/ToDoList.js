import { map } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import styles from '../screens/main/styles/homestyle';
import { db, auth } from '../firebase/config'
import ToDoListItem from './components/ToDoItem'

import { AuthContext } from '../screens/auth/AuthContext'
import EmptyItem from './components/EmptyDay';

export default function ToDoList({ navigation }) {
    const { user } = useContext(AuthContext)
    const [tasks, setTasks] = useState([])
    const [toDoItem, setToDoItem] = useState(true)

    useEffect(() => {
        const userRef = db.collection("users").doc(user.uid)

        userRef.onSnapshot((doc) => {
            if (doc.exists) {
                const taskList = doc.data()["tasks"]
                if (taskList.length === 0) {
                    setToDoItem(true)
                } else {
                    setTasks(taskList)
                    setToDoItem(false)
                }
            } else {
                console.log("No such document!")
            }
        })

    }, [])

    if (tasks.length > 0) {
        setToDoItem(false)
    } else {
        setToDoItem(true)
    }
    return (
        <KeyboardAwareScrollView>
            {/* <Text style={styles.title}>TODO LIST</Text> */}
            {toDoItem ?
                <View>
                    {tasks.map((task) => {
                        return (
                            <>
                                {/* <Text>{task}</Text> */}
                                <View key={task.id}>
                                    <ToDoListItem
                                        key={task.id}
                                        task={task} />
                                </View>
                            </>
                        )
                    }
                    )
                    }
                </View>
                :
                <EmptyDay nav={navigation} type="weekly" type2="toDoItem" />

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