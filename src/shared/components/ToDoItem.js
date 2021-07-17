import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '../../firebase/config';
import { AuthContext } from '../../screens/auth/AuthContext';

import { MaterialIcons } from '@expo/vector-icons';

export default function ToDoListItem(props) {
    const { user } = useContext(AuthContext)
    const task = props.task

    // const remove = () => {
    //     const userRef = db.collection("users").doc(user.uid)

    //     userRef.update({
    //         tasks: firebase.firestore.FieldValue.delete(task)
    //     })
    // }

    return (
        <View style={style.card}>
            <View style={style.container}>
                {/* TODO: Use below button to delete todolist item */}
                <View style={style.buttoncont}>
                    <TouchableOpacity onPress={() => console.log("done!")}><MaterialIcons name="check-box-outline-blank" size={24} color="black" /></TouchableOpacity>
                </View>
                <View style={style.textcont}>
                    <Text style={style.task}>{task}</Text>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
