import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { heightPixel } from '../../../utility/fonts';
import { styles } from './sidebarStyles';

const SidebarMenuItem = ({ item, isLastItem, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.78}
      style={[styles.menuItem, isLastItem ? styles.menuItemLast : null]}
      onPress={() => onPress?.(item)}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuItemIconWrap}>
          <Feather name={item.icon} size={heightPixel(18)} color="#2B0187" />
        </View>
        <Text style={styles.menuItemLabel}>{item.label}</Text>
      </View>

      <Feather name="chevron-right" size={heightPixel(14)} color="#7F7F7F" />
    </TouchableOpacity>
  );
};

export default SidebarMenuItem;
