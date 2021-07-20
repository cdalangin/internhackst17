import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '../../firebase/config';
import { AuthContext } from '../../screens/auth/AuthContext';
import { isWithinInterval } from 'date-fns';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EmptyItem(props) {
    const { user } = useContext(AuthContext)
    const navigation = props.nav

    const pressHandler = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <View style={style.card}>
            <View style={style.container}>
                <Text style={style.title}>You don't have an event yet!</Text>
                <View style={style.buttons}>
                    <View>
                        <TouchableOpacity onPress={() => pressHandler("Schedule")}>
                            <Text style={style.text}>Add an Event</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </View>
    )
}

// TODO: Fix text so that it wraps and doesnt go past the screen width

const style = StyleSheet.create({
    card: {
        backgroundColor: "#fffbee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "thistle",
        width: windowWidth - 30,
        height: windowHeight / 4
    },
    container: {
        flexDirection: "column",
        alignItems: "center",

    },
    title: {
        color: "#9A76A5",
        fontSize: 20,
        textAlign: "center"
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

    },
    text: {
        color: "#9A76A5",
        fontSize: 18,
        margin: 15,
        fontWeight: "bold",
    },

})
