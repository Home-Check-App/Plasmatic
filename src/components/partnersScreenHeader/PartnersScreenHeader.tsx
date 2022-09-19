import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GeoPinIcon from '~/assets/icons/GeoPinIcon';
import { scale } from '~/helpers/scale';
import SearchInput from '~/shared/components/SearchInput';
import styleSystem from '~/shared/styles';

type Props = {
  searchPartners: (partner: string | undefined) => void;
};

const PartnersScreenHeader: React.FC<Props> = props => {
  const [inputValue, setInputValue] = useState<string | undefined>();

  const updateInputValue = (value: string) => {
    setInputValue(value);
  };

  const onSearchSubmit = () => {
    props.searchPartners(inputValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styleSystem.typography.H2}>Partners</Text>
        <View style={styles.locationContianer}>
          <GeoPinIcon width={18} height={18} color={styleSystem.colors.primary.blue} />
          <Text
            style={[
              styleSystem.typography.labelMedium,
              { paddingLeft: scale(3), color: styleSystem.colors.primary.blue },
            ]}>
            {'EcoWorld'}
          </Text>
        </View>
      </View>
      <SearchInput value={inputValue} onChangeText={updateInputValue} onSubmit={onSearchSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(24),
    backgroundColor: styleSystem.colors.secondary.white,
    paddingBottom: scale(16),
    paddingTop: scale(24),
  },
  titleContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingBottom: scale(24),
  },
  locationContianer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PartnersScreenHeader;
