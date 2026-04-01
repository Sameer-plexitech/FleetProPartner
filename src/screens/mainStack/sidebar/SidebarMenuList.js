import React from 'react';
import { View } from 'react-native';
import SidebarMenuItem from './SidebarMenuItem';
import { styles } from './sidebarStyles';

const SidebarMenuList = ({ items, onItemPress }) => {
  return (
    <View style={styles.menuCard}>
      {items.map((item, index) => (
        <SidebarMenuItem
          key={item.key}
          item={item}
          isLastItem={index === items.length - 1}
          onPress={onItemPress}
        />
      ))}
    </View>
  );
};

export default SidebarMenuList;
