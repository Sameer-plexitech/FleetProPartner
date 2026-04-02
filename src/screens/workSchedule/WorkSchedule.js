import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WorkScheduleHeader from './components/WorkScheduleHeader';
import WorkRosterCard from './components/WorkRosterCard';
import SurrenderRequestCard from './components/SurrenderRequestCard';
import { SURRENDER_REQUESTS, WORK_ROSTER } from './workScheduleData';
import { styles } from './workScheduleStyles';
import { _getVerticalPadding } from '../../utility/Helper';

const WorkSchedule = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <WorkScheduleHeader
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={() => null}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <WorkRosterCard
          roster={WORK_ROSTER}
          onEditPress={() => navigation.navigate('WorkScheduleEdit')}
        />

        {_getVerticalPadding(18)}

        <Text style={styles.sectionTitle}>Request For Temporary Surrender</Text>

        {SURRENDER_REQUESTS.map(request => (
          <SurrenderRequestCard
            key={request.id}
            request={request}
            onRecordingPress={() => null}
          />
        ))}
      </ScrollView>

      <View
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 10) }]}
      >
        <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('TemporarySurrenderRequest')}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkSchedule;
