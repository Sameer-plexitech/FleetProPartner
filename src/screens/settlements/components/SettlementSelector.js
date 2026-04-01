import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { heightPixel } from '../../../utility/fonts';
import { styles } from '../settlementStyles';

const SettlementSelector = ({ label, value, onPress }) => {
  return (
    <View style={styles.filterItem}>
      <Text style={styles.filterLabel}>{label}</Text>

      <TouchableOpacity style={styles.selectorButton} onPress={onPress}>
        <Text style={styles.selectorValue}>{value}</Text>
        <Feather name="chevron-down" size={heightPixel(16)} color="#5C5C5C" />
      </TouchableOpacity>
    </View>
  );
};

export default SettlementSelector;
