import 'react-native-gesture-handler';
import React from 'react'
import { LogBox } from 'react-native';
import MainNav from './src/navigation/MainNav'
import { AuthProvider } from "./src/screens/auth/AuthContext"


export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <AuthProvider>
      <MainNav />
    </AuthProvider>

  );
}