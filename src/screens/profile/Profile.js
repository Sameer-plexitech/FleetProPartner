import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileHeader from './components/ProfileHeader';
import ProfileIdentityCard from './components/ProfileIdentityCard';
import ProfileMetaCard from './components/ProfileMetaCard';
import PartnerManagerCard from './components/PartnerManagerCard';
import { managerDetails, profileMetaCards, profileUser } from './profileData';
import { styles } from './profileStyles';

const Profile = () => {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    navigation.getParent()?.openDrawer();
  };

  const handleLogoutPress = () => {
    const rootNavigation = navigation.getParent()?.getParent();

    if (rootNavigation) {
      rootNavigation.navigate('onBoard');
      return;
    }

    navigation.navigate('onBoard');
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        onMenuPress={handleMenuPress}
        onNotificationPress={() => null}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <ProfileIdentityCard user={profileUser} />

        <View style={styles.cardStack}>
          {profileMetaCards.map(item => (
            <ProfileMetaCard key={item.key} item={item} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Driver Partner Manager</Text>
        <PartnerManagerCard details={managerDetails} />

        <View style={styles.logoutWrap}>
          <TouchableOpacity
            activeOpacity={0.84}
            style={styles.logoutButton}
            onPress={handleLogoutPress}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
