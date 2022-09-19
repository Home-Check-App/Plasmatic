import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { scale } from '~/helpers/scale';
import styleSystem from '~/shared/styles';

type Props = {
  value: string | undefined;
  onChangeText: (value: string) => void;
  disabled: boolean;
};

const PhoneInput: React.FC<Props> = props => {
  return (
    <TextInput
      editable={!props.disabled}
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={'(xxx)-xxx-xx-xx'}
      keyboardType={'phone-pad'}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: styleSystem.colors.ui.input,
    paddingHorizontal: scale(24),
    paddingVertical: scale(16),
    borderRadius: 32,
    width: '100%',
    fontFamily: 'avenir-heavy',
    fontSize: scale(14),
  },
});

export default PhoneInput;
