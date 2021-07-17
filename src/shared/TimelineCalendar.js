import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import WeeklyCalendar from 'react-native-weekly-calendar';
// import styles from './styles/homestyle'; <= add css
import { db, auth } from '../firebase/config'
import { AuthContext } from '../screens/auth/AuthContext';
import AgendaItem from './components/AgendaItem';

export default function TimelineCalendar({ navigation }) {
    const { user } = useContext(AuthContext)
    // const sampleEvents = [
    //     { 'start': '2021-07-23 09:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
    //     { 'start': '2021-07-24 14:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
    //     { 'start': '2021-07-25 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
    //     { 'start': '2021-07-25 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
    //     { 'start': '2021-07-25 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
    //     { 'start': '2021-07-26 09:30:00', 'duration': '01:00:00', 'note': 'Schedule 1' },
    //     { 'start': '2021-07-26 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
    //     { 'start': '2021-07-26 15:00:00', 'duration': '01:30:00', 'note': 'Schedule 3' },
    //     { 'start': '2021-07-26 18:00:00', 'duration': '02:00:00', 'note': 'Schedule 4' },
    //     { 'start': '2021-07-26 22:00:00', 'duration': '01:00:00', 'note': 'Schedule 5' }
    // ]

    const [events, setEvents] = useState([])
    const userRef = db.collection("users").doc(user.uid)

    userRef.onSnapshot((doc) => {
        if (doc.exists) {
            const allEvents = doc.data()["events"]
            setEvents(allEvents)
        } else {
            console.log("No such document!")
        }
    })

    const edates = events.map((events) => {
        return events.edate
    })
    return (
        <View>
            {/* <View style={styles.container}>
                <WeeklyCalendar events={sampleEvents} style={{ height: 500 }} />
            </View> */}
            {events.map((event) => {
                return (
                    <View>
                        <AgendaItem
                            estime={event.estime}
                            eetime={event.eetime}
                            ename={event.ename}
                            epriority={event.epriority}
                        />

                    </View>
                )
            })}
            <TouchableOpacity>
                <Text onPress={() => { console.log(edates) }}>Press!</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     // flex: 1,
    //     backgroundColor: "gray",
    //     padding: 20,
    //     // alignItems: 'center',
    // },

    container: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        display: "flex",
        alignSelf: "center",
        paddingBottom: 10
    },
    calendar: {
        width: "auto"
    }
})