import 'react-native-gesture-handler';
import React, { useEffect, useState, Button } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Navigator from "./src/routes/MainRoute"
import Profile from '../screens/main/Profile.js';
import { MaterialIcons } from '@expo/vector-icons';
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator();


export default function ProfileStack({ navigation }) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile}
                options={{
                    title: "Profile",
                    headerLeft: () => (
                        <MaterialIcons name='menu' size={28} onPress={() => { navigation.openDrawer() }} />
                    )
                }} />
            {/* {props => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen> */}
        </Stack.Navigator>
    );
}