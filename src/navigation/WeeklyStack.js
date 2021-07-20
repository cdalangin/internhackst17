import 'react-native-gesture-handler';
import React, { useEffect, useState, Button } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeWeekly from '../screens/main/HomeWeekly';
import MonthlyCalendar from '../shared/MonthlyCalendar';
import DailyView from "../screens/main/DailyView"
import ToDoList from "../shared/ToDoList"
import HomeMonthly from '../screens/main/HomeMonthly';
import Mood from "../screens/forms/Mood"
import InputToDoList from "../screens/forms/InputToDoList"
import Schedule from "../screens/forms/Schedule"

import Burger from "../shared/Burger.js"


const Stack = createStackNavigator();

// These are the screens that go on top of each other in the Weekly View

export default function WeeklyStack({ navigation }) {

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { elevation: 0, backgroundColor: '#EEDCFD', },
            headerTitleStyle: { color: "#9A76A5" },
            headerTintColor: { color: "#9A76A5" },
            cardStyle: { backgroundColor: '#EEDCFD' }
        }}>
            <Stack.Screen name="Weekly View" component={HomeWeekly}
                options={{
                    title: "Weekly View",
                    headerLeft: () => (
                        <Burger navigation={navigation} />
                    )
                }}
            />
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