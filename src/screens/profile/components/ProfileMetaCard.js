import React from 'react';
import { Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { heightPixel } from '../../../utility/fonts';
import { styles } from '../profileStyles';
import Svg, { Path } from 'react-native-svg';

const ProfileMetaCard = ({ item }) => {
  const isUberCard = item.type === 'uber';

  return (
    <View style={styles.miniCard}>
      {isUberCard ? (
        <View style={styles.miniCardUberBadge}>
          <Text style={styles.miniCardUberText}>uber</Text>
        </View>
      ) : (
        <View style={styles.miniCardIconWrap}>
          <Svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
            <Path d="M15.9 1C15.7 0.4 15.1 0 14.5 0H3.5C2.8 0 2.3 0.4 2.1 1L0 7V15C0 15.5 0.5 16 1 16H2C2.6 16 3 15.5 3 15V14H15V15C15 15.5 15.5 16 16 16H17C17.5 16 18 15.5 18 15V7L15.9 1ZM3.8 2H14.1L15.2 5H2.8L3.8 2ZM16 12H2V7H16V12ZM4.5 8C5.3 8 6 8.7 6 9.5C6 10.3 5.3 11 4.5 11C3.7 11 3 10.3 3 9.5C3 8.7 3.7 8 4.5 8ZM13.5 8C14.3 8 15 8.7 15 9.5C15 10.3 14.3 11 13.5 11C12.7 11 12 10.3 12 9.5C12 8.7 12.7 8 13.5 8Z" fill="#6420AA" />
          </Svg>
        </View>
      )}

      <View style={styles.miniCardContent}>
        <Text style={styles.miniCardLabel}>{item.label}</Text>
        <Text style={styles.miniCardValue}>{item.value}</Text>
      </View>

    </View>
  );
};

export default ProfileMetaCard;
