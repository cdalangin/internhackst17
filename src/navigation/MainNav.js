import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from "../screens/auth/LoginScreen"
import RegistrationScreen from "../screens/auth/RegistrationScreen"
import MonthlyStack from "./MonthlyStack"
import ProfileStack from "./ProfileStack"
import WeeklyStack from "./WeeklyStack"

import { auth } from '../firebase/config'

import { AuthContext } from "../screens/auth/AuthContext"
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// TODO: Make a loading screen

export default function MainNav() {

    const { user, setUser } = useContext(AuthContext)
    const [initializing, setInitializing] = useState(true)


    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    };

    // console.warn(auth.onAuthStateChanged(onAuthStateChanged))

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        // console.warn(subscriber)
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) {
        <>
            <Text>LOADING SCREEN</Text>
        </>
    }

    return (
        <NavigationContainer>
            {user ? (
                <>
                    <Drawer.Navigator drawerStyle={{
                        backgroundColor: '#E6E6FA',
                        width: 240,
                    }} drawerContentOptions={{
                        activeTintColor: "#E6E6FA",
                        activeBackgroundColor: "#9A76A5",
                        inactiveTintColor: "#9A76A5"
                    }}>
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