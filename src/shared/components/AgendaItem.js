import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '../../firebase/config';
import { AuthContext } from '../../screens/auth/AuthContext';

import { MaterialIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AgendaItem(props) {
    const { user } = useContext(AuthContext)
    const key = props.id
    const estime = props.estime
    const eetime = props.eetime
    const ename = props.ename
    const epriority = props.epriority

    return (
        <View style={style.card}>
            <View style={style.container}>
                <View style={style.times}>
                    <View >
                        <Text style={style.timetext}>{estime}</Text>
                    </View>
                    <View >
                        <Text style={style.text}>to</Text>
                    </View>
                    <View >
                        <Text style={style.timetext}>{eetime}</Text>
                    </View>
                </View>
                <View style={style.info}>
                    <View >
                        <Text style={style.name}>{ename}</Text>
                    </View>

                    <View style={style.prioview}>
                        <Text style={style.prio}>Priority Level: {epriority}</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

// TODO: Make priority labels into button like things

const style = StyleSheet.create({
    card: {
        backgroundColor: "#fffbee",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        borderWidth: 1,
        borderColor: "thistle",
        width: windowWidth - 30,
        minHeight: windowHeight / 6,
        padding: 5
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        maxWidth: windowWidth - 30,
    },
    times: {
        display: "flex",
        flexDirection: "column",
        margin: 5
    },
    timetext: {
        color: "#C5CDE3",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center"
    },
    info: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: windowWidth / 2,
        margin: 5
    },
    text: {
        color: "#9A76A5",
        fontSize: 18,
        textAlign: "center"
    },
    name: {
        margin: 5,
        fontSize: 30,
        fontWeight: "bold",
        color: "#9A76A5",
        textAlign: "center",
    },
    // prioview: {
    //     alignSelf: "flex-end"
    // },
    prio: {
        margin: 5,
        color: "#9A76A5",
        textAlign: "center",
    }
})
