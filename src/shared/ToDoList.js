import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View, Dimensions, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import styles from '../screens/main/styles/homestyle';
import { db, auth } from '../firebase/config'
import ToDoListItem from './components/ToDoItem'

import { AuthContext } from '../screens/auth/AuthContext'
import EmptyDay from './components/EmptyDay';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ToDoList({ navigation, route }) {
    const { user } = useContext(AuthContext)
    const { todayTasks } = route.params
    const [tasks, setTasks] = useState([])
    const [toDoItem, setToDoItem] = useState(true)

    if (todayTasks === "None") {
        return (
            <View style={styles.main}>
                <EmptyDay nav={navigation} type="daily" />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView>

                {todayTasks.map((task) => {
                    return (
                        <>
                            {/* <Text>{task}</Text> */}
                            <View key={task.id}>
                                <ToDoListItem
                                    key={task.id}
                                    task={task.tname} />
                            </View>
                        </>
                    )
                }
                )
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