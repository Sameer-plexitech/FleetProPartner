import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import OnBoardContainer from './OnBoardContainer';
import Splash from './onBoard/Splash';
import MainStack from './MainStack';
import { View, Text } from 'react-native';
import OnBoardContainer from './onBoard/OnBoardContainer';

const Stack = createNativeStackNavigator();

export default function RootContainer() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [initialRoute, setInitialRoute] = React.useState('MainStack'); 

  React.useEffect(() => {
    setTimeout(() => {
      let route = 'onBoard';

      if (true) {
        route = 'onBoard';
      }

      setInitialRoute(route);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>loading...</Text>
      </View>
    );
  }


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="onBoard" component={OnBoardContainer} />
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}