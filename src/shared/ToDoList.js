import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import styles from '../screens/main/styles/homestyle';
import { db, auth } from '../firebase/config'

export default function ToDoList({ navigation }) {
    // const { uid } = route.params
    // const { user } = route.params
    // var toDoItems = db.ref("users" + uid)

    return (
        <View>
            <Text style={styles.title}>TODO LIST</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        display: "flex",
        alignSelf: "center",
        backgroundColor: "white",
        padding: 10,
        margin: 20
    }
})