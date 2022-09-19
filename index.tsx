/**
 * @format
 */

import 'reflect-metadata';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
// @ts-expect-error
import { name as appName } from './app.json';
import { container, containerModule } from '~/services/container';
import { ServiceProvider } from '~/services/serviceProvider';

container.load(containerModule);

AppRegistry.registerComponent(appName, () => props => (
  <ServiceProvider container={container}>
    <App {...props} />
  </ServiceProvider>
));
