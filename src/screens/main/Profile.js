import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import styles from './styles/homestyle'; <= add css
import { db, auth } from '../../firebase/config'

export default function Profile({ navigation }) {

    const logOut = () => {
        auth.signOut().then(() => {
            console.log('logged out')
            // navigation.navigate("Registration") 
        }).catch((error) => {
            console.log(error.message)
        })
    }
    return (
        <View>
            <Text>Profile</Text>
            <TouchableOpacity onPress={() => logOut()}>
                <Text>LogOut</Text>
            </TouchableOpacity>
        </View>
    )
}