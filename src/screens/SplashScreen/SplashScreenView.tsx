import React from 'react';

import { SafeAreaView, Text } from 'react-native';
import styleSystem from '~/shared/styles';

const SplashScreenView = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleSystem.colors.primary.blue,
      }}>
      <Text>Splash!</Text>
    </SafeAreaView>
  );
};

export default SplashScreenView;
