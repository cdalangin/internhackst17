import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, SafeAreaView, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native'
import { format, fromUnixTime, getUnixTime } from 'date-fns';
import { db } from '../../firebase/config'
import { AuthContext } from '../auth/AuthContext'

import TimelineCalendar from '../../shared/TimelineCalendar';
import AgendaItem from '../../shared/components/AgendaItem';
import ToDoListItem from '../../shared/components/ToDoItem';
import EmptyDay from '../../shared/components/EmptyDay'
import PlusButton from '../../shared/components/PlusButton'
import QuoteBlock from '../../shared/components/QuoteBlock';

const windowHeight = Dimensions.get('window').height;

export default function HomeWeekly({ navigation }) {
    const { user, activeDate, setActiveDate } = useContext(AuthContext)
    const [events, setEvents] = useState({})
    const [tasks, setTasks] = useState([])
    const [date, setDate] = useState(new Date())
    const [currentEvents, setCurrentEvents] = useState([]); // need initial state to be current date
    const [currentTasks, setCurrentTasks] = useState([])
    const [viewDay, setViewDay] = useState(true);
    const [toDoItem, setToDoItem] = useState(true)

    useEffect(() => {
        const userRef = db.collection("users").doc(user.uid)
        userRef.onSnapshot((doc) => {
            if (doc.exists) {
                const taskList = doc.data()["tasks"]
                setTasks(taskList)

                const eventsList = doc.data()["events"]
                setEvents(eventsList)
            } else {
                console.log("No such document!")
            }
        })

    }, [])


    const dateChangeHandler = (newDate) => {
        setDate(newDate)
        setActiveDate(newDate)

        const dayString = format(newDate, "MMMM dd, yyyy")

        // Event Sorting
        const todayEvents = []
        events.map((event) => {
            if (event.edate === dayString) {
                todayEvents.push(event)
            }
        })

        if (todayEvents.length > 0) {
            setCurrentEvents(todayEvents.sort((x, y) => {
                return x["estime"] - y["estime"]
            }))
            setViewDay(false)
        } else {
            setCurrentEvents("None")
            setViewDay(true)
        }

        // Task Sorting
        const todayTasks = []
        tasks.map((task) => {
            if (task.toComp == dayString) {
                todayTasks.push(task)
            }
        })

        if (todayTasks.length > 0) {
            setCurrentTasks(todayTasks);
            setToDoItem(false)
        } else {
            setCurrentTasks("None")
            setToDoItem(true)
        }
    }

    const onPressDay = () => {
        if (currentEvents.length == 0) {
            navigation.navigate("DailyView", { todayEvents: "None" })
        } else {
            navigation.navigate("DailyView", { todayEvents: currentEvents })
        }
    }

    const onPressToDo = () => {
        if (currentTasks.length == 0) {
            navigation.navigate("ToDoList", { todayTasks: "None" })
        } else {
            navigation.navigate("ToDoList", { todayTasks: currentTasks })
        }
    }

    return (
        <SafeAreaView>
            <TimelineCalendar date={date} onChange={(newDate) => dateChangeHandler(newDate)} events={events} />
            <View style={style.main}>

                {/* <ScrollView> */}
                <TouchableWithoutFeedback onPress={() => onPressDay()} >
                    <View>
                        <ScrollView style={style.agendalist}>
                            {viewDay ? <EmptyDay nav={navigation} type="weekly" type2="event" /> :
                                <View>
                                    {currentEvents.map((todayEvent) => {
                                        return (
                                            <View key={todayEvent.ename}>
                                                <AgendaItem
                                                    id={todayEvent.ename}
                                                    estime={todayEvent.estime}
                                                    eetime={todayEvent.eetime}
                                                    ename={todayEvent.ename}
                                                    epriority={todayEvent.epriority} />
                                            </View>
                                        )
                                    })}
                                </View>
                            }
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>

                {/* Removed because I didn't sort tasks by date yet */}
                <TouchableWithoutFeedback onPress={() => onPressToDo()} >
                    <View>
                        <ScrollView style={style.agendalist}>
                            {toDoItem ? <EmptyDay nav={navigation} type="weekly" type2="toDoItem" /> :
                                <View>
                                    {currentTasks.map((task) => {
                                        return (
                                            <>
                                                <View key={task}>
                                                    <ToDoListItem
                                                        key={task}
                                                        task={task.tname} />
                                                </View>
                                            </>
                                        )

                                    }
                                    )}
                                </View>
                            }
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>

                <QuoteBlock />


                {/* </ScrollView> */}
            </View>
            <PlusButton nav={navigation} />
        </SafeAreaView>
    )
}
// TODO: When adding styles to ScrollView using contentContainerStyle, scroll feature doesn't work
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