import 'react-native';
import React from 'react';
import ActivityScreenView from './ActivityScreenView';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<ActivityScreenView />);
});
