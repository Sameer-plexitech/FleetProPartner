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

const getAudioRecorderModule = () =>
  NativeModules.AudioRecorderModule || NativeModules.AudioRecorder || null;

const toMs = value => {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const TemporarySurrenderRequest = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const recordingTimerRef = React.useRef(null);
  const recordingStartedAtRef = React.useRef(0);
  const playbackTimerRef = React.useRef(null);

  const [startDate] = React.useState('23/06/2024');
  const [endDate] = React.useState('28/06/2024');
  const [remarks, setRemarks] = React.useState('');
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordingDuration, setRecordingDuration] = React.useState(0);
  const [recordedFilePath, setRecordedFilePath] = React.useState('');
  const [isPlaybackActive, setIsPlaybackActive] = React.useState(false);
  const [isPlaybackPaused, setIsPlaybackPaused] = React.useState(false);
  const [playbackPosition, setPlaybackPosition] = React.useState(0);
  const [playbackDuration, setPlaybackDuration] = React.useState(0);

  const clearRecordingTimer = React.useCallback(() => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
  }, []);

  const clearPlaybackTimer = React.useCallback(() => {
    if (playbackTimerRef.current) {
      clearInterval(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
  }, []);

  const syncPlaybackState = React.useCallback(
    progress => {
      const positionMs = toMs(progress?.currentPositionMs);
      const durationMs = toMs(progress?.durationMs);
      const isPlaying = Boolean(progress?.isPlaying);
      const isPaused = Boolean(progress?.isPaused);

      setPlaybackPosition(positionMs);
      if (durationMs > 0) {
        setPlaybackDuration(durationMs);
      }
      setIsPlaybackActive(isPlaying);
      setIsPlaybackPaused(isPaused);

      if (!isPlaying) {
        clearPlaybackTimer();
      }
    },
    [clearPlaybackTimer],
  );

  const pollPlaybackProgress = React.useCallback(async () => {
    const audioModule = getAudioRecorderModule();
    const getPlaybackProgressFn =
      audioModule?.getPlaybackProgress || audioModule?.getCurrentPlaybackProgress;
    if (!getPlaybackProgressFn) {
      return;
    }

    try {
      const progress = await getPlaybackProgressFn.call(audioModule);
      syncPlaybackState(progress);
    } catch (error) {
      clearPlaybackTimer();
      setIsPlaybackActive(false);
    }
  }, [clearPlaybackTimer, syncPlaybackState]);

  const startPlaybackTimer = React.useCallback(() => {
    clearPlaybackTimer();
    playbackTimerRef.current = setInterval(() => {
      pollPlaybackProgress();
    }, 250);
  }, [clearPlaybackTimer, pollPlaybackProgress]);

  const stopPlaybackPreview = React.useCallback(async () => {
    clearPlaybackTimer();
    setIsPlaybackActive(false);
    setIsPlaybackPaused(false);
    setPlaybackPosition(0);

    try {
      const audioModule = getAudioRecorderModule();
      const stopPlaybackFn = audioModule?.stopPlayback || audioModule?.stopPlaying;
      if (stopPlaybackFn) {
        await stopPlaybackFn.call(audioModule);
      }
    } catch (error) {
      // no-op: if the native side is already stopped we can safely ignore.
    }
  }, [clearPlaybackTimer]);

  const clearRecordingPreviewState = React.useCallback(() => {
    setRecordedFilePath('');
    setRecordingDuration(0);
    setPlaybackDuration(0);
    setPlaybackPosition(0);
    setIsPlaybackActive(false);
    setIsPlaybackPaused(false);
  }, []);

  React.useEffect(
    () => () => {
      clearRecordingTimer();
      const stopPromise = getAudioRecorderModule()?.stopRecording?.();
      if (stopPromise?.catch) {
        stopPromise.catch(() => null);
      }
      stopPlaybackPreview();
    },
    [clearRecordingTimer, stopPlaybackPreview],
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
    const audioModule = getAudioRecorderModule();
    if (!audioModule?.startRecording || !audioModule?.stopRecording) {
      Alert.alert('Not supported', 'Audio recording module is not available.');
      return;
    }

    const hasPermission = await requestRecordPermission();
    if (!hasPermission) {
      return;
    }

    try {
      await stopPlaybackPreview();
      const path = await audioModule.startRecording();
      setRecordedFilePath(path || '');
      setRecordingDuration(0);
      setPlaybackPosition(0);
      setPlaybackDuration(0);
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
      const audioModule = getAudioRecorderModule();
      if (!audioModule?.stopRecording) {
        Alert.alert('Not supported', 'Audio recording module is not available.');
        return;
      }
      const result = await audioModule.stopRecording();
      clearRecordingTimer();
      setIsRecording(false);
      const nextPath =
        (typeof result === 'string' ? result : result?.filePath) ||
        recordedFilePath;
      if (nextPath) {
        setRecordedFilePath(nextPath);
      }
      if (typeof result?.durationMs === 'number') {
        setRecordingDuration(result.durationMs);
        setPlaybackDuration(result.durationMs);
      }
      setPlaybackPosition(0);
      setIsPlaybackActive(false);
      setIsPlaybackPaused(false);
    } catch (error) {
      clearRecordingTimer();
      setIsRecording(false);
      Alert.alert('Recording failed', 'Unable to stop recording right now.');
    }
  };

  const handlePlaybackPress = async () => {
    if (!recordedFilePath) {
      return;
    }
    const audioModule = getAudioRecorderModule();
    const startPlaybackFn = audioModule?.startPlayback || audioModule?.startPlaying;
    const pausePlaybackFn = audioModule?.pausePlayback || audioModule?.pausePlaying;
    const resumePlaybackFn =
      audioModule?.resumePlayback || audioModule?.resumePlaying;

    if (!startPlaybackFn) {
      Alert.alert('Not supported', 'Playback is not available on this device.');
      return;
    }

    try {
      if (isPlaybackActive && pausePlaybackFn) {
        const pauseProgress = await pausePlaybackFn.call(audioModule);
        syncPlaybackState(pauseProgress);
        return;
      }

      if (isPlaybackPaused && resumePlaybackFn) {
        const resumeProgress = await resumePlaybackFn.call(audioModule);
        syncPlaybackState(resumeProgress);
        startPlaybackTimer();
        return;
      }

      const playbackProgress = await startPlaybackFn.call(
        audioModule,
        recordedFilePath,
      );
      syncPlaybackState(playbackProgress);
      startPlaybackTimer();
    } catch (error) {
      Alert.alert('Playback failed', 'Unable to play this recording right now.');
    }
  };

  const handleVoiceRecordPress = () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    startRecording();
  };

  const deleteRecording = React.useCallback(async () => {
    await stopPlaybackPreview();

    const audioModule = getAudioRecorderModule();
    const deleteRecordingFn = audioModule?.deleteRecording;

    if (deleteRecordingFn && recordedFilePath) {
      try {
        await deleteRecordingFn.call(audioModule, recordedFilePath);
      } catch (error) {
        Alert.alert('Delete failed', 'Unable to delete voice note right now.');
        return;
      }
    }

    clearRecordingPreviewState();
  }, [clearRecordingPreviewState, recordedFilePath, stopPlaybackPreview]);

  const handleDeleteRecordingPress = () => {
    Alert.alert('Delete Voice Note', 'Are you sure you want to delete this voice note?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: deleteRecording },
    ]);
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
          {recordedFilePath ? (
            <View style={styles.recordingPreviewRow}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.recordingPreviewPlayWrap}
                onPress={handlePlaybackPress}
              >
                <Feather
                  name={isPlaybackActive ? 'pause' : 'play'}
                  size={heightPixel(10)}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

              <View style={styles.recordingPreviewTextWrap}>
                <Text style={styles.recordingPreviewTitle}>Voice Note</Text>
                <Text style={styles.recordingPreviewTime}>
                  {`${formatDuration(playbackPosition)} / ${formatDuration(
                    playbackDuration || recordingDuration,
                  )}`}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.recordingDeleteButton}
                onPress={handleDeleteRecordingPress}
              >
                <Feather name="trash-2" size={heightPixel(12)} color="#B01212" />
              </TouchableOpacity>
            </View>
          ) : null}

          <Text style={styles.voiceStatusText}>
            {isRecording
              ? `Recording... ${formatDuration(recordingDuration)}`
              : recordedFilePath
                ? 'Tap play to preview your recording'
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
