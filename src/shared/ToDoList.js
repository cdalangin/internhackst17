import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View, Dimensions, ScrollView } from 'react-native'
import { format } from 'date-fns';
import { db } from '../firebase/config'
import 'firebase/firestore';
import ToDoListItem from './components/ToDoItem'

import { AuthContext } from '../screens/auth/AuthContext'
import EmptyDay from './components/EmptyDay';

const windowHeight = Dimensions.get('window').height;

export default function ToDoList(props) {
    const { user, activeDate } = useContext(AuthContext)
    const navigation = props.nav
    let userRef = db.collection("users").doc(user.uid)
    const [tasks, setTasks] = useState([]); // specific tasks for that day
    const dayString = format(activeDate, "MMMM dd, yyyy")
    const [updatedTasks, setUpdatedTasks] = useState([]) // all tasks in firebase
    const [toDoItem, setToDoItem] = useState(true)

    useEffect(() => {
        userRef.onSnapshot((doc) => {
            if (doc.exists) {

                const taskList = doc.data()["tasks"]
                setUpdatedTasks(taskList)

                const todayTasks = []
                taskList.map((task) => {
                    if (task.toComp === dayString) {
                        todayTasks.push(task)
                    }
                })

                if (todayTasks.length > 0) {
                    setTasks(todayTasks);
                    setToDoItem(false)
                } else {
                    setToDoItem(true)
                }
            } else {
                console.log("No such document!")
            }
        })
    }, [activeDate])

    const onTaskCompleted = (id) => {
        updatedTasks.map((task) => {
            let status = task["isDone"]

            if (task["key"] === id) {
                task["whenDone"] = dayString
                task["isDone"] = !status
                return task
            }

        })

        userRef.set(
            { tasks: updatedTasks },
            { merge: true }
        )

    }

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView>
                {toDoItem ?
                    <EmptyDay nav={navigation} type="todo" />
                    :
                    <View>
                        {tasks.map((task) => {
                            return (
                                <>
                                    <View key={task.key}>
                                        <ToDoListItem
                                            id={task.key}
                                            task={task.tname}
                                            isDone={task.isDone}
                                            onChange={onTaskCompleted} />
                                    </View>
                                </>
                            )
                        }
                        )
                        }
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center",
        maxHeight: windowHeight - 40
    },
})