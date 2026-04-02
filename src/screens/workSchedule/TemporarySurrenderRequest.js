import React from 'react';
import {
  Alert,
  Linking,
  NativeModules,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { heightPixel } from '../../utility/fonts';
import WorkScheduleHeader from './components/WorkScheduleHeader';
import { styles } from './workScheduleStyles';

const formatDuration = milliseconds => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const openAppSettings = () => {
  Linking.openSettings().catch(() => null);
};

const { AudioRecorderModule } = NativeModules;

const TemporarySurrenderRequest = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const recordingTimerRef = React.useRef(null);
  const recordingStartedAtRef = React.useRef(0);

  const [startDate] = React.useState('23/06/2024');
  const [endDate] = React.useState('28/06/2024');
  const [remarks, setRemarks] = React.useState('');
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordingDuration, setRecordingDuration] = React.useState(0);
  const [recordedFilePath, setRecordedFilePath] = React.useState('');

  const clearRecordingTimer = React.useCallback(() => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
  }, []);

  React.useEffect(
    () => () => {
      clearRecordingTimer();
      AudioRecorderModule?.stopRecording?.().catch(() => null);
    },
    [clearRecordingTimer],
  );

  const startRecordingTimer = () => {
    recordingStartedAtRef.current = Date.now();
    clearRecordingTimer();
    recordingTimerRef.current = setInterval(() => {
      setRecordingDuration(Date.now() - recordingStartedAtRef.current);
    }, 200);
  };

  const requestRecordPermission = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
    if (hasPermission) {
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message:
          'FleetPro Partner needs microphone access to record voice notes.',
        buttonPositive: 'Allow',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Microphone Permission Blocked',
        'Please enable microphone access from app settings to record voice notes.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: openAppSettings },
        ],
      );
      return false;
    }

    Alert.alert(
      'Permission denied',
      'Microphone permission is required to record voice notes.',
    );
    return false;
  };

  const startRecording = async () => {
    if (!AudioRecorderModule?.startRecording || !AudioRecorderModule?.stopRecording) {
      Alert.alert('Not supported', 'Audio recording module is not available.');
      return;
    }

    const hasPermission = await requestRecordPermission();
    if (!hasPermission) {
      return;
    }

    try {
      const path = await AudioRecorderModule.startRecording();
      setRecordedFilePath(path || '');
      setRecordingDuration(0);
      setIsRecording(true);
      startRecordingTimer();
    } catch (error) {
      const errorMessage = String(error?.message || '').toLowerCase();
      if (errorMessage.includes('permission')) {
        Alert.alert(
          'Permission required',
          'Please allow microphone permission from app settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: openAppSettings },
          ],
        );
        return;
      }
      Alert.alert('Recording failed', 'Unable to start recording right now.');
    }
  };

  const stopRecording = async () => {
    try {
      const result = await AudioRecorderModule.stopRecording();
      clearRecordingTimer();
      setIsRecording(false);
      const nextPath = result?.filePath || recordedFilePath;
      if (nextPath) {
        setRecordedFilePath(nextPath);
      }
      if (typeof result?.durationMs === 'number') {
        setRecordingDuration(result.durationMs);
      }
    } catch (error) {
      Alert.alert('Recording failed', 'Unable to stop recording right now.');
    }
  };

  const handleVoiceRecordPress = () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    startRecording();
  };

  return (
    <View style={[styles.container, styles.requestScreenContainer]}>
      <WorkScheduleHeader
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={() => null}
        title="Request For Temporary Surrender"
        titleStyle={styles.requestHeaderTitle}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.requestContent}
      >
        <View style={styles.requestFieldWrap}>
          <Text style={styles.requestFieldLabel}>
            Start Date<Text style={styles.requiredMark}>*</Text>
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.requestInputBox}
            onPress={() => null}
          >
            <Feather
              name="calendar"
              size={heightPixel(14)}
              color="#BBBBBB"
              style={styles.requestInputIcon}
            />
            <Text style={styles.requestInputValue}>{startDate}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.requestFieldWrap}>
          <Text style={styles.requestFieldLabel}>
            End Date<Text style={styles.requiredMark}>*</Text>
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.requestInputBox}
            onPress={() => null}
          >
            <Feather
              name="calendar"
              size={heightPixel(14)}
              color="#BBBBBB"
              style={styles.requestInputIcon}
            />
            <Text style={styles.requestInputValue}>{endDate}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.requestFieldWrap}>
          <Text style={styles.requestFieldLabel}>Remarks</Text>

          <View style={styles.remarksBox}>
            <View style={styles.remarksTopRow}>
              <Feather
                name="align-left"
                size={heightPixel(13)}
                color="#BBBBBB"
                style={styles.requestInputIcon}
              />
              <TextInput
                value={remarks}
                onChangeText={setRemarks}
                style={styles.remarksInput}
                placeholder="Enter Remarks"
                placeholderTextColor="#A1A1A1"
                maxLength={250}
                multiline
                textAlignVertical="top"
              />
              <TouchableOpacity
                style={[
                  styles.voiceButton,
                  isRecording ? styles.voiceButtonRecording : null,
                ]}
                activeOpacity={0.9}
                onPress={handleVoiceRecordPress}
              >
                <Ionicons
                  name={isRecording ? 'stop-outline' : 'mic-outline'}
                  size={heightPixel(12)}
                  color={isRecording ? '#B01212' : '#000088'}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.remarksCounter}>{`${remarks.length}/250`}</Text>
          </View>
          <Text style={styles.voiceStatusText}>
            {isRecording
              ? `Recording... ${formatDuration(recordingDuration)}`
              : recordedFilePath
                ? `Voice note saved (${formatDuration(recordingDuration)})`
                : 'Tap the mic button to record a voice note'}
          </Text>
        </View>
      </ScrollView>

      <View
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 10) }]}
      >
        <TouchableOpacity style={styles.applyButton} onPress={() => null}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TemporarySurrenderRequest;
