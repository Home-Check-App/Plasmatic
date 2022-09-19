import 'react-native';
import React from 'react';
import LoginScreenView from './LoginScreenView';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<LoginScreenView />);
});
