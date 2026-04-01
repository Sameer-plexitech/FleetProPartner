import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { fontPixel, heightPixel, widthPixel } from '../../../utility/fonts';

const STATUS_COLORS = {
  Completed: {
    text: '#129F45',
    border: '#129F45',
    background: '#D9F6E2',
  },
  Pending: {
    text: '#B16A00',
    border: '#B16A00',
    background: '#FFF1DB',
  },
  Cancelled: {
    text: '#B3251E',
    border: '#B3251E',
    background: '#FFE4E2',
  },
};

const formatCurrency = amount => {
  const value = Number(amount) || 0;
  return `\u20B9 ${value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const getStatusStyle = status => {
  return STATUS_COLORS[status] || STATUS_COLORS.Completed;
};

const TripCard = ({ trip }) => {
  const statusStyle = getStatusStyle(trip.status);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.tripId}>#{trip.id}</Text>

        <View
          style={[
            styles.statusPill,
            {
              borderColor: statusStyle.border,
              backgroundColor: statusStyle.background,
            },
          ]}
        >
          <Text style={[styles.statusText, { color: statusStyle.text }]}>
            {trip.status}
          </Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Feather name="calendar" size={heightPixel(13)} color="#6A6A6A" />
          <Text style={styles.metaText}>{trip.tripDateTime}</Text>
        </View>

        <View style={styles.metaItem}>
          <Feather name="map-pin" size={heightPixel(13)} color="#6A6A6A" />
          <Text style={styles.metaText}>{`${trip.distanceKm} KM`}</Text>
        </View>
      </View>

      <View style={styles.earningRow}>
        <View>
          <Text style={styles.earningLabel}>Total Earnings</Text>
          <Text style={styles.earningValue}>
            {formatCurrency(trip.totalEarnings)}
          </Text>
        </View>

        <View style={styles.tripPill}>
          <Text style={styles.tripPillText}>{trip.tripTypeLabel}</Text>
        </View>
      </View>

      <View style={styles.breakdownRow}>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Toll</Text>
          <Text style={styles.breakdownValue}>{formatCurrency(trip.toll)}</Text>
        </View>

        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Tip</Text>
          <Text style={styles.breakdownValue}>{formatCurrency(trip.tip)}</Text>
        </View>

        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Cash</Text>
          <Text style={styles.breakdownValue}>{formatCurrency(trip.cash)}</Text>
        </View>

        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Adjusted Amt.</Text>
          <Text style={styles.breakdownValue}>
            {formatCurrency(trip.adjustedAmount)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TripCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: widthPixel(12),
    paddingHorizontal: widthPixel(14),
    paddingVertical: heightPixel(12),
    backgroundColor: 'white',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripId: {
    color: '#1A1A1A',
    fontSize: fontPixel(14),
    fontWeight: '800',
  },
  statusPill: {
    minWidth: widthPixel(90),
    height: heightPixel(28),
    borderRadius: widthPixel(14),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthPixel(10),
  },
  statusText: {
    fontSize: fontPixel(12),
    fontWeight: '600',
  },
  metaRow: {
    // marginTop: heightPixel(8),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: widthPixel(16),
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: widthPixel(4),
    color: '#6A6A6A',
    fontSize: fontPixel(12),
    fontWeight: '500',
  },
  earningRow: {
    marginTop: heightPixel(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earningLabel: {
    color: '#5B5B5B',
    fontSize: fontPixel(12),
  },
  earningValue: {
    marginTop: heightPixel(2),
    color: '#1B1B1B',
    fontSize: fontPixel(16),
    fontWeight: '700',
  },
  tripPill: {
    minWidth: widthPixel(60),
    height: heightPixel(24),
    borderRadius: widthPixel(14),
    borderWidth: 1,
    borderColor: '#787878',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthPixel(10),
    backgroundColor: '#EBEBEB',
  },
  tripPillText: {
    color: '#3B3B3B',
    fontSize: fontPixel(12),
    fontWeight: '500',
  },
  breakdownRow: {
    marginTop: heightPixel(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    columnGap: widthPixel(8),
  },
  breakdownItem: {
    flex: 1,
  },
  breakdownLabel: {
    color: '#666666',
    fontSize: fontPixel(12),
  },
  breakdownValue: {
    marginTop: heightPixel(1),
    color: '#1B1B1B',
    fontSize: fontPixel(13),
    fontWeight: '700',
  },
});
