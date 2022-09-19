import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '~/screens/SplashScreen';

const Stack = createStackNavigator();

const SplashStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default SplashStack;
