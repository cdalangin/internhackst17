import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '../../firebase/config';
import { AuthContext } from '../../screens/auth/AuthContext';

import { MaterialIcons } from '@expo/vector-icons';

// Weekly item should instead be 7 sections for each day of the week ?

export default function WeeklyItem(props) {
    const { user } = useContext(AuthContext)
    // const day = props.day
    // const month = props.month
    // const year = props.year
    const key = props.id
    const estime = props.estime
    const eetime = props.eetime
    const ename = props.ename
    const epriority = props.epriority

    return (
        <View style={style.card}>
            <View style={style.container}>
                {/* <TouchableOpacity onPress={() => console.log(key)}>
                    <Text>TOUCH!!</Text>
                </TouchableOpacity> */}

                <View>
                    <Text>Name: {ename}</Text>
                </View>
                <View >
                    <Text>Start Time:{estime}</Text>
                </View>
                <View >
                    <Text>End Time: {eetime}</Text>
                </View>
                <View>
                    <Text >Priority Level: {epriority}</Text>
                </View>

            </View>
        </View>
    )
}

// TODO: Fix text so that it wraps and doesnt go past the screen width

const style = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: 25,
        margin: 10,

    },
    container: {
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "space-between",
    },
    textcont: {
        flexWrap: "wrap",
        flexBasis: "auto"
    },
    task: {
        fontSize: 20,
    },
    buttoncont: {
        flexBasis: 25
    }
})
