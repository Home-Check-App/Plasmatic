import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from '~/helpers/scale';
import styleSystem from '~/shared/styles';

type Props = {
  text?: string;
  onPress: () => void;
  testID?: string;
};

const Button: React.FC<Props> = props => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={'Generic Button'}
      testID={props.testID}
      activeOpacity={0.7}
      style={styles.container}
      onPress={props.onPress}>
      <View>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: styleSystem.colors.primary.blue,
    paddingVertical: scale(16),
    borderRadius: 32,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    ...styleSystem.typography.button,
  },
});

export default Button;
