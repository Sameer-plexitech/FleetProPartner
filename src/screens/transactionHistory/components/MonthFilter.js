import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { heightPixel } from '../../../utility/fonts';
import { styles } from '../transactionHistoryStyles';

const MonthFilter = ({ selectedMonth, onMonthPress, onApplyPress }) => {
  return (
    <View style={styles.filterWrap}>
      <Text style={styles.filterLabel}>Month</Text>

      <View style={styles.filterRow}>
        <TouchableOpacity onPress={onMonthPress} style={styles.monthSelector}>
          <Text style={styles.monthText}>{selectedMonth}</Text>
          <Feather name="chevron-down" size={heightPixel(12)} color="#555555" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onApplyPress} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MonthFilter;
