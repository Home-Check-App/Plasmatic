import 'react-native';
import React from 'react';
import PartnersScreenView from './PartnersScreenView';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<PartnersScreenView />);
});
