import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AttendanceHeader from './components/AttendanceHeader';
import AttendanceLegend from './components/AttendanceLegend';
import AttendanceCalendarCard from './components/AttendanceCalendarCard';
import { ATTENDANCE_CONFIG, ATTENDANCE_LEGEND } from './attendanceData';
import { styles } from './attendanceStyles';

const Attendance = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = React.useState(
    ATTENDANCE_CONFIG.initialDate,
  );

  const markedDates = React.useMemo(
    () => ({
      ...ATTENDANCE_CONFIG.markedDates,
      [selectedDate]: {
        selected: true,
        selectedColor: '#0D1D9C',
        selectedTextColor: '#FFFFFF',
      },
    }),
    [selectedDate],
  );

  return (
    <View style={styles.container}>
      <AttendanceHeader
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={() => null}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <AttendanceLegend items={ATTENDANCE_LEGEND} onAddPress={() => null} />
        <AttendanceCalendarCard
          currentDate={selectedDate}
          markedDates={markedDates}
          onDayPress={day => setSelectedDate(day.dateString)}
        />
      </ScrollView>
    </View>
  );
};

export default Attendance;
