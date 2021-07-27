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

    const dateChangeHandler = (newDate) => {
        setActiveDate(newDate)
    }

    const toDailyView = () => {
        navigation.navigate("DailyView", { currentTime: activeDate })
    }

    return (
        <SafeAreaView>
            <TimelineCalendar date={activeDate} onChange={(newDate) => dateChangeHandler(newDate)} />
            <View style={style.main}>

                <TouchableWithoutFeedback onPress={() => toDailyView()} >
                    <View>
                        <ScrollView style={style.agendalist}>
                            <Events nav={navigation} currentTime={activeDate} />
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => toDailyView()} >
                    <View>
                        <ScrollView style={style.agendalist}>
                            <ToDoList nav={navigation} currentTime={activeDate} />
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>

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