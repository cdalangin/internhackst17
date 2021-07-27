import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import 'firebase/firestore';
import { AuthContext } from '../../screens/auth/AuthContext';

import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EmptyItem(props) {
    const [isVisible, setisVisible] = useState(false)
    // eventCT={eventCT} taskCT={taskCT}
    const eventCT = props.eventCT
    const taskCT = props.taskCT

    const pressPlusButton = () => {
        setisVisible(!isVisible)
    }

    const pressHandler = (location) => {
        const navigation = props.nav
        navigation.navigate(location)
    }

    return (
        <View style={style.container}>
            <View>
                <Pressable style={style.buttona} onPress={() => { pressPlusButton() }}>
                    <AntDesign name="pluscircle" size={60} color="#9a76a5" />
                </Pressable>
            </View>
            <View>
                {
                    isVisible ?
                        <>
                            <Pressable style={style.buttonb} onPress={() => { pressHandler("InputToDoList") }}>
                                <AntDesign name="checkcircle" size={50} color="#9a76a5" />
                            </Pressable>
                            <Pressable style={style.buttonc} onPress={() => { pressHandler("Schedule") }}>
                                <AntDesign name="clockcircle" size={50} color="#9a76a5" />
                            </Pressable>
                        </>
                        : null

                }
            </View>

        </View>
    )
}

// TODO: Make animation of buttons smoother
// Add mood if you have more time

const style = StyleSheet.create({
    container: {
        position: "absolute",
        alignItems: "center",
    },
    buttona: {
        position: "absolute",
        top: windowHeight - 160,
        left: windowWidth / 2 - 30,
        alignItems: "center",
        shadowRadius: 10,
        shadowColor: "#9a76a5",
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 }
    },
    buttonb: {
        position: "absolute",
        top: windowHeight - 210,
        left: windowWidth / 2 - 120,
        alignItems: "center",
        shadowRadius: 10,
        shadowColor: "#9a76a5",
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 }
    },
    buttonc: {
        position: "absolute",
        top: windowHeight - 210,
        left: windowWidth / 2 + 60,
        alignItems: "center",
        shadowRadius: 10,
        shadowColor: "#9a76a5",
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 }
    }
})
