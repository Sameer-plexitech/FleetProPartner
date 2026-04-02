import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../collectPaymentStyles';

const CollectPaymentProfile = ({ profile }) => {
  const initials = React.useMemo(() => {
    const name = `${profile.firstName} ${profile.lastName}`.trim();
    const splitName = name.split(' ').filter(Boolean);

    if (splitName.length === 0) {
      return 'U';
    }
    if (splitName.length === 1) {
      return splitName[0][0]?.toUpperCase() || 'U';
    }

    return `${splitName[0][0] || ''}${splitName[1][0] || ''}`.toUpperCase();
  }, [profile.firstName, profile.lastName]);

  return (
    <View style={styles.profileWrap}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text style={styles.profileLineTop}>Partner Name</Text>
      <Text style={styles.profileLineMid}>{profile.lastName}</Text>
      <Text style={styles.profileLineBottom}>{profile.employeeId}</Text>
    </View>
  );
};

export default CollectPaymentProfile;
