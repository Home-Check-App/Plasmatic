import 'react-native';
import React from 'react';
import ServicesScreenView from './ServicesScreenView';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<ServicesScreenView />);
});
