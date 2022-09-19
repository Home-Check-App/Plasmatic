import React from 'react';

import { SafeAreaView, Text } from 'react-native';
import { scale } from '~/helpers/scale';
import Button from '~/shared/components/Button';

type Props = {
  handleSignOut: () => void;
};

const ServicesScreenView: React.FC<Props> = props => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: scale(24) }}>
      <Button text={'Sign Out'} onPress={props.handleSignOut} />
    </SafeAreaView>
  );
};

export default ServicesScreenView;
