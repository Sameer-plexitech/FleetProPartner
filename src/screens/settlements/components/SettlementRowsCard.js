import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../settlementStyles';

const formatAmount = value => {
  const parsed = Number(value) || 0;
  return parsed.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const SettlementRowsCard = ({ rows }) => {
  return (
    <View style={styles.rowsCard}>
      {rows.map((row, index) => (
        <View
          key={row.id}
          style={[
            styles.rowItem,
            index === rows.length - 1 ? styles.rowItemLast : null,
          ]}
        >
          <View style={styles.rowLeft}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{row.id}</Text>
            </View>

            <Text
              style={[
                styles.rowTitle,
                row.isStrong ? styles.rowTitleStrong : null,
              ]}
            >
              {row.title}
            </Text>
          </View>

          <Text style={styles.rowAmount}>{formatAmount(row.amount)}</Text>
        </View>
      ))}
    </View>
  );
};

export default SettlementRowsCard;
