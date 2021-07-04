import 'react-native-gesture-handler';
import React, { useEffect, useState, Button } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// import Navigator from "./src/routes/MainRoute"
import { LoginScreen, HomeScreen, RegistrationScreen, MonthlyCalendar, ToDoList } from './src/screens'
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

import { db, auth } from './src/firebase/config'

const Stack = createStackNavigator();

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
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" >
              {props => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="MonthlyCalendar" component={MonthlyCalendar} />
            <Stack.Screen name="ToDoList" component={ToDoList} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}