import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Home from '../home/Home';
import Trips from '../trips/Trips';
import Profile from '../profile/Profile';
import { fontPixel, heightPixel } from '../../utility/fonts';

const Tab = createBottomTabNavigator();

const tabScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ color, size }) => {
    let iconName = 'home';

    if (route.name === 'Home') {
      iconName = 'home';
    } else if (route.name === 'Trips') {
      iconName = 'map';
    } else if (route.name === 'Profile') {
      iconName = 'user';
    }

    return <Feather name={iconName} size={size} color={color} />;
  },
});

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...tabScreenOptions({ route }),
        tabBarActiveTintColor: '#5C2BB8',
        tabBarInactiveTintColor: '#323232',
        tabBarLabelStyle: {
          fontSize: fontPixel(10),
          fontWeight: '500',
          marginBottom: heightPixel(2),
        },
        tabBarStyle: {
          height: heightPixel(56),
          paddingTop: heightPixel(4),
          paddingBottom: heightPixel(4),
          borderTopWidth: 1,
          borderTopColor: '#D8D8D8',
          backgroundColor: '#FFFFFF',
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Trips" component={Trips} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
