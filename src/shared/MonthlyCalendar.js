import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Calendar, CalendarList, Agenda, Arrow } from 'react-native-calendars';
// import styles from './styles/homestyle'; <= add css
import { db, auth } from '../firebase/config'
import TimelineCalendar from './TimelineCalendar';
import { AuthContext } from '../screens/auth/AuthContext';

export default function MonthlyCalendar({ navigation }) {
    const { user, userData } = useContext(AuthContext)

    const events = userData["events"]
    const [date, setDate] = useState(new Date())

    const edates = events.map((events) => {
        return events.edate
    })

    const activeDates = {}
    edates.map((ed) => {
        activeDates[ed] = { marked: true, dotColor: "purple" }
    })

    const viewDay = (time) => {
        const dayString = time.dateString

        const todayEvents = []
        events.map((event) => {
            if (event.edate === dayString) {
                todayEvents.push(event)
            }
        })

        if (todayEvents.length === 0) {
            navigation.navigate("DailyView", { todayEvents: "None" })
        } else {
            navigation.navigate("DailyView", { todayEvents: todayEvents })
        }

    }

    // const viewDay2 = (time) => {
    //     const dayString = time.dateString

    //     const todayEvents = []
    //     events.map((event) => {
    //         if (event.edate === dayString) {
    //             todayEvents.push(event)
    //         }
    //     })

    //     if (todayEvents.length === 0) {
    //         navigation.navigate("DailyView", { todayEvents: "None" })
    //     } else {
    //         navigation.navigate("DailyView", { todayEvents: todayEvents })
    //     }

    // }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Monthly Calendar Component</Text> */}
            <TimelineCalendar date={date} onChange={(newDate) => viewDay(newDate)} events={events} />
            <View>
                <Calendar
                    minDate={'2021-07-14'}
                    onDayPress={(time) => viewDay(time)}
                    monthFormat={'MMMM yyyy'}
                    onMonthChange={(month) => { console.log('month changed', month) }}
                    hideExtraDays={true}
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    disableAllTouchEventsForDisabledDays={true}
                    enableSwipeMonths={true}
                    style={styles.calendar}

                    markingType={'period'}
                    markedDates={activeDates}
                />
            </View>
            {/* Console.logs are mainly to check if im getting the object i want */}
            {/* <TouchableOpacity onPress={() => console.log(time)}>
                <Text>
                    HELLO???
                </Text>
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "gray",
        padding: 20,
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