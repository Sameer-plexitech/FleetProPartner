import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { heightPixel } from '../../../utility/fonts';
import { styles } from '../workScheduleStyles';
import Svg, { Path } from 'react-native-svg';

const WorkRosterCard = ({ roster, onEditPress }) => {
  return (
    <View style={styles.rosterCard}>
      <View style={styles.rosterTopRow}>
        <Text style={styles.rosterTitle}>Work Roster</Text>

        <TouchableOpacity onPress={() => onEditPress()}>
          <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path d="M5.66512 5.66489H4.85585C4.42658 5.66489 4.0149 5.83541 3.71136 6.13895C3.40783 6.44248 3.2373 6.85416 3.2373 7.28343V14.5669C3.2373 14.9961 3.40783 15.4078 3.71136 15.7113C4.0149 16.0149 4.42658 16.1854 4.85585 16.1854H12.1393C12.5685 16.1854 12.9802 16.0149 13.2838 15.7113C13.5873 15.4078 13.7578 14.9961 13.7578 14.5669V13.7576" stroke="#000088" stroke-width="1.61854" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M12.9481 4.04633L15.3759 6.47414M16.4967 5.32903C16.8155 5.0103 16.9945 4.57801 16.9945 4.12726C16.9945 3.67651 16.8155 3.24422 16.4967 2.92549C16.178 2.60676 15.7457 2.4277 15.295 2.4277C14.8442 2.4277 14.4119 2.60676 14.0932 2.92549L7.2832 9.71122V12.139H9.71101L16.4967 5.32903Z" stroke="#000088" stroke-width="1.61854" stroke-linecap="round" stroke-linejoin="round" />
          </Svg>
          {/* <Feather name="edit-2" size={heightPixel(12)} color="#1E1E7C" /> */}
        </TouchableOpacity>
      </View>

      <View style={styles.rosterHoursRow}>
        <View>
          <Text style={styles.rosterLabel}>Working Hours</Text>
          <Text style={styles.rosterHoursValue}>{roster.workingHours}</Text>
        </View>

        <View style={styles.daysWrap}>
          <Text style={styles.rosterLabel}>Days</Text>
          <View style={styles.dayCircleRow}>
            {roster.days.map((day, index) => (
              <View key={`${day}-${index}`} style={styles.dayCircle}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkRosterCard;
