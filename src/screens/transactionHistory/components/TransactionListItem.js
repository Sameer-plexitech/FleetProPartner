import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../transactionHistoryStyles';

const formatAmount = amount => {
  const value = Number(amount) || 0;
  return `\u20B9 ${value.toLocaleString('en-IN')}/-`;
};

const TransactionListItem = ({ item }) => {
  return (
    <View style={styles.transactionRow}>
      <View style={styles.rowLeft}>
        <Text style={styles.rowTitle}>{item.title}</Text>
        <Text style={styles.rowMeta}>{item.monthLabel}</Text>
        <Text style={styles.rowRef}>{item.referenceId}</Text>
      </View>

      <View style={styles.rowRight}>
        <Text style={styles.rowAmount}>{formatAmount(item.amount)}</Text>
        <Text style={styles.rowAmountType}>{item.amountTypeLabel}</Text>
      </View>
    </View>
  );
};

export default TransactionListItem;
