import React, { useEffect } from 'react';
import { LogBox, Platform, StatusBar, StyleSheet, View } from 'react-native';

import RootContainer from './src/screens/RootContainer';

const showStatusBar = Platform.OS === 'ios';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    LogBox.ignoreLogs(['Warning: This synthetic']);
  }, []);

  return (
    <View style={styles.container}>
      {showStatusBar && <StatusBar barStyle={'dark-content'} />}
      <RootContainer />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
