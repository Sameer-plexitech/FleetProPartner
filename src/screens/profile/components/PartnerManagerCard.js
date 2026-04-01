import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../profileStyles';

const PartnerManagerCard = ({ details }) => {
  return (
    <View style={styles.managerCard}>
      {details.map(item => (
        <View key={item.key} style={styles.managerRow}>
          <Text style={styles.managerLabel}>{item.label}</Text>
          <Text style={styles.managerValue}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

export default PartnerManagerCard;
