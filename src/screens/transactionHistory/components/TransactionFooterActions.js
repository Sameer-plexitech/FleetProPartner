import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../transactionHistoryStyles';

const TransactionFooterActions = ({
  onPayNowPress,
  onCollectPaymentPress,
  footerPaddingBottom,
}) => {
  const footerStyle = React.useMemo(
    () => [styles.footer, { paddingBottom: footerPaddingBottom }],
    [footerPaddingBottom],
  );

  return (
    <View style={footerStyle}>
      <TouchableOpacity
        style={[styles.footerButton, styles.footerButtonGap]}
        onPress={onPayNowPress}
      >
        <Text style={styles.footerButtonText}>Pay Now</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={onCollectPaymentPress}
      >
        <Text style={styles.footerButtonText}>Collect Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionFooterActions;
