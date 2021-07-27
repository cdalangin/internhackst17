import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, Button, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import format from 'date-fns/format'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from './formstyle';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '../../firebase/config'
import { AuthContext } from '../auth/AuthContext';

export default function InputToDoList({ navigation }) {
    const { user, activeDate } = useContext(AuthContext)
    const formatDate = format(activeDate, "MMMM dd, yyyy")

    const [taskCT, setTaskCT] = useState(0);

    useEffect(() => {
        const userRef = db.collection("users").doc(user.uid)

        userRef.onSnapshot((doc) => {
            if (doc.exists) {
                const tcount = doc.data()["taskCT"]
                setTaskCT(tcount)

            } else {
                console.log("No such document!")
            }
        })

    }, [])

    const initialState = {
        "key": "task" + taskCT,
        "tname": "",
        "isDone": false,
        "toComp": format(activeDate, "MMMM dd, yyyy"),
        "whenDone": ""
    }

    const [displayDate, setDisplayDate] = useState(formatDate)
    const [toDoItem, setToDoItem] = useState(initialState)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmDate = (date) => {
        const format_date = format(date, "MMMM dd, yyyy")

        setDisplayDate(format_date)
        setToDoItem(prevState => ({ ...prevState, "toComp": format_date, "key": "task" + taskCT }))
        hideDatePicker();
    };


    const submitTask = () => {
        if (toDoItem["tname"] == "") {
            alert("Please input a task.")
        } else {
            var userDoc = db.collection('users').doc(user.uid)

            userDoc.update({
                tasks: firebase.firestore.FieldValue.arrayUnion(toDoItem),
                taskCT: firebase.firestore.FieldValue.increment(1)
            })
            setToDoItem(initialState)
        }

    }

    const nextScreen = () => {
        navigation.navigate("Weekly View", { screen: "HomeWeekly" })
    }


    return (
        <KeyboardAwareScrollView style={styles.container}>
            <Text style={styles.title}>Input To Do List</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setToDoItem(prevState => ({ ...prevState, "tname": text }))}
                value={toDoItem["tname"]}
                placeholder="Name of Task"
            />

            <View>
                <Text>Task Date: {displayDate}</Text>
                <Button title="Change" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    minimumDate={new Date()}
                    onConfirm={confirmDate}
                    onCancel={hideDatePicker}
                />

            </View>

            <View>
                <Button title="Add Task" onPress={submitTask} />
            </View>

            <View>
                <Button title="Next" onPress={nextScreen} />
            </View>
        </KeyboardAwareScrollView>
    )
}
