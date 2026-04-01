import React from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { heightPixel } from '../../../utility/fonts';
import { styles } from '../transactionHistoryStyles';
import Svg, { Path, Rect } from 'react-native-svg';

const formatAmount = amount => {
  const value = Number(amount) || 0;
  return `${value.toLocaleString('en-IN')}/-`;
};

const TransactionSummaryCard = ({ summary }) => {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryIconWrap}>
        <Svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
          <Rect x="0.5" y="0.5" width="37" height="37" rx="18.5" stroke="#2B0187" />
          <Path d="M11.0002 9.57155C11.0002 8.70229 11.7152 8 12.6002 8H25.8C26.465 8 27 8.52549 27 9.17866C27 9.83184 26.465 10.3573 25.8 10.3573H21.9651C22.85 11.3297 23.47 12.5477 23.7 13.8933H25.8C26.465 13.8933 27 14.4188 27 15.072C27 15.7251 26.465 16.2506 25.8 16.2506H23.7C23.18 19.3053 20.6601 21.697 17.5101 22.0899L24.73 27.1532C25.45 27.6591 25.615 28.6413 25.1 29.3436C24.585 30.0459 23.585 30.2129 22.87 29.707L11.6702 21.8493C11.1052 21.4564 10.8652 20.7443 11.0752 20.0911C11.2852 19.4379 11.9052 19.0008 12.6002 19.0008H16.6001C18.3901 19.0008 19.9051 17.8467 20.4151 16.2506H12.2002C11.5352 16.2506 11.0002 15.7251 11.0002 15.072C11.0002 14.4188 11.5352 13.8933 12.2002 13.8933H20.4151C19.9051 12.2972 18.3901 11.1431 16.6001 11.1431H12.6002C11.7152 11.1431 11.0002 10.4408 11.0002 9.57155Z" fill="#2B0187" />
        </Svg>
      </View>

      <View style={styles.summaryTextWrap}>
        <Text style={styles.summaryTitle}>{summary.title}</Text>
        <Text style={styles.summaryAmount}>{formatAmount(summary.amount)}</Text>
      </View>
    </View>
  );
};

export default TransactionSummaryCard;
