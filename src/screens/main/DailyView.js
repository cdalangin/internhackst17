import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Calendar, CalendarList, Agenda, Arrow } from 'react-native-calendars';
// import styles from './styles/homestyle'; <= add css
import { db, auth } from '../../firebase/config'

export default function DailyView({ navigation }) {

    return (
        <View>
            <Text>Daily View</Text>
        </View>
    )
}