import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from '~/navigation/AppStack';
import { Linking } from 'react-native';
import { deepLinksConfig } from '~/consts/deepLinksConfig';
import { navigationLinkingPrefixes } from '~/consts/navigationLinkingPrefixes';
import { useNotifications } from '~/facades/notificationsFacades';

const App = () => {
  const { getInitialNotificationLink, onNotificationOpenedApp, removeNotificationOpenListener } = useNotifications();

  const linking = useRef({
    prefixes: navigationLinkingPrefixes,
    config: deepLinksConfig,
    getInitialURL: async () => {
      const url = await Linking.getInitialURL();

      if (url !== null) {
        return url;
      }

      const notificationLink = await getInitialNotificationLink();

      return notificationLink;
    },
    subscribe: (listener: (url: string) => void) => {
      const onReceiveURL = ({ url }: { url: string }) => {
        listener(url);
      };

      Linking.addEventListener('url', onReceiveURL);

      onNotificationOpenedApp(listener);

      return () => {
        Linking.removeEventListener('url', onReceiveURL);
        removeNotificationOpenListener();
      };
    },
  });

  return (
    <NavigationContainer linking={linking.current}>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;

const lol = 'homecheckapp://tasks/library/view/1d6a60bd-072a-4c16-bb84-db592314fbc1';
