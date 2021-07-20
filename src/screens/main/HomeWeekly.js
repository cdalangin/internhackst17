import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { format } from 'date-fns';
import styles from './styles/homestyle';
import { db, auth } from '../../firebase/config'
import { AuthContext } from '../auth/AuthContext'

import TimelineCalendar from '../../shared/TimelineCalendar';
import AgendaItem from '../../shared/components/AgendaItem';
import MonthlyCalendar from '../../shared/MonthlyCalendar';
import { setDate } from 'date-fns';
import EmptyDay from '../../shared/components/EmptyDay'
import PlusButton from '../../shared/components/PlusButton'
import QuoteBlock from '../../shared/components/QuoteBlock';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeWeekly({ navigation }) {
    const { user, userData } = useContext(AuthContext)
    const events = userData["events"]
    const [date, setDate] = useState(new Date())
    const [currentEvents, setCurrentEvents] = useState([]); // need initial state to be current date
    const [viewDay, setViewDay] = useState(true);

    const pressHandler = (screen) => {
        navigation.navigate(screen)
    }

    const dateChangeHandler = (newDate) => {
        setDate(newDate)
        const dayString = format(newDate, "yyyy-MM-dd")

        const todayEvents = []
        events.map((event) => {
            if (event.edate === dayString) {
                todayEvents.push(event)
            }
        })
        console.log(todayEvents)
        if (todayEvents.length > 0) {
            setCurrentEvents(todayEvents)
            setViewDay(false)
        } else {
            setViewDay(true)
        }
    }

    const onPressDay = () => {
        if (currentEvents.length == 0) {
            navigation.navigate("DailyView", { todayEvents: "None" })
        } else {
            navigation.navigate("DailyView", { todayEvents: currentEvents })
        }
    }
    return (
        <SafeAreaView>
            {/* <ScrollView> */}
            <TimelineCalendar date={date} onChange={(newDate) => dateChangeHandler(newDate)} events={events} />
            {/* <MonthlyCalendar /> */}
            {/* TODO: make calendar interactive in monthly view */}
            <TouchableWithoutFeedback onPress={() => onPressDay()}>
                <View>
                    <ScrollView style={style.agendalist}>
                        {viewDay ? <EmptyDay /> :
                            currentEvents.map((todayEvent) => {
                                return (
                                    <View key={todayEvent.ename}>
                                        <AgendaItem
                                            id={todayEvent.ename}
                                            estime={todayEvent.estime}
                                            eetime={todayEvent.eetime}
                                            ename={todayEvent.ename}
                                            epriority={todayEvent.epriority} />
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={() => pressHandler("MonthlyCalendar")}>
                <Text>Go to Monthly Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pressHandler("ToDoList")}>
                <Text>Go to ToDoList</Text>
            </TouchableOpacity>

            <QuoteBlock />

            <PlusButton nav={navigation} />
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}
// TODO: When adding styles to ScrollView using contentContainerStyle, scroll feature doesn't work
const style = StyleSheet.create({
    main: {
        backgroundColor: "#EEDCFD"
    },
    agendalist: {
        height: windowHeight / 2,
        // display: "flex",
        // alignItems: "center"
    },

})