import React, { useEffect, useState } from 'react'
import { StyleSheet, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Calendar, CalendarList, Agenda, Arrow } from 'react-native-calendars';
// import styles from './styles/homestyle'; <= add css
import { db, auth } from '../firebase/config'

export default function MonthlyCalendar({ navigation }) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Monthly Calendar Component</Text>
            <View>
                <Calendar
                    minDate={'2021-07-14'}
                    onDayPress={(day) => { console.log('selected day', day) }}
                    monthFormat={'MMMM yyyy'}
                    onMonthChange={(month) => { console.log('month changed', month) }}
                    hideExtraDays={true}
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    disableAllTouchEventsForDisabledDays={true}
                    enableSwipeMonths={true}
                    style={styles.calendar}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "gray",
        padding: 20,
        // alignItems: 'center',
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