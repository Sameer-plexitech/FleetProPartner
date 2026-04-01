import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { heightPixel } from '../../utility/fonts';
import ContactUsHeader from './components/ContactUsHeader';
import ContactInfoCard from './components/ContactInfoCard';
import LocationSelectorModal from './components/LocationSelectorModal';
import { CONTACT_ITEMS, LOCATION_OPTIONS } from './contactUsData';
import { styles } from './contactUsStyles';

const ContactUs = () => {
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = React.useState(
    LOCATION_OPTIONS[0],
  );
  const [isLocationModalVisible, setIsLocationModalVisible] =
    React.useState(false);

  return (
    <View style={styles.container}>
      <ContactUsHeader
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={() => null}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.selectorWrap}>
          <Text style={styles.selectorLabel}>Location</Text>
          <TouchableOpacity
            style={styles.selectorButton}
            onPress={() => setIsLocationModalVisible(true)}
          >
            <Text style={styles.selectorValue}>{selectedLocation}</Text>
            <Feather
              name="chevron-down"
              size={heightPixel(14)}
              color="#5A5A5A"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardList}>
          {CONTACT_ITEMS.map(item => (
            <ContactInfoCard key={item.key} item={item} />
          ))}
        </View>
      </ScrollView>

      <LocationSelectorModal
        visible={isLocationModalVisible}
        options={LOCATION_OPTIONS}
        selectedLocation={selectedLocation}
        onSelect={location => {
          setSelectedLocation(location);
          setIsLocationModalVisible(false);
        }}
        onClose={() => setIsLocationModalVisible(false)}
      />
    </View>
  );
};

export default ContactUs;
