import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import CustomDrawerContent from './sidebar/CustomDrawerContent';
import TransactionHistory from '../transactionHistory/TransactionHistory';
import Settlements from '../settlements/Settlements';
import Attendance from '../attendance/Attendance';
import ContactUs from '../contactUs/ContactUs';

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
      <Drawer.Screen name="Settlements" component={Settlements} />
      <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
      <Drawer.Screen name="Attendance" component={Attendance} />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
    </Drawer.Navigator>
  );
}
