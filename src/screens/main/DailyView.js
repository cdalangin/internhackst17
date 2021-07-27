import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, ScrollView, Text, SafeAreaView } from 'react-native'
import { db } from '../../firebase/config'
import { AuthContext } from '../auth/AuthContext'
import ToDoList from '../../shared/ToDoList';
import Events from '../../shared/Events';
import PlusButton from "../../shared/components/PlusButton"
import format from 'date-fns/format'

const windowHeight = Dimensions.get('window').height;

// Show stuff as a daily calendar view then add the items there

export default function DailyView({ navigation, route }) {
    const { user, activeDate } = useContext(AuthContext)
    const { currentTime } = route.params
    let userRef = db.collection("users").doc(user.uid)

    const [todayEvents, setTodayEvents] = useState([])
    const [eventItem, setEventItem] = useState(true)


    console.log(activeDate, currentTime)
    return (
        <SafeAreaView style={styles.main}>
            <View>
                <ScrollView style={styles.agendalist}>
                    <Events currentTime={currentTime} />
                </ScrollView>
                <ScrollView style={styles.agendalist}>
                    <ToDoList currentTime={currentTime} />
                </ScrollView>

            </View>
            <PlusButton nav={navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        maxHeight: windowHeight - 40
    },
    title: {
        fontSize: 30,
        display: "flex",
        alignSelf: "center",
        backgroundColor: "white",
        padding: 10,
        margin: 20
    },
    agendalist: {
        maxHeight: windowHeight / 2.8,
        marginTop: 15
    },
})