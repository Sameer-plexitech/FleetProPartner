import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { fontPixel, heightPixel, widthPixel } from '../../utility/fonts';
import TripCard from '../home/components/TripCard';
import { tripsTabData } from './tripsTabData';

const ListSeparator = () => <View style={styles.separator} />;

const Trips = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000088', '#6420AA']} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.headerIconWrap}
        >
          <Feather name="menu" size={heightPixel(14)} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Trips</Text>

        <TouchableOpacity style={styles.headerIconWrap}>
          <Ionicons
            name="notifications-outline"
            size={heightPixel(14)}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </LinearGradient>

      <FlatList
        data={tripsTabData}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TripCard trip={item} />}
        ItemSeparatorComponent={ListSeparator}
      />
    </View>
  );
};

export default Trips;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
  },
  header: {
    height: heightPixel(70),
    paddingHorizontal: widthPixel(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIconWrap: {
    height: heightPixel(38),
    width: widthPixel(38),
    borderRadius: widthPixel(50),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: fontPixel(20),
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: widthPixel(8),
    paddingTop: heightPixel(8),
    paddingBottom: heightPixel(16),
  },
  separator: {
    height: heightPixel(8),
  },
});
