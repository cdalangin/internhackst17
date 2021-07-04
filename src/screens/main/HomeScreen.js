import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles/homestyle';
import { db, auth } from '../../firebase/config'

export default function HomeScreen({ navigation }) {
    // const [entityText, setEntityText] = useState('');
    // const [entities, setEntities] = useState([]);

    // const entityRef = db.collection('entities')
    // const userID = props.extraData.id

    // useEffect(() => {
    //     entityRef
    //     .where("authorID", "==", userID)
    //     .orderBy('createdAt', 'desc')
    //     .onSnapshot(
    //         querySnapshot => {
    //             const newEntities = []
    //             querySnapshot.forEach(doc => {
    //                 const entity = doc.data()
    //                 entity.id = doc.id
    //                 newEntities.push(entity)
    //             });
    //             setEntities(newEntities)
    //         },
    //         error => {
    //             console.log(error)
    //         }
    //     ) 
    // }, [])

    const pressHandler = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <View>
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={() => pressHandler("ToDoList")}>
                <Text>Go to ToDoList</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pressHandler("MonthlyCalendar")}>
                <Text>Go to MonthlyCalendar</Text>
            </TouchableOpacity>
        </View>
    )
}