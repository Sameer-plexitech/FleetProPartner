import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { heightPixel } from '../../../utility/fonts';
import { styles } from '../workScheduleStyles';

const SurrenderRequestCard = ({ request, onRecordingPress }) => {
  return (
    <View style={styles.requestCard}>
      <View style={styles.requestTopRow}>
        <View style={styles.requestDateWrap}>
          <View style={styles.requestDateItem}>
            <Text style={styles.requestDateLabel}>Start Date</Text>
            <Text style={styles.requestDateValue}>{request.startDate}</Text>
          </View>

          <View style={styles.requestDateItem}>
            <Text style={styles.requestDateLabel}>End Date</Text>
            <Text style={styles.requestDateValue}>{request.endDate}</Text>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: request.statusBackground },
          ]}
        >
          <Text style={[styles.statusText, { color: request.statusColor }]}>
            {request.status}
          </Text>
        </View>
      </View>

      <Text style={styles.remarksLabel}>Remarks</Text>
      <Text style={styles.remarksText}>{request.remarks}</Text>

      <View style={styles.requestDivider} />

      <TouchableOpacity
        style={styles.recordingRow}
        onPress={() => onRecordingPress?.(request)}
      >
        <View style={styles.playWrap}>
          <Feather name="play" size={heightPixel(10)} color="#FFFFFF" />
        </View>

        <View style={styles.recordingTextWrap}>
          <Text style={styles.recordingTitle}>{request.recordingTitle}</Text>
          <Text style={styles.recordingTime}>{request.recordedAt}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SurrenderRequestCard;
