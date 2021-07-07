import 'react-native-gesture-handler';
import React, { useEffect, useState, Button } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../screens/main/Profile.js';

import Burger from "../shared/Burger.js"
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

// This is just to give the Profile page a header

export default function ProfileStack({ navigation }) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile}
                options={{
                    title: "Profile",
                    headerLeft: () => (
                        <Burger navigation={navigation} />
                    )
                }} />
        </Stack.Navigator>
    );
}
