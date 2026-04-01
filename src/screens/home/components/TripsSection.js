import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontPixel, heightPixel } from '../../../utility/fonts';
import TripCard from './TripCard';

const TripsSection = ({ title, trips }) => {
  return (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.cardsWrap}>
        {trips.map(trip => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </View>
    </View>
  );
};

export default TripsSection;

const styles = StyleSheet.create({
  sectionWrap: {
    marginTop: heightPixel(14),
  },
  sectionTitle: {
    color: '#1A1A1A',
    fontSize: fontPixel(16),
    fontWeight: '700',
    marginBottom: heightPixel(8),
  },
  cardsWrap: {
    rowGap: heightPixel(10),
  },
});
