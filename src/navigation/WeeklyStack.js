import 'react-native-gesture-handler';
import React, { useEffect, useState, Button } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Navigator from "./src/routes/MainRoute"
import {
    HomeScreen, MonthlyCalendar,
    ToDoList, DailyView,
    HomeMonthly,
    Mood, InputToDoList,
    Schedule
} from '../screens'
import { MaterialIcons } from '@expo/vector-icons';
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator();


export default function WeeklyStack({ navigation }) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Weekly View" component={HomeScreen}
                options={{
                    title: "Weekly View",
                    headerLeft: () => (
                        <MaterialIcons name='menu' size={28} onPress={() => { navigation.openDrawer() }} />
                    )
                }}
            />
            {/* {props => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen> */}
            <Stack.Screen name="MonthlyCalendar" component={MonthlyCalendar} />
            <Stack.Screen name="ToDoList" component={ToDoList} />
            <Stack.Screen name="DailyView" component={DailyView} />
            <Stack.Screen name="HomeMonthly" component={HomeMonthly} />

            <Stack.Screen name="InputToDoList" component={InputToDoList} />
            <Stack.Screen name="Mood" component={Mood} />
            <Stack.Screen name="Schedule" component={Schedule} />
        </Stack.Navigator>
    );
}