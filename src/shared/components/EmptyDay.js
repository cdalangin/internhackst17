import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '../../firebase/config';
import { AuthContext } from '../../screens/auth/AuthContext';

import { MaterialIcons } from '@expo/vector-icons';

export default function EmptyItem(props) {
    const { user } = useContext(AuthContext)
    // const key = props.id
    // const estime = props.estime
    // const eetime = props.eetime
    // const ename = props.ename
    // const epriority = props.epriority

    return (
        <View style={style.card}>
            <View style={style.container}>
                <Text>You don't have an event yet!</Text>

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
