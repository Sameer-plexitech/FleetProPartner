import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { heightPixel } from '../../../utility/fonts';
import { styles } from '../collectPaymentStyles';

const CollectPaymentHeader = ({ onMenuPress, onNotificationPress }) => {
  return (
    <LinearGradient colors={['#000088', '#6420AA']} style={styles.header}>
      <TouchableOpacity onPress={onMenuPress} style={styles.headerIconWrap}>
        <Feather name="menu" size={heightPixel(14)} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Collect Payment</Text>

      <TouchableOpacity
        onPress={onNotificationPress}
        style={styles.headerIconWrap}
      >
        <Ionicons
          name="notifications-outline"
          size={heightPixel(14)}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CollectPaymentHeader;
