import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './home/Home';

const Stack = createNativeStackNavigator();

console.log("MainStack rendered");

export default function MainStack() {

  console.log("MainStack rendered 1");

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}