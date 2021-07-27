import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, ScrollView, Text, Dimensions, SafeAreaView } from 'react-native'
import { db, auth } from '../../firebase/config'
import { AuthContext } from "../auth/AuthContext"

import { Ionicons } from '@expo/vector-icons';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Profile({ navigation }) {
    const { user, logout } = useContext(AuthContext)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [join, setJoin] = useState("");
    const [eventCT, setEventCT] = useState("");
    const [taskCT, setTaskCT] = useState("");

    useEffect(() => {
        const userRef = db.collection("users").doc(user.uid)
        userRef.onSnapshot((doc) => {
            if (doc.exists) {
                setName(doc.data()["fullName"])
                setEmail(doc.data()["email"])

                const time = doc.data()["joined"]
                setJoin(time)

                setEventCT(doc.data()["eventCT"])
                setTaskCT(doc.data()["taskCT"])
            } else {
                console.log("No such document!")
            }
        })
    }, [eventCT, taskCT])

    // TODO: Add image

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.main}>
                <View style={styles.bio}>
                    <View style={styles.picture}></View>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.email}>{email}</Text>
                        <Text style={styles.join}>Staying organized since {join}</Text>
                    </View>
                </View>

                <View style={styles.stats}>
                    <View style={styles.statsbox}>
                        <Text style={styles.statnum}>{taskCT}</Text>
                        <Text style={styles.stattext}>tasks completed</Text>
                    </View>

                    <View style={styles.statsbox}>
                        <Text style={styles.statnum}>{eventCT}</Text>
                        <Text style={styles.stattext}>events scheduled</Text>
                    </View>
                </View>

                <View style={styles.logoutView}>
                    <TouchableOpacity onPress={() => logout(navigation)} style={styles.logout}>
                        <Ionicons name="log-out-outline" size={30} color="thistle" />
                        <Text style={styles.logtext}>LogOut</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "space-around",
    },
    bio: {
        backgroundColor: "#fffbee",
        height: windowHeight / 3,
        width: windowWidth,
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center",
    },
    picture: {
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: "thistle"

    },
    name: {
        fontSize: 35,
        color: "#9A76A5",
        textAlign: "center"
    },
    email: {
        fontSize: 25,
        color: "#C5CDE3",
        textAlign: "center"
    },
    join: {
        fontSize: 20,
        color: "#C5CDE3",
        textAlign: "center",
        marginTop: 10
    },
    stats: {
        height: windowHeight / 3,
        width: windowWidth,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        textAlign: "center",
        marginTop: 10
    },
    statsbox: {
        backgroundColor: "#fffbee",
        borderWidth: 2,
        borderColor: "#DCEDFD",
        height: windowHeight / 3,
        width: (windowWidth / 2) - 4,
        margin: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center",
    },
    statnum: {
        fontSize: 70,
        color: "#9A76A5",
        fontWeight: "300",
    },
    stattext: {
        fontSize: 20,
        color: "thistle",
    },
    logoutView: {
        display: "flex",
        alignSelf: "flex-end",
        marginRight: 10
    },
    logout: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: windowWidth / 3,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: "#fffbee",
        padding: 10,
        borderRadius: 10,
    },
    logtext: {
        fontSize: 20,
        color: "#9A76A5",
    }
})