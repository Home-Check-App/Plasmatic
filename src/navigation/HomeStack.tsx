import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '~/screens/HomeScreen';
import ServicesScreen from '~/screens/ServicesScreen';
import PartnersScreen from '~/screens/PartnersScreen';
import ActivityScreen from '~/screens/ActivityScreen';
import HomeTabBar from '~/components/tabBar/homeTabBar';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator tabBar={props => <HomeTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Partners" component={PartnersScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
    </Tab.Navigator>
  );
};

export default HomeStack;
