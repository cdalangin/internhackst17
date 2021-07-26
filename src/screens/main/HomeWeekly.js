import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, SafeAreaView, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native'
import { format, fromUnixTime, getUnixTime } from 'date-fns';
import { db } from '../../firebase/config'
import { AuthContext } from '../auth/AuthContext'

import TimelineCalendar from '../../shared/TimelineCalendar';
import PlusButton from '../../shared/components/PlusButton'
import QuoteBlock from '../../shared/components/QuoteBlock';
import ToDoList from '../../shared/ToDoList';
import Events from '../../shared/Events';

const windowHeight = Dimensions.get('window').height;

export default function HomeWeekly({ navigation }) {
    const { activeDate, setActiveDate } = useContext(AuthContext)
    // const [events, setEvents] = useState({})
    // const [tasks, setTasks] = useState([])
    // const [date, setDate] = useState(activeDate);
    // const [currentEvents, setCurrentEvents] = useState([]); // need initial state to be current date
    // const [currentTasks, setCurrentTasks] = useState([])
    // const [viewDay, setViewDay] = useState(true);
    // const [toDoItem, setToDoItem] = useState(true)

    const dateChangeHandler = (newDate) => {
        setActiveDate(newDate)
    }

    return (
        <SafeAreaView>
            <TimelineCalendar date={activeDate} onChange={(newDate) => dateChangeHandler(newDate)} />
            <View style={style.main}>

                {/* <TouchableWithoutFeedback onPress={() => onPressDay()} > */}
                <View>
                    <ScrollView style={style.agendalist}>
                        <Events nav={navigation} />
                    </ScrollView>
                </View>
                {/* </TouchableWithoutFeedback> */}

                {/* <TouchableWithoutFeedback onPress={() => { console.log("clicked!") }} > */}
                <View>
                    <ScrollView style={style.agendalist}>
                        <ToDoList nav={navigation} />
                    </ScrollView>
                </View>
                {/* </TouchableWithoutFeedback> */}

                <QuoteBlock />

            </View>
            <PlusButton nav={navigation} />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center",
    },
    agendalist: {
        maxHeight: windowHeight / 4,
        marginTop: 15
    },

})