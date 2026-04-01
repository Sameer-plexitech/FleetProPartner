import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SidebarHeader from './SidebarHeader';
import SidebarProfileCard from './SidebarProfileCard';
import SidebarMenuList from './SidebarMenuList';
import { SIDEBAR_MENU_ITEMS, SIDEBAR_USER } from './sidebarMenuData';
import { styles } from './sidebarStyles';
import { widthPixel } from '../../../utility/fonts';

const TAB_ROUTE_BY_MENU_KEY = {
  dashboard: 'Home',
  trips: 'Trips',
};

const CustomDrawerContent = ({ navigation, ...rest }) => {
  const insets = useSafeAreaInsets();

  const handleMenuPress = menuItem => {
    const tabRoute = TAB_ROUTE_BY_MENU_KEY[menuItem.key];

    if (tabRoute) {
      navigation.navigate('BottomTabs', { screen: tabRoute });
    }

    navigation.closeDrawer();
  };

  const handleLogoutPress = () => {
    navigation.closeDrawer();

    const parentNavigation = navigation.getParent();
    if (parentNavigation) {
      parentNavigation.navigate('onBoard');
      return;
    }

    navigation.navigate('onBoard');
  };

  return (
    <View style={styles.container}>
      <SidebarHeader
        onBackPress={() => navigation.closeDrawer()}
        onNotificationPress={() => navigation.closeDrawer()}
      />

      <DrawerContentScrollView
        {...rest}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={{ paddingHorizontal: widthPixel(10) }}
      >
        <SidebarProfileCard user={SIDEBAR_USER} />
        <SidebarMenuList
          items={SIDEBAR_MENU_ITEMS}
          onItemPress={handleMenuPress}
        />
      </DrawerContentScrollView>

      <View
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12), paddingHorizontal:widthPixel(22) }]}
      >
        <TouchableOpacity
          activeOpacity={0.84}
          style={styles.logoutButton}
          onPress={handleLogoutPress}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
