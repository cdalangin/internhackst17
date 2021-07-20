import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { addDays, format, getDate, isSameDay, startOfWeek } from 'date-fns';
// import styles from './styles/homestyle'; <= add css
import { db, auth } from '../firebase/config'
import { AuthContext } from '../screens/auth/AuthContext';
import AgendaItem from './components/AgendaItem';
import { onChange } from 'react-native-reanimated';

// This should be the navbar thing on top


const getWeekDays = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 });

    const final = []

    for (let i = 0; i < 7; i++) {
        const date = addDays(start, i);
        final.push({
            formatted: format(date, "EEE"),
            date,
            day: getDate(date)
        })
    }
    return final
}

export default function TimelineCalendar(props) {
    const { user } = useContext(AuthContext)
    const [week, setWeek] = useState([])
    const date = props.date
    const onChange = props.onChange

    useEffect(() => {
        const weekDays = getWeekDays(date);
        setWeek(weekDays);
    }, [date])

    return (
        <View>
            <View style={styles.container}>
                {week.map((weekDay) => {
                    const textStyles = [styles.label]
                    const touchable = [styles.touchable]
                    const sameDay = isSameDay(weekDay.date, date);

                    if (sameDay) {
                        textStyles.push(styles.selectedLabel);
                        touchable.push(styles.selectedTouchable)
                    }

                    return (
                        <View key={weekDay.formatted}>
                            <Text style={styles.label}>{weekDay.formatted}</Text>
                            <TouchableOpacity
                                onPress={() => onChange(weekDay.date)}
                                style={touchable}>
                                <Text style={textStyles}>{weekDay.day}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        display: "flex",
        alignSelf: "center",
        paddingBottom: 10
    },
    calendar: {
        width: "auto"
    },
    label: {
        fontSize: 14,
        color: '#9A76A5',
        textAlign: 'center',
    },
    selectedLabel: {
        color: '#9A76A5',
    },
    touchable: {
        borderRadius: 20,
        padding: 7.5,
        height: 35,
        width: 35,
    },
    selectedTouchable: {
        backgroundColor: '#C5CDE3',
    },
})