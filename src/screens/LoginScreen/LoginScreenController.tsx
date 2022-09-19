import React from 'react';
import { useUserSignInAndFetch } from '~/facades/userFacades';
import LoginScreenView from './LoginScreenView';

const LoginScreenController = () => {
  const { signInAndFetchUser } = useUserSignInAndFetch();

  const validatePhoneNumber = (number: string) => {
    if (/[0-9]/.test(number)) {
      return null;
    }
    return new Error('String is not a phone number!');
  };

  return <LoginScreenView validateInput={validatePhoneNumber} handleSignIn={signInAndFetchUser} />;
};

export default LoginScreenController;
