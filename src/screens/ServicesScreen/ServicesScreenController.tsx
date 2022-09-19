import React from 'react';
import { useClearUserAndSignOut } from '~/facades/userFacades';
import ServicesScreenView from './ServicesScreenView';

const ServicesScreenController = () => {
  const { clearUserAndSignOut } = useClearUserAndSignOut();

  const handleSignOut = () => {
    clearUserAndSignOut();
  };

  return <ServicesScreenView handleSignOut={handleSignOut} />;
};

export default ServicesScreenController;
