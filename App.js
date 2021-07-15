import 'react-native-gesture-handler';
import React from 'react'
import MainNav from './src/navigation/MainNav'
import { AuthProvider } from "./src/screens/auth/AuthContext"


export default function App() {

  return (
    <AuthProvider>
      <MainNav />
    </AuthProvider>

  );
}