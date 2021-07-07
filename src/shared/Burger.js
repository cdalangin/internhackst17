import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Burger({ navigation }) {

    return (
        <MaterialIcons name='menu' size={28} style={styles.icon} onPress={() => { navigation.openDrawer() }} />
    )
}

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        left: 16
    }
})