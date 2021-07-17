import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles/homestyle';
import { db, auth } from '../../firebase/config'
import { AuthContext } from '../auth/AuthContext'

import TimelineCalendar from '../../shared/TimelineCalendar';

export default function HomeWeekly({ navigation }) {
    const { user } = useContext(AuthContext)
    const pressHandler = (screen) => {
        navigation.navigate(screen)
    }

    return (

        <View>
            <Text>Home Weekly View</Text>
            <TimelineCalendar />
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
                <Text>Add InputToDoList</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => pressHandler("Mood")}>
                <Text>Go to Mood</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => pressHandler("Schedule")}>
                <Text>Add Schedule</Text>
            </TouchableOpacity>



        </View>
    )
}