import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Dimensions } from 'react-native'
import MonthlyCalendar from '../../shared/MonthlyCalendar'
import { format } from 'date-fns';
import { db } from '../../firebase/config'
import TimelineCalendar from '../../shared/TimelineCalendar';
import QuoteBlock from '../../shared/components/QuoteBlock';
import PlusButton from '../../shared/components/PlusButton'
import { AuthContext } from '../auth/AuthContext'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeMonthly({ navigation }) {
    const { user } = useContext(AuthContext)
    const [events, setEvents] = useState([])
    const [date, setDate] = useState(new Date())
    const pressHandler = (screen) => {
        navigation.navigate(screen)
    }

    useEffect(() => {
        const userRef = db.collection("users").doc(user.uid)
        userRef.onSnapshot((doc) => {
            if (doc.exists) {
                // const taskList = doc.data()["tasks"]
                // setTasks(taskList)

                const eventsList = doc.data()["events"]
                setEvents(eventsList)
            } else {
                console.log("No such document!")
            }
        })
    }, [events])

    const viewDay = (time) => {
        // console.log(time)
        dayString = format(time, "yyyy-MM-dd")

        const todayEvents = []
        events.map((event) => {
            if (event.edate === dayString) {
                todayEvents.push(event)
            }
        })

        console.log(todayEvents)

        if (todayEvents.length === 0) {
            navigation.navigate("DailyView", { todayEvents: "None" })
        } else {
            navigation.navigate("DailyView", { todayEvents: todayEvents })
        }


    }

    return (
        <SafeAreaView >
            <TimelineCalendar date={date} onChange={(newDate) => viewDay(newDate)} events={events} />
            <View style={style.main}>
                <MonthlyCalendar events={events} nav={navigation} />
                <QuoteBlock />
            </View>
            <PlusButton nav={navigation} />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "space-around",
        marginTop: 20
        // maxHeight: windowHeight - 20
    },
})