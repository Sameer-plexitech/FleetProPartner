

/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification, { Importance } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// Common configuration for both platforms
PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // Process the notification
    
    // Only call finish callback on iOS
    if (Platform.OS === 'ios') {
      // Required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-push-notification-ios/push-notification-ios)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }

    // On Android, we already have the channel
    if (Platform.OS === 'android') {
      PushNotification.localNotification({
        channelId: 'channel-id',
        title: notification.title || 'WTI Field',
        message: notification.message || 'Message',
      });
    }
  },

  // Android-specific configuration
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',

  // IOS SPECIFIC
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Called when a token is generated
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
});

// Android-specific channel creation
if (Platform.OS === 'android') {
  PushNotification.createChannel(
    {
      channelId: 'channel-id',
      channelName: 'My channel',
      channelDescription: 'A channel to categorise your notifications',
      importance: Importance.HIGH,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );
}

// iOS-specific permission handling
if (Platform.OS === 'ios') {
  PushNotificationIOS.requestPermissions().then(() => {
    // Do something after permissions are granted
  });
}

AppRegistry.registerComponent(appName, () => App);