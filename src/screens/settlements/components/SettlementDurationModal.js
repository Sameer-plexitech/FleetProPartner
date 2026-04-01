import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from '../settlementStyles';

const SettlementDurationModal = ({
  visible,
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
            <View style={styles.durationModalCard}>
              <Text style={styles.modalTitle}>Select Duration</Text>

              <View style={styles.durationOptionsWrap}>
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
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SettlementDurationModal;
