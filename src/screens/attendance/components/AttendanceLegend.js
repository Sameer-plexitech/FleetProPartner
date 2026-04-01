import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { heightPixel } from '../../../utility/fonts';
import { styles } from '../attendanceStyles';

const AttendanceLegend = ({ items, onAddPress }) => {
  return (
    <View style={styles.legendRow}>
      {items.map(item => (
        <View
          key={item.key}
          style={[styles.legendChip, { backgroundColor: item.bg }]}
        >
          <Text style={[styles.legendChipText, { color: item.text }]}>
            {item.label}
          </Text>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Feather name="plus" size={heightPixel(14)} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default AttendanceLegend;
