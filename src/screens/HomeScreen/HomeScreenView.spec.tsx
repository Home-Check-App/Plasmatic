import 'react-native';
import React from 'react';
import HomeScreenView from './HomeScreenView';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<HomeScreenView />);
});
