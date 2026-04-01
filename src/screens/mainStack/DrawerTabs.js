import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import CustomDrawerContent from './sidebar/CustomDrawerContent';

const Drawer = createDrawerNavigator();
const renderDrawerContent = props => <CustomDrawerContent {...props} />;

export default function DrawerTabs() {
  return (
    <Drawer.Navigator
      drawerContent={renderDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: '100%',
          backgroundColor: '#FFFFFF',
        },
        overlayColor: 'rgba(0,0,0,0.35)',
      }}
    >
      <Drawer.Screen name="BottomTabs" component={BottomTabs} />
    </Drawer.Navigator>
  );
}
