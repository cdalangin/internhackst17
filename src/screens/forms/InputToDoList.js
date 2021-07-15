import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, Button, TouchableOpacity, View, ScrollView } from 'react-native'
import ToDoList from '../../shared/ToDoList'
import styles from './formstyle';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { db, auth } from '../../firebase/config'
import { AuthContext } from '../auth/AuthContext';

export default function InputToDoList({ navigation }) {
    const [toDoItem, setToDoItem] = useState("")
    const { user } = useContext(AuthContext)

    const submitTask = () => {
        var userDoc = db.collection('users').doc(user.uid)

        userDoc.update({
            tasks: firebase.firestore.FieldValue.arrayUnion(toDoItem)
        }).then(setToDoItem(""))
    }

    const nextScreen = () => {
        // TODO: If new user, go to input todolist, else, go back to main page
        navigation.navigate("Weekly View", { screen: "HomeWeekly" })
    }


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Input To Do List</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setToDoItem(text)}
                value={toDoItem}
                placeholder="Name of Task"
            />

            <View>
                <Button title="Add Task" onPress={submitTask} />
            </View>

            <View>
                <Button title="Next" onPress={nextScreen} />
            </View>


            {/* Plan: As users add tasks, it will show up at the bottom of the screen */}
            <ToDoList />
        </ScrollView>
    )
}
