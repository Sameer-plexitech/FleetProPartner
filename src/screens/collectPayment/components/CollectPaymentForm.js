import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../collectPaymentStyles';
import { _getVerticalPadding } from '../../../utility/Helper';

const CollectPaymentForm = ({ amount, onChangeAmount, onSubmit }) => {
  return (
    <View style={styles.formWrap}>
      <Text style={styles.amountLabel}>Amount *</Text>

      <View style={styles.inputWrap}>
        <Text style={styles.rupeeText}>{'\u20B9'}</Text>
        <TextInput
          value={amount}
          onChangeText={onChangeAmount}
          keyboardType="number-pad"
          placeholder="Enter Amount"
          placeholderTextColor="black"
          style={styles.amountInput}
        />
      </View>

      {_getVerticalPadding(16)}

      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Collect Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CollectPaymentForm;
