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
                {/* <TouchableOpacity onPress={() => console.log(key)}>
                    <Text>TOUCH!!</Text>
                </TouchableOpacity> */}
                {/* <View>
                    <Text style={style.text}>Key: {key}</Text>
                </View> */}
                <View>
                    <Text style={style.text}>Name: {ename}</Text>
                </View>
                <View >
                    <Text style={style.text}>Start Time:{estime}</Text>
                </View>
                <View >
                    <Text style={style.text}>End Time: {eetime}</Text>
                </View>
                <View>
                    <Text style={style.text} >Priority Level: {epriority}</Text>
                </View>

            </View>
        </View>
    )
}

// TODO: Fix text so that it wraps and doesnt go past the screen width

const style = StyleSheet.create({
    card: {
        backgroundColor: "#fffbee",
        padding: 25,
        margin: 10,
        borderRadius: 10,
        // width: windowWidth - 40
    },
    container: {
        flexDirection: "column",
        alignItems: "center",
    },
    text: {
        color: "#9A76A5",
        fontSize: 18,
        textAlign: "center"
    }
})
