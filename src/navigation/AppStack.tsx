import React from 'react';

import SplashStack from '~/navigation/SplashStack';
import AuthStack from '~/navigation/AuthStack';
import HomeStack from '~/navigation/HomeStack';
import { useUserAuthStatus } from '~/facades/userStatusFacade';
import { UserAuthStatus } from '~/types/userAuthStatus';

const AppStack = () => {
  const { userAuthStatus } = useUserAuthStatus();

  if (userAuthStatus === UserAuthStatus.UNKNOWN) {
    return <SplashStack />;
  }

  return userAuthStatus === UserAuthStatus.AUTHORIZED ? <HomeStack /> : <AuthStack />;
};

export default AppStack;
