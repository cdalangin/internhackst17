import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles/homestyle';
import { db, auth } from '../../firebase/config'

export default function ToDoList({ navigation }) {

    return (
        <View>
            <Text>TODO LIST</Text>
        </View>
    )
}