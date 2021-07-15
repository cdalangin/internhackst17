import 'react-native-gesture-handler';
import React, { useEffect, useState, Button } from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from "./src/screens/auth/LoginScreen"
import RegistrationScreen from "./src/screens/auth/RegistrationScreen"
import MonthlyStack from "./src/navigation/MonthlyStack"
import ProfileStack from "./src/navigation/ProfileStack"
import WeeklyStack from "./src/navigation/WeeklyStack"

import { db, auth } from './src/firebase/config'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// TODO: Make a loading screen

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)



  useEffect(() => {
    const usersRef = db.collection('users');
    auth.onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
            console.log("setting user")
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <>
        <Text>LOADING SCREEN</Text>
      </>
    )
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