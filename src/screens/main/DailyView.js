import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native'
import { db, auth } from '../../firebase/config'
import AgendaItem from '../../shared/components/AgendaItem';
import { AuthContext } from "../auth/AuthContext"
import EmptyDay from "../../shared/components/EmptyDay"
import format from 'date-fns/format'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Show stuff as a daily calendar view then add the items there


export default function DailyView({ navigation, route }) {
    const { user } = useContext(AuthContext)
    let { todayEvents } = route.params

    if (todayEvents === "None") {
        return (
            <View style={styles.main}>
                <EmptyDay nav={navigation} type="daily" />
            </View>
        )
    }

    return (
        <View style={styles.main}>
            <ScrollView>
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
            </ScrollView>
            {/* <TouchableOpacity onPress={() => { console.log("test") }}>
                <Text>TOUCH!!! </Text>
            </TouchableOpacity> */}

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center",
        maxHeight: windowHeight - 40
    },
    title: {
        fontSize: 30,
        display: "flex",
        alignSelf: "center",
        backgroundColor: "white",
        padding: 10,
        margin: 20
    }
})