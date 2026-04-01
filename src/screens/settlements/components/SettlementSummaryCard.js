import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../settlementStyles';
import { truncateText } from '../../../utility/Helper';

const SettlementSummaryCard = ({ driverSummary, kpiFields }) => {
  return (
    <View style={{ flex: 1 }} >
      <View style={styles.summaryTop}>
        <View style={[styles.summaryTopItem, { width: '33%' }]}>
          <Text style={styles.summaryTopLabel}>Driver Name</Text>
          <Text style={styles.summaryTopValue}> {truncateText(driverSummary.driverName, 15)}</Text>
        </View>

        <View style={[styles.summaryTopItem, { width: '33%' }]}>
          <Text style={styles.summaryTopLabel}>Car No</Text>
          <Text style={styles.summaryTopValue}>{driverSummary.carNumber}</Text>
        </View>

        <View style={[styles.summaryTopItem, { width: '33%' }]}>
          <Text style={styles.summaryTopLabel}>Scheme</Text>
          <Text style={styles.summaryTopValue}>{driverSummary.scheme}</Text>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.kpiGrid}>
          {kpiFields.map(field => (
            <View key={field.key} style={styles.kpiCard}>
              <Text style={styles.kpiLabel}>{field.label}</Text>
              <Text style={styles.kpiValue}>{field.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>

  );
};

export default SettlementSummaryCard;
