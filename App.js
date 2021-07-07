import 'react-native-gesture-handler';
import React, { useEffect, useState, Button } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Navigator from "./src/routes/MainRoute"
import {
  LoginScreen, RegistrationScreen,
  MonthlyStack, ProfileStack, WeeklyStack
} from './src/screens'

import Header from './src/shared/Header.js'
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

import { db, auth } from './src/firebase/config'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// TODO: Make a loading screen

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // if (!loading) {
  //   return (
  //     <>
  //     <h1>HElooOOO</h1>
  //     </>
  //   )
  // }

  useEffect(() => {
    const usersRef = db.collection('users');
    auth.onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <>
          <Drawer.Navigator>
            <Drawer.Screen name="Weekly View" component={WeeklyStack} />
            <Drawer.Screen name="MonthlyView" component={MonthlyStack} />
            <Drawer.Screen name="Profile" component={ProfileStack} />

          </Drawer.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}