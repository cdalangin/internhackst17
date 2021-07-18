import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { format } from 'date-fns';
import styles from './styles/homestyle';
import { db, auth } from '../../firebase/config'
import { AuthContext } from '../auth/AuthContext'

import TimelineCalendar from '../../shared/TimelineCalendar';
import MonthlyCalendar from '../../shared/MonthlyCalendar';
import { setDate } from 'date-fns';
import AgendaItem from '../../shared/components/AgendaItem';
import EmptyDay from '../../shared/components/EmptyDay'

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
    return (

        <View>
            <Text>Home Weekly View</Text>
            {/* <MonthlyCalendar /> */}
            {/* TODO: make calendar interactive in monthly view */}
            <TouchableOpacity onPress={() => pressHandler("MonthlyCalendar")}>
                <Text>Go to Monthly Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pressHandler("ToDoList")}>
                <Text>Go to ToDoList</Text>
            </TouchableOpacity>

            {/* All these should be in that button at the bottom center */}
            <TouchableOpacity onPress={() => pressHandler("InputToDoList")}>
                <Text>Add InputToDoList</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => pressHandler("Mood")}>
                <Text>Go to Mood</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => pressHandler("Schedule")}>
                <Text>Add Schedule</Text>
            </TouchableOpacity>
            <TimelineCalendar date={date} onChange={(newDate) => dateChangeHandler(newDate)} events={events} />

            {viewDay ? <EmptyDay /> :
                currentEvents.map((todayEvent) => {
                    return (
                        <AgendaItem
                            id={todayEvent.ename}
                            estime={todayEvent.estime}
                            eetime={todayEvent.eetime}
                            ename={todayEvent.ename}
                            epriority={todayEvent.epriority} />
                    )
                })
            }
        </View>
    )
}