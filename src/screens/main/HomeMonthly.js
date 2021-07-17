import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MonthlyCalendar from '../../shared/MonthlyCalendar'
// import styles from './styles/homestyle'; <= add css
import { db, auth } from '../../firebase/config'
import { AuthContext } from '../auth/AuthContext'


export default function HomeMonthly({ navigation }) {
    const { user } = useContext(AuthContext)
    const pressHandler = (screen) => {
        navigation.navigate(screen, { uid: uid })
    }

    return (
        <View>
            <Text>Monthly View</Text>
            <MonthlyCalendar />
            {/* All these should be in that button at the bottom center */}
            <TouchableOpacity onPress={() => pressHandler("InputToDoList")}>
                <Text>Go to InputToDoList</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => pressHandler("Mood")}>
                <Text>Go to Mood</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => pressHandler("Schedule")}>
                <Text>Go to Schedule</Text>
            </TouchableOpacity>
        </View>
    )
}