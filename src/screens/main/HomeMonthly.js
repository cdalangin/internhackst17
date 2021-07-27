import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import MonthlyCalendar from '../../shared/MonthlyCalendar'
import { format } from 'date-fns';
import TimelineCalendar from '../../shared/TimelineCalendar';
import QuoteBlock from '../../shared/components/QuoteBlock';
import PlusButton from '../../shared/components/PlusButton'
import { AuthContext } from '../auth/AuthContext'

export default function HomeMonthly({ navigation }) {
    const { user, activeDate, setActiveDate } = useContext(AuthContext);
    const dayString = format(activeDate, "MMMM dd, yyyy");
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(new Date());
    const pressHandler = (screen) => {
        navigation.navigate(screen)
    }

    const viewDay = (time) => {
        setActiveDate(time)

        navigation.navigate("DailyView", { currentTime: time })
    }

    return (
        <SafeAreaView >
            <TimelineCalendar date={activeDate} onChange={(newDate) => viewDay(newDate)} />
            <View style={style.main}>
                <MonthlyCalendar nav={navigation} />
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
        justifyContent: "space-around",
        marginTop: 20
        // maxHeight: windowHeight - 20
    },
})