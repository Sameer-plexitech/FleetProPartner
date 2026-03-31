import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import ResetPassword from './ResetPassword';

const Stack = createNativeStackNavigator();


const OnBoardContainer = () => {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={"Login"}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
    )
}

export default OnBoardContainer

const styles = StyleSheet.create({})