import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '../../firebase/config';
import { AuthContext } from '../../screens/auth/AuthContext';

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ToDoListItem(props) {
    const { user } = useContext(AuthContext)
    const task = props.task
    const [done, setDone] = useState(false)

    const remove = () => {
        const userRef = db.collection("users").doc(user.uid)

        userRef.update({
            tasks: firebase.firestore.FieldValue.delete(task)
        })
    }

    return (
        <View style={style.card}>
            <View style={style.container}>
                {/* TODO: Use below button to delete todolist item */}
                <View>
                    <TouchableOpacity onPress={() => { setDone(!done) }}>
                        {
                            done ? <Ionicons name="checkbox" size={30} color="thistle" />
                                :
                                <Ionicons name="square-outline" size={30} color="thistle" />
                        }

                    </TouchableOpacity>
                </View>
                {/* <View> */}
                <Text style={style.task}>{task}</Text>
                {/* </View> */}

            </View>
        </View>
    )
}

// TODO: Fix text so that it wraps and doesnt go past the screen width

const style = StyleSheet.create({
    card: {
        backgroundColor: "#fffbee",
        padding: 15,
        margin: 5,
        width: windowWidth - 30,
        borderRadius: 10,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: windowWidth - 40,
    },
    task: {
        color: "#9A76A5",
        fontSize: 18,
        textAlign: "right",
        flex: 1,
        flexWrap: 'wrap'
    },
})
