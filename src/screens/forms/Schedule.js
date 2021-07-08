import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './formstyle.js';
import { db, auth } from '../../firebase/config'

export default function Schedule({ navigation }) {
    const [eventName, setEventName] = React.useState("");
    const [eventDate, setEventDate] = React.useState("");

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Input Schedule</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setEventName(text)}
                value={eventName}
                placeholder="Name of Event"
            />
        </SafeAreaView>
    )
}

