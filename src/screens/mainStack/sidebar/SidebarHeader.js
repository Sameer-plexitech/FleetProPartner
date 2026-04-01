import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { heightPixel } from '../../../utility/fonts';
import { styles } from './sidebarStyles';

const HEADER_GRADIENT = ['#000088', '#420087'];

const SidebarHeader = ({ onBackPress, onNotificationPress }) => {
  return (
    <LinearGradient colors={HEADER_GRADIENT} style={styles.header}>
      <View style={styles.headerInner}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onBackPress}
          style={styles.headerIconButton}
        >
          <Ionicons name="arrow-back" size={heightPixel(14)} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Menu</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onNotificationPress}
          style={styles.headerIconButton}
        >
          <Ionicons
            name="notifications-outline"
            size={heightPixel(14)}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SidebarHeader;
