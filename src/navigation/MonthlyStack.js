import 'react-native-gesture-handler';
import React, { useEffect, useState, Button } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import MonthlyCalendar from "../screens/main/MonthlyCalendar"
import HomeMonthly from '../screens/main/HomeMonthly';
import DailyView from "../screens/main/DailyView"
import Mood from "../screens/forms/Mood"
import InputToDoList from "../screens/forms/InputToDoList"
import Schedule from "../screens/forms/Schedule"
import Burger from "../shared/Burger.js"

const Stack = createStackNavigator();

// These are the screens that go on top of each other in the Monthly View

export default function MonthlyStack({ navigation }) {

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMonthly" component={HomeMonthly}
        options={{
          title: "Monthly View",
          headerLeft: () => (
            <Burger navigation={navigation} />
          )
        }} />
      <Stack.Screen name="MonthlyCalendar" component={MonthlyCalendar} />
      <Stack.Screen name="DailyView" component={DailyView} />

      <Stack.Screen name="InputToDoList" component={InputToDoList} />
      <Stack.Screen name="Mood" component={Mood} />
      <Stack.Screen name="Schedule" component={Schedule} />
    </Stack.Navigator>
  );
}