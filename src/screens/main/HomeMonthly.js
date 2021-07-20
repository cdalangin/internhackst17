import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MonthlyCalendar from '../../shared/MonthlyCalendar'
// import styles from './styles/homestyle'; <= add css
import { db, auth } from '../../firebase/config'
import TimelineCalendar from '../../shared/TimelineCalendar';
import AgendaItem from '../../shared/components/AgendaItem';
import PlusButton from '../../shared/components/PlusButton'
import { AuthContext } from '../auth/AuthContext'


export default function HomeMonthly({ navigation }) {
    const { user } = useContext(AuthContext)
    const pressHandler = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <View>
            <MonthlyCalendar />
            {/* TODO: make calendar interactive in monthly view */}
            <TouchableOpacity onPress={() => pressHandler("MonthlyCalendar")}>
                <Text>Go to Monthly Calendar</Text>
            </TouchableOpacity>

            <PlusButton nav={navigation} />
        </View>
    )
}