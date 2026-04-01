import React from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from '../contactUsStyles';

const LocationSelectorModal = ({
  visible,
  options,
  selectedLocation,
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
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Select Location</Text>

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.modalList}
                contentContainerStyle={styles.modalListContent}
              >
                {options.map(option => {
                  const isActive = option === selectedLocation;

                  return (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.modalOption,
                        isActive ? styles.modalOptionActive : null,
                      ]}
                      onPress={() => onSelect(option)}
                    >
                      <Text
                        style={[
                          styles.modalOptionText,
                          isActive ? styles.modalOptionTextActive : null,
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

export default LocationSelectorModal;
