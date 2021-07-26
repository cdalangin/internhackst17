import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import format from 'date-fns/format'
import styles from './formstyle.js';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { db, auth } from '../../firebase/config'
import { AuthContext } from '../auth/AuthContext';

// 2021-07-22T01:56:12.691Z

export default function Schedule({ navigation }) {
    const { user } = useContext(AuthContext)
    const initialState = {
        "ename": "",
        "edate": "Event Date",
        "eday": "Event Day",
        "estime": "",
        "eetime": "",
        "epriority": ""
    }
    const [sButton, setSButton] = useState("Event Start Time")
    const [eButton, setEButton] = useState("Event End Time")

    let months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
    }

    const [infoState, setInfoState] = useState(initialState)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

    const uid = user.uid

    // Date Picker

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // TODO: Change date format to YYYY-MM-DD
    const confirmDate = (date) => {
        const format_date = format(date, "MMMM dd, yyyy")
        const getDay = date.toDateString() + ""
        const split_date = getDay.split(' ')

        const day = split_date[0]
        // const strMonth = split_date[1]

        // const string_date = split_date[3] + "-" + months[strMonth] + "-" + split_date[2]
        // console.warn("A date has been picked: ", string_date);

        setInfoState(prevState => ({ ...prevState, "edate": format_date, "eday": day }))
        hideDatePicker();
    };

    // Formatting Time

    // Todo but not important: use format package instead
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
        setSButton(format_time)

        console.warn("A start time has been picked: ", stime);

        setInfoState(prevState => ({ ...prevState, "estime": stime }))
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
        setEButton(format_time)
        console.warn("A start time has been picked: ", format_time);

        setInfoState(prevState => ({ ...prevState, "eetime": etime }))
        hideEndTimePicker();
    };

    // Submit

    const clearState = () => {
        setInfoState({ ...initialState });
        setSButton("Event Start Time")
        setEButton("Event End Time")
    };

    const submitEvent = () => {
        const eventObj = infoState

        if ((eventObj["ename"] == "") || (eventObj["eday"] === "Event Date") ||
            (eventObj["estime"] === "") || (eventObj["eetime"] === "") ||
            (eventObj["epriority"] === "") || (sButton == "Event Start Time") ||
            (eButton == "Event Emd Time")) {
            alert("Error: Please complete all fields.")
            clearState()
        } else {
            var userDoc = db.collection('users').doc(uid)

            userDoc.update({
                events: firebase.firestore.FieldValue.arrayUnion(eventObj)
            }).then(clearState)
        }

    }

    const nextScreen = () => {
        navigation.navigate("Weekly View", { screen: "HomeWeekly" })
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
                <Button title={sButton} onPress={showStartTimePicker} />
                <DateTimePickerModal
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={confirmStartTime}
                    onCancel={hideStartTimePicker}
                />
                <Text></Text>
            </View>
            <View>
                <Button title={eButton} onPress={showEndTimePicker} />
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

        </ScrollView>
    )
}

