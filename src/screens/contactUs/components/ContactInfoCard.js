import React from 'react';
import { Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { heightPixel } from '../../../utility/fonts';
import { styles } from '../contactUsStyles';

const ContactInfoCard = ({ item }) => {
  return (
    <View style={styles.contactCard}>
      <View style={styles.iconWrap}>
        <Feather name={item.icon} size={heightPixel(18)} color="#5A2CB8" />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        {item.value ? <Text style={styles.cardValue}>{item.value}</Text> : null}
      </View>
    </View>
  );
};

export default ContactInfoCard;
