import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AirPlaneIcon from '~/assets/icons/partners/AirPlaneIcon';
import BoxIcon from '~/assets/icons/partners/BoxIcon';
import GamepadIcon from '~/assets/icons/partners/GamepadIcon';
import TicketsIcon from '~/assets/icons/partners/TicketsIcon';
import TShirtIcon from '~/assets/icons/partners/TShirtIcon';
import { scale } from '~/helpers/scale';
import styleSystem from '~/shared/styles';

import { PartnerCategory } from '~/types/partnerCategory';

type Props = {
  isSelected: boolean;
  category: PartnerCategory;
};

const PartnerCategoryItem: React.FC<Props> = props => {
  const renderCategoryIcon = () => {
    switch (props.category) {
      case 'all':
        return (
          <BoxIcon
            width={19}
            height={19}
            fill={props.isSelected ? styleSystem.colors.primary.blue : styleSystem.colors.secondary.light}
          />
        );
      case 'fashion':
        return (
          <TShirtIcon
            width={19}
            height={19}
            fill={props.isSelected ? styleSystem.colors.primary.blue : styleSystem.colors.secondary.light}
          />
        );
      case 'movies':
        return (
          <TicketsIcon
            width={19}
            height={19}
            fill={props.isSelected ? styleSystem.colors.primary.blue : styleSystem.colors.secondary.light}
          />
        );
      case 'tech':
        return (
          <GamepadIcon
            width={19}
            height={19}
            fill={props.isSelected ? styleSystem.colors.primary.blue : styleSystem.colors.secondary.light}
          />
        );
      case 'travel':
        return (
          <AirPlaneIcon
            width={19}
            height={19}
            fill={props.isSelected ? styleSystem.colors.primary.blue : styleSystem.colors.secondary.light}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer}>
        {renderCategoryIcon()}
        <Text
          style={[
            styleSystem.typography.button,
            {
              color: props.isSelected ? styleSystem.colors.primary.blue : styleSystem.colors.secondary.light,
              paddingTop: scale(8),
            },
          ]}>
          {props.category}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale(16),
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PartnerCategoryItem;
