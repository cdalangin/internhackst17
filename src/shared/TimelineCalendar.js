import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import styles from './styles/homestyle'; <= add css
import { db, auth } from '../firebase/config'
import { AuthContext } from '../screens/auth/AuthContext';
import AgendaItem from './components/AgendaItem';

// This should be the navbar thing on top

export default function TimelineCalendar({ navigation }) {
    const { user } = useContext(AuthContext)

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
            <Text>Timeline Calendar</Text>
            {events.map((event) => {
                return (
                    <View>
                        <AgendaItem
                            key={event.id}
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