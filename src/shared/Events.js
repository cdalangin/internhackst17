import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native'
import { db } from '../firebase/config'
import AgendaItem from './components/AgendaItem';
import { AuthContext } from "../screens/auth/AuthContext"
import EmptyDay from "./components/EmptyDay"
import format from 'date-fns/format'

const windowHeight = Dimensions.get('window').height;

// Show stuff as a daily calendar view then add the items there

export default function Events(props) {
    const { user, activeDate } = useContext(AuthContext)
    const dayString = format(activeDate, "MMMM dd, yyyy")
    let userRef = db.collection("users").doc(user.uid)
    const navigation = props.nav

    const [todayEvents, setTodayEvents] = useState([])
    const [eventItem, setEventItem] = useState(true)

    useEffect(() => {
        userRef.onSnapshot((doc) => {
            if (doc.exists) {

                const eventList = doc.data()["events"]

                const events = []
                eventList.map((event) => {
                    if (event.edate === dayString) {
                        events.push(event)
                    }
                })

                if (events.length > 0) {
                    setTodayEvents(events);
                    setEventItem(false)
                } else {
                    setEventItem(true)
                }
            } else {
                console.log("No such document!")
            }
        })
    }, [activeDate])

    return (
        <View style={styles.main}>
            <ScrollView>
                {eventItem ?
                    <EmptyDay nav={navigation} type="event" />
                    : <View>
                        {todayEvents.map((event) => {
                            return (
                                <View key={event.ename + event.edate}>
                                    <AgendaItem
                                        estime={event.estime}
                                        eetime={event.eetime}
                                        ename={event.ename}
                                        epriority={event.epriority} />
                                </View>
                            )
                        })}
                    </View>
                }
            </ScrollView>

        </View>
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
    title: {
        fontSize: 30,
        display: "flex",
        alignSelf: "center",
        backgroundColor: "white",
        padding: 10,
        margin: 20
    }
})