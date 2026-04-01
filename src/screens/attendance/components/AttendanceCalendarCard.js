import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from '../attendanceStyles';

const AttendanceCalendarCard = ({ currentDate, markedDates, onDayPress }) => {
  return (
    <View style={styles.calendarCard}>
      <Calendar
        current={currentDate}
        markedDates={markedDates}
        onDayPress={onDayPress}
        enableSwipeMonths
        hideExtraDays={false}
        firstDay={0}
        theme={styles.calendarTheme}
      />
    </View>
  );
};

export default AttendanceCalendarCard;
