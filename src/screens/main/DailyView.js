import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Calendar, CalendarList, Agenda, Arrow } from 'react-native-calendars';
// import styles from './styles/homestyle'; <= add css
import { db, auth } from '../../firebase/config'
import AgendaItem from '../../shared/components/AgendaItem';
import { AuthContext } from "../auth/AuthContext"

export default function DailyView({ navigation, route }) {
    const { user } = useContext(AuthContext)
    const { todayEvents } = route.params

    // TODO: Move this to a sep component
    if (todayEvents === "None") {
        return (
            <View>
                <Text>You haven't planned your schedule yet!</Text>

                <TouchableOpacity>
                    <Text>Add Task</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Add Event</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const dayString = todayEvents[0].edate

    return (
        <View>
            {/* TODO: Sort by start time, and show only the events of this day */}
            {todayEvents.map((event, index) => {
                return (
                    <View key={event.ename}>
                        <AgendaItem
                            // id={event.ename}
                            estime={event.estime}
                            eetime={event.eetime}
                            ename={event.ename}
                            epriority={event.epriority} />
                    </View>
                )
            })}

            <TouchableOpacity onPress={() => { console.log(dayString) }}>
                <Text>TOUCH!!! </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        display: "flex",
        alignSelf: "center",
        backgroundColor: "white",
        padding: 10,
        margin: 20
    }
})