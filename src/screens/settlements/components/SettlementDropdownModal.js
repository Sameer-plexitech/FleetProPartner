import React from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from '../settlementStyles';

const SettlementDropdownModal = ({
  visible,
  title,
  options,
  selectedOption,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.dropdownModalCard}>
              <Text style={styles.modalTitle}>{title}</Text>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.dropdownListContent}
                style={styles.dropdownList}
              >
                {options.map(option => {
                  const isActive = option === selectedOption;

                  return (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.durationOptionItem,
                        isActive ? styles.durationOptionItemActive : null,
                      ]}
                      onPress={() => onSelect(option)}
                    >
                      <Text
                        style={[
                          styles.durationOptionText,
                          isActive ? styles.durationOptionTextActive : null,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SettlementDropdownModal;
