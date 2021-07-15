import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState, Button } from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from "../screens/auth/LoginScreen"
import RegistrationScreen from "../screens/auth/RegistrationScreen"
import MonthlyStack from "./MonthlyStack"
import ProfileStack from "./ProfileStack"
import WeeklyStack from "./WeeklyStack"

import { db, auth } from '../firebase/config'

import { AuthContext } from "../screens/auth/AuthContext"

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// TODO: Make a loading screen

export default function MainNav() {

    const { user, setUser } = useContext(AuthContext)
    const [initializing, setInitializing] = useState(true)

    // const onStateChanged = (user) => {
    //     setUser(user)
    //     if (initializing) { setInitializing(false); }
    // }

    // useEffect(() => {
    //     // const usersRef = db.collection('users');
    //     auth.onAuthStateChanged(onStateChanged)


    // }, []);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // useEffect(() => {
    //     const usersRef = db.collection('users');
    //     const subscription = auth.onAuthStateChanged(user => {
    //         console.log(user)
    //         if (user) {
    //             usersRef
    //                 .doc(user.uid)
    //                 .get()
    //                 .then((document) => {
    //                     const userData = document.data()
    //                     setLoading(false)
    //                     setUser(user)
    //                     console.log("setting user")
    //                 })
    //                 .catch((error) => {
    //                     setInitializing(false)
    //                 });
    //         } else {
    //             setInitializing(false)
    //         }
    //     });
    //     return subscription
    // }, []);

    if (initializing) {
        <>
            <Text>LOADING SCREEN</Text>
        </>
    }

    return (
        <NavigationContainer>
            {user ? (
                <>
                    <Drawer.Navigator>
                        <Drawer.Screen name="Weekly View" component={WeeklyStack} />
                        <Drawer.Screen name="Monthly View" component={MonthlyStack} />
                        <Drawer.Screen name="Profile" component={ProfileStack} />

                    </Drawer.Navigator>
                </>
            ) : (
                <>
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={LoginScreen}
                            options={{
                                title: 'Sign in',
                                animationTypeForReplace: !user ? 'pop' : 'push',
                            }} />
                        <Stack.Screen name="Registration" component={RegistrationScreen}
                            options={{
                                title: 'Sign up',
                                // animationTypeForReplace: !user ? 'pop' : 'push',
                            }} />
                    </Stack.Navigator>
                </>
            )}
        </NavigationContainer>
    );
}