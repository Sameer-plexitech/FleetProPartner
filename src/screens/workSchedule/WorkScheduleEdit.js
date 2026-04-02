import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { fontPixel, heightPixel, widthPixel } from '../../utility/fonts';
import WorkScheduleHeader from './components/WorkScheduleHeader';
import { styles } from './workScheduleStyles';
import Svg, { ClipPath, Defs, FeBlend, FeColorMatrix, FeComposite, FeFlood, FeMorphology, FeOffset, Filter, G, Path, Rect } from 'react-native-svg';

const DAYS = [
  { id: 'mon', short: 'M', label: 'Monday' },
  { id: 'tue', short: 'T', label: 'Tuesday' },
  { id: 'wed', short: 'W', label: 'Wednesday' },
  { id: 'thu', short: 'T', label: 'Thursday' },
  { id: 'fri', short: 'F', label: 'Friday' },
  { id: 'sat', short: 'S', label: 'Saturday' },
  { id: 'sun', short: 'S', label: 'Sunday' },
];

const WorkScheduleEdit = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [selectedDays, setSelectedDays] = React.useState(['tue']);

  const toggleDay = dayId => {
    setSelectedDays(prev => {
      if (prev.includes(dayId)) {
        return prev.filter(item => item !== dayId);
      }
      return [...prev, dayId];
    });
  };

  return (
    <View style={[styles.container, styles.scheduleEditContainer]}>
      <WorkScheduleHeader
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={() => null}
        title="Work Schedule"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scheduleEditContent}
      >
        <View style={styles.scheduleSetupCard}>
          <View style={styles.scheduleSetupTopRow}>
            <Text style={styles.workdaySetupLabel}>Workday setup</Text>

            <View style={{
              height: heightPixel(26),
              paddingVertical: heightPixel(4),
              paddingHorizontal: widthPixel(6),
              backgroundColor:"#F6EEFF",
              borderRadius: widthPixel(6),
              alignItems:"center",
              justifyContent:"center"
            }} >

              <Text style={styles.activeDaysLabel}>{`${selectedDays.length} days active`}</Text>

            </View>
          </View>

          <Text style={styles.scheduleSetupTitle}>Set your active schedule</Text>
          <Text style={styles.scheduleSetupSubTitle}>
            Choose working hours and select the days you are available for this week.
          </Text>

          <View style={styles.shiftHeadingRow}>
            <Text style={styles.shiftHeadingText}>Start Time</Text>
            <Text style={styles.shiftHeadingText}>End Time</Text>
          </View>

          <View style={styles.shiftRow}>
            <TouchableOpacity activeOpacity={0.9} style={styles.shiftSelectorBox}>
              <View style={styles.shiftClockWrap}>
                <Svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <Rect width="36" height="36" rx="18" fill="white" />
                  <G filter="url(#filter0_i_1678_600)">
                    <Rect width="36" height="36" rx="18" fill="white" fillOpacity="0.01" />
                  </G>
                  <G clipPath="url(#clip0_1678_600)">
                    <Path d="M10.5 18C10.5 22.1394 13.8606 25.5 18 25.5C22.1394 25.5 25.5 22.1394 25.5 18C25.5 13.8606 22.1394 10.5 18 10.5C13.8606 10.5 10.5 13.8606 10.5 18V18" stroke="#6420AA" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" />
                    <Path d="M18 13.5V18H21" stroke="#6420AA" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                  </G>
                  <Defs>

                    <ClipPath id="clip0_1678_600">
                      <Rect width="18" height="18" fill="white" transform="translate(9 9)" />
                    </ClipPath>
                  </Defs>
                </Svg>
                {/* <Feather name="clock" size={heightPixel(11)} color="#6A6A6A" /> */}
              </View>
              <View>
                <Text style={styles.shiftSmallText}>Begin shift</Text>
                <Text style={styles.shiftMainText}>9:00 AM</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} style={styles.shiftSelectorBox}>
              <View style={styles.shiftClockWrap}>
                <Svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <Rect width="36" height="36" rx="18" fill="white" />
                  <G filter="url(#filter0_i_1678_600)">
                    <Rect width="36" height="36" rx="18" fill="white" fillOpacity="0.01" />
                  </G>
                  <G clipPath="url(#clip0_1678_600)">
                    <Path d="M10.5 18C10.5 22.1394 13.8606 25.5 18 25.5C22.1394 25.5 25.5 22.1394 25.5 18C25.5 13.8606 22.1394 10.5 18 10.5C13.8606 10.5 10.5 13.8606 10.5 18V18" stroke="#6420AA" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" />
                    <Path d="M18 13.5V18H21" stroke="#6420AA" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                  </G>
                  <Defs>

                    <ClipPath id="clip0_1678_600">
                      <Rect width="18" height="18" fill="white" transform="translate(9 9)" />
                    </ClipPath>
                  </Defs>
                </Svg>
              </View>
              <View>
                <Text style={styles.shiftSmallText}>Finish shift</Text>
                <Text style={styles.shiftMainText}>7:00 PM</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.daysHeadingRow}>
            <View >
              <Text style={styles.daysHeadingText}>Select Work Days</Text>
              <Text style={{ fontSize: fontPixel(16), fontWeight: "700" }}>Availability</Text>
            </View>
            <Text style={styles.daysTapToEditText}>Tap to edit</Text>
          </View>

          <View style={styles.daysGridWrap}>
            {DAYS.map(day => {
              const isActive = selectedDays.includes(day.id);
              return (
                <TouchableOpacity
                  key={day.id}
                  activeOpacity={0.9}
                  style={[
                    styles.workDayPill,
                    isActive ? styles.workDayPillActive : null,
                  ]}
                  onPress={() => toggleDay(day.id)}
                >
                  <View
                    style={[
                      styles.workDayBadge,
                      isActive ? styles.workDayBadgeActive : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.workDayBadgeText,
                        isActive ? styles.workDayBadgeTextActive : null,
                      ]}
                    >
                      {day.short}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.workDayLabel,
                      isActive ? styles.workDayLabelActive : null,
                    ]}
                  >
                    {day.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.scheduleEditFooter,
          { paddingBottom: Math.max(insets.bottom, 10) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkScheduleEdit;
