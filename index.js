/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// import PushNotification, { Importance } from 'react-native-push-notification';


// PushNotification.createChannel(
//     {
//         channelId: "channel-id", // (required)
//         channelName: "My channel", // (required)
//         channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
//         playSound: false, // (optional) default: true
//         soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
//         importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//         vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//     },
//     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
// );

// Must be outside of any component LifeCycle (such as `componentDidMount`).
// PushNotification.configure({
//     onRegister: function (token) {
//         console.log("TOKEN:", token);
//     },
//     onNotification: function (notification) {
//         console.log("NOTIFICATION:", notification);
//         PushNotification.localNotification({
//             channelId: 'channel-id',
//             title: notification?.title || "Fleet Pro Fleet",
//             message: notification?.message || "Message",
//         });
//     },
//     onAction: function (notification) {
//         console.log("ACTION:", notification.action);
//         console.log("NOTIFICATION:", notification);
//     },
//     onRegistrationError: function (err) {
//         console.error(err.message, err);
//     },
//     permissions: {
//         alert: true,
//         badge: true,
//         sound: true,
//     },
//     popInitialNotification: true,
//     requestPermissions: true,
// });
AppRegistry.registerComponent(appName, () => App);

