import React, { useEffect, useRef } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useUser } from '~/facades/userFacades';
import HomeScreenView from './HomeScreenView';
import { AppState, AppStateStatus } from 'react-native';

const HomeScreenController: React.FC<StackScreenProps<{}>> = props => {
  const { user, refreshUser } = useUser();
  const appStateRef = useRef(AppState.currentState);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
      refreshUser();
    }

    appStateRef.current = nextAppState;
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      refreshUser();
    });

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      unsubscribe();
    };
  }, [props.navigation]);

  return (
    <HomeScreenView
      name={user?.displayName || null}
      location={user?.location || null}
      profilePictureURL={user?.photoURL || null}
    />
  );
};

export default HomeScreenController;
