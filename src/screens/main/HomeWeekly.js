import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles/homestyle';
import { db, auth } from '../../firebase/config'
import TimelineCalendar from '../../shared/TimelineCalendar';
// import Schedule from "../forms/Schedule.js" <- I need this so i dont have to keep clicking back to the screen im working on

export default function HomeWeekly({ navigation }) {
    // const { user } = route.params

    const uid = "TGHE0GC19UYBO21EQFArsXl9GAW2"  // This is hardcoded, to be fixed
    const pressHandler = (screen) => {
        navigation.navigate(screen, { uid: uid })
    }

    return (

        <View>
            <Text>Home Weekly View</Text>
            <TouchableOpacity onPress={() => pressHandler("ToDoList")}>
                <Text>Go to ToDoList</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pressHandler("MonthlyCalendar")}>
                <Text>Go to MonthlyCalendar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pressHandler("DailyView")}>
                <Text>Go to Daily</Text>
            </TouchableOpacity>

            {/* All these should be in that button at the bottom center */}
            <TouchableOpacity onPress={() => pressHandler("InputToDoList")}>
                <Text>Go to InputToDoList</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pressHandler("Mood")}>
                <Text>Go to Mood</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pressHandler("Schedule")}>
                <Text>Go to Schedule</Text>
            </TouchableOpacity>

            <TimelineCalendar />

        </View>
    )
}