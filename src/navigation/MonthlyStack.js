import 'react-native-gesture-handler';
import React, { useEffect, useState, Button } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  MonthlyCalendar, DailyView,
  HomeMonthly,
  Mood, InputToDoList,
  Schedule
} from '../screens'
import Burger from "../shared/Burger.js"

import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

// These are the screens that go on top of each other in the Monthly View

export default function MonthlyStack({ navigation }) {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Monthly View" component={HomeMonthly}
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