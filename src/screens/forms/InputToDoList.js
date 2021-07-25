import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, Button, TouchableOpacity, View, ScrollView } from 'react-native'
import format from 'date-fns/format'
import fromUnixTime from 'date-fns/fromUnixTime'
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from './formstyle';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { db, auth } from '../../firebase/config'
import { AuthContext } from '../auth/AuthContext';

export default function InputToDoList({ navigation }) {
    const { user, activeDate } = useContext(AuthContext)
    const formatDate = format(activeDate, "MMMM dd, yyyy")
    const initialState = {
        "tname": "",
        "isDone": false,
        "toComp": activeDate,
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

    // TODO: Change date format to YYYY-MM-DD
    const confirmDate = (date) => {
        const format_date = format(date, "MMMM dd, yyyy")

        setDisplayDate(format_date)
        setToDoItem(prevState => ({ ...prevState, "toComp": format_date }))
        hideDatePicker();
    };


    const submitTask = () => {
        if (toDoItem["tname"] == "") {
            alert("Please input a task.")
        } else {
            var userDoc = db.collection('users').doc(user.uid)

            userDoc.update({
                tasks: firebase.firestore.FieldValue.arrayUnion(toDoItem)
            })
            setToDoItem(initialState)
        }

    }

    const nextScreen = () => {
        navigation.navigate("Weekly View", { screen: "HomeWeekly" })
    }


    return (
        <ScrollView style={styles.container}>
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
        </ScrollView>
    )
}
