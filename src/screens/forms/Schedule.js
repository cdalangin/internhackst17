import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Events from "../../shared/Events"
import styles from './formstyle.js';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { db, auth } from '../../firebase/config'

export default function Schedule({ navigation, route }) {

    const initialState = {
        "ename": "",
        "edate": "Event Date",
        "estime": "Event Start Time",
        "eetime": "Event End Time",
        "epriority": ""
    }

    const [infoState, setInfoState] = useState(initialState) //{eventName, eventDate, eventSTime, eventETime, priorityLevel}

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

    const { uid } = route.params // "TGHE0GC19UYBO21EQFArsXl9GAW2"

    // Date Picker

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmDate = (date) => {
        const format_date = date.toDateString() + ''
        console.warn("A date has been picked: ", date);

        setInfoState(prevState => ({ ...prevState, "edate": format_date }))
        hideDatePicker();
    };

    // Formatting Time

    const formatTime = (time) => {
        const hour = time.getHours().toString()
        const minute = time.getMinutes().toString()

        const formatted = hour.padStart(2, "0") + ":" + minute.padStart(2, "0")

        return formatted
    }

    // Start Time Picker

    const showStartTimePicker = () => {
        setStartTimePickerVisibility(true);
    };

    const hideStartTimePicker = () => {
        setStartTimePickerVisibility(false);
    };

    const confirmStartTime = (stime) => {
        const format_time = formatTime(stime);
        console.warn("A start time has been picked: ", format_time);

        setInfoState(prevState => ({ ...prevState, "estime": format_time }))
        hideStartTimePicker();
    };

    // End Time Picker

    const showEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    };

    const hideEndTimePicker = () => {
        setEndTimePickerVisibility(false);
    };

    const confirmEndTime = (etime) => {
        const format_time = formatTime(etime);
        console.warn("A start time has been picked: ", format_time);

        setInfoState(prevState => ({ ...prevState, "eetime": format_time }))
        hideEndTimePicker();
    };

    // Submit

    const clearState = () => {
        setInfoState({ ...initialState });
    };

    const submitEvent = () => {
        const eventObj = infoState
        var userDoc = db.collection('users').doc(uid)

        userDoc.update({
            events: firebase.firestore.FieldValue.arrayUnion(eventObj)
        }).then(clearState)
    }

    const nextScreen = () => {
        // TODO: If new user, go to input todolist, else, go back to main page
        navigation.navigate("InputToDoList", { uid: uid })
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Input Schedule</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setInfoState(prevState => ({ ...prevState, "ename": text }))}
                value={infoState.ename}
                placeholder="Name of Event"
            />
            <View>
                <Button title={infoState.edate} onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    minimumDate={new Date()}
                    onConfirm={confirmDate}
                    onCancel={hideDatePicker}
                />
                <Text></Text>
            </View>
            <View>
                <Button title={infoState.estime} onPress={showStartTimePicker} />
                <DateTimePickerModal
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={confirmStartTime}
                    onCancel={hideStartTimePicker}
                />
                <Text></Text>
            </View>
            <View>
                <Button title={infoState.eetime} onPress={showEndTimePicker} />
                <DateTimePickerModal
                    isVisible={isEndTimePickerVisible}
                    mode="time"
                    onConfirm={confirmEndTime}
                    onCancel={hideEndTimePicker}
                />
                <Text></Text>
            </View>
            <View>
                <Text>Set Priority Level:</Text>
                <Picker
                    selectedValue={infoState.epriority}
                    onValueChange={(itemValue) =>
                        setInfoState(prevState => ({ ...prevState, "epriority": itemValue }))
                    }>
                    <Picker.Item label="High" value="high" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="Low" value="low" />
                </Picker>
            </View>
            <View>
                <Button title="Add event" onPress={submitEvent} />
            </View>

            <View>
                <Button title="Next" onPress={nextScreen} />
            </View>


            {/* TODO: Make an event component so that added events will compile here 
                Maybe assign unique numbers to events so that when you delete it knows which one to delete*/}
            <View>
                <Events />
            </View>
        </ScrollView>
    )
}

