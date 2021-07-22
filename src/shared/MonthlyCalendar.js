import React, { useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Calendar } from 'react-native-calendars';

import sub from 'date-fns/sub'

const windowWidth = Dimensions.get('window').width;


export default function MonthlyCalendar(props) {
    const events = props.events
    const navigation = props.nav
    const minDate = sub(new Date(), { days: 1 })
    const [date, setDate] = useState(new Date())

    const edates = events.map((events) => {
        return events.edate
    })

    const activeDates = {}
    edates.map((ed) => {
        activeDates[ed] = { marked: true, dotColor: "#9A76A5" }
    })

    const viewDay = (time) => {
        const dayString = time.dateString

        const todayEvents = []
        events.map((event) => {
            if (event.edate === dayString) {
                todayEvents.push(event)
            }
        })

        if (todayEvents.length === 0) {
            navigation.navigate("DailyView", { todayEvents: "None" })
        } else {
            navigation.navigate("DailyView", { todayEvents: todayEvents })
        }

    }

    return (
        <View style={styles.container}>
            <View>
                <Calendar
                    minDate={minDate}
                    onDayPress={(time) => viewDay(time)}
                    monthFormat={'MMMM yyyy'}
                    onMonthChange={(month) => { console.log('month changed', month) }}
                    hideExtraDays={true}
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    disableAllTouchEventsForDisabledDays={true}
                    enableSwipeMonths={true}
                    style={styles.calendar}

                    markingType={'period'}
                    markedDates={activeDates}

                    theme={{
                        backgroundColor: '#fffbee',
                        calendarBackground: '#fffbee',
                        textSectionTitleColor: '#9A76A5',
                        textSectionTitleDisabledColor: '#CDC5E3',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#9A76A5',
                        todayTextColor: '#9A76A5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#CDC5E3',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#C5CDE3',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: '#9A76A5',
                        indicatorColor: '#9A76A5',
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '400',
                        textDayFontSize: 16,
                        textMonthFontSize: 20,
                        textDayHeaderFontSize: 16,
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth - 30,
        marginBottom: 20,
    }
})