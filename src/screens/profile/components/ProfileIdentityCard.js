import React from 'react';
import { Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { heightPixel } from '../../../utility/fonts';
import { styles } from '../profileStyles';
import Svg, { Path } from 'react-native-svg';

const ProfileIdentityCard = ({ user }) => {
  return (
    <View style={styles.profileCard}>
      <View style={styles.profileRow}>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarInitials}>{user.initials}</Text>
          <View style={styles.avatarEditBadge}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <Path d="M1.55556 12.4444H2.66389L10.2667 4.84167L9.15833 3.73333L1.55556 11.3361V12.4444ZM0.777778 14C0.557407 14 0.372815 13.9253 0.224 13.776C0.0751853 13.6267 0.000518519 13.4421 0 13.2222V11.3361C0 11.1287 0.038889 10.9309 0.116667 10.7427C0.194445 10.5544 0.30463 10.3893 0.447222 10.2472L10.2667 0.447222C10.4222 0.30463 10.5941 0.194445 10.7823 0.116667C10.9706 0.038889 11.1681 0 11.375 0C11.5819 0 11.7828 0.038889 11.9778 0.116667C12.1727 0.194445 12.3413 0.311111 12.4833 0.466667L13.5528 1.55556C13.7083 1.69815 13.8216 1.86667 13.8927 2.06111C13.9637 2.25556 13.9995 2.45 14 2.64444C14 2.85185 13.9642 3.04967 13.8927 3.23789C13.8211 3.42611 13.7078 3.59774 13.5528 3.75278L3.75278 13.5528C3.61019 13.6954 3.44478 13.8056 3.25656 13.8833C3.06833 13.9611 2.87078 14 2.66389 14H0.777778ZM9.70278 4.29722L9.15833 3.73333L10.2667 4.84167L9.70278 4.29722Z" fill="white" />
            </Svg>
          </View>
        </View>

        <View style={styles.profileInfoWrap}>
          <View style={styles.infoRow}>
            <Feather name="user" size={heightPixel(14)} color="#592BB3" />
            <Text style={styles.infoText}>{user.fullName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="phone" size={heightPixel(14)} color="#592BB3" />
            <Text style={styles.infoText}>{user.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="mail" size={heightPixel(14)} color="#592BB3" />
            <Text style={styles.infoText}>{user.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Path d="M2 4.66667C2 4.13624 2.21071 3.62753 2.58579 3.25246C2.96086 2.87739 3.46957 2.66667 4 2.66667H12C12.5304 2.66667 13.0391 2.87739 13.4142 3.25246C13.7893 3.62753 14 4.13624 14 4.66667V11.3333C14 11.8638 13.7893 12.3725 13.4142 12.7476C13.0391 13.1226 12.5304 13.3333 12 13.3333H4C3.46957 13.3333 2.96086 13.1226 2.58579 12.7476C2.21071 12.3725 2 11.8638 2 11.3333V4.66667Z" stroke="#6420AA" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              <Path d="M9.99996 5.33334H11.3333M9.99996 8.00001H11.3333M4.66663 10.6667H11.3333M4.66663 6.66668C4.66663 7.0203 4.8071 7.35944 5.05715 7.60949C5.3072 7.85953 5.64634 8.00001 5.99996 8.00001C6.35358 8.00001 6.69272 7.85953 6.94277 7.60949C7.19282 7.35944 7.33329 7.0203 7.33329 6.66668C7.33329 6.31305 7.19282 5.97392 6.94277 5.72387C6.69272 5.47382 6.35358 5.33334 5.99996 5.33334C5.64634 5.33334 5.3072 5.47382 5.05715 5.72387C4.8071 5.97392 4.66663 6.31305 4.66663 6.66668Z" stroke="#6420AA" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
            </Svg>
            <Text style={[styles.infoText, styles.infoStrongText]}>
              {user.employeeId}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileIdentityCard;
