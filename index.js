/**
 * @format
 */
import 'react-native-url-polyfill/auto';
import {decode as atob, encode as btoa} from 'base-64';

if (!global.btoa) global.btoa = btoa;
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import App from './src/App';
import TestFCM from './src/TestFCM';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App);
