import React from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from '../transactionHistoryStyles';

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const MonthYearPickerModal = ({
  visible,
  selectedMonth,
  selectedYear,
  years,
  onSelectMonth,
  onSelectYear,
  onCancel,
  onDone,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.monthPickerBackdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.monthPickerCard}>
              <Text style={styles.monthPickerTitle}>Select Month & Year</Text>

              <View style={styles.monthGrid}>
                {MONTH_NAMES.map((label, index) => {
                  const isSelected = selectedMonth === index;

                  return (
                    <TouchableOpacity
                      key={label}
                      style={[
                        styles.monthChip,
                        isSelected ? styles.monthChipActive : null,
                      ]}
                      onPress={() => onSelectMonth(index)}
                    >
                      <Text
                        style={[
                          styles.monthChipText,
                          isSelected ? styles.monthChipTextActive : null,
                        ]}
                      >
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.yearPickerTitle}>Year</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.yearList}
              >
                {years.map(year => {
                  const isSelected = selectedYear === year;

                  return (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.yearChip,
                        isSelected ? styles.yearChipActive : null,
                      ]}
                      onPress={() => onSelectYear(year)}
                    >
                      <Text
                        style={[
                          styles.yearChipText,
                          isSelected ? styles.yearChipTextActive : null,
                        ]}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View style={styles.monthPickerActions}>
                <TouchableOpacity
                  style={[styles.monthPickerButton, styles.cancelButton]}
                  onPress={onCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.monthPickerButton, styles.doneButton]}
                  onPress={onDone}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MonthYearPickerModal;
