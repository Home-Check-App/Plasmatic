import React, { useEffect, useRef, useState } from 'react';

import { ActivityIndicator, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppLogo from '~/assets/icons/AppLogo';
import AnimatedLoginBackground from '~/components/animatedLoginBackground/AnimatedLoginBackground';
import PhoneInput from '~/shared/components/PhoneInput';
import { scale } from '~/helpers/scale';
import Button from '~/shared/components/Button';
import styleSystem from '~/shared/styles';
import PhoneNumberFormatter from '~/helpers/phoneNumberFormatter';

type Props = {
  validateInput: (input: string) => Error | null;
  handleSignIn: (input: string) => Promise<Error | null>;
};

const LoginScreenView: React.FC<Props> = props => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [inputValue, setInputValue] = useState<string>(PhoneNumberFormatter.formatPhone('', ''));

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const updateInputValue = (newValue: string) => {
    if (error) {
      setError(null);
    }
    setInputValue(PhoneNumberFormatter.getFormattedNumber(newValue, inputValue));
  };

  const onLoginPressWrapper = async () => {
    const validationError = props.validateInput(inputValue);
    if (validationError) {
      setError(validationError);
      setInputValue(PhoneNumberFormatter.formatPhone('', ''));
      return;
    }
    setIsLoading(true);
    const signInError = await props.handleSignIn(inputValue);
    if (isMounted.current) {
      setIsLoading(false);
      if (signInError) {
        setError(signInError);
        setInputValue(PhoneNumberFormatter.formatPhone('', ''));
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: styleSystem.colors.secondary.white }}>
      <AnimatedLoginBackground />
      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styleSystem.typography.H1}>Login</Text>
          <AppLogo />
        </View>
        <KeyboardAvoidingView style={styles.bottomContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputLabelContainer}>
              <Text style={styleSystem.typography.labelSmall}>Phone Number</Text>
            </View>
            <PhoneInput disabled={isLoading} value={inputValue} onChangeText={updateInputValue} />
          </View>
          {isLoading ? (
            <ActivityIndicator color={styleSystem.colors.primary.blue} />
          ) : (
            <Button text={'Login'} onPress={onLoginPressWrapper} />
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: scale(16),
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: scale(108),
    paddingHorizontal: scale(16),
  },
  bottomContainer: {
    paddingBottom: scale(32),
  },
  inputLabelContainer: {
    paddingBottom: scale(8),
    paddingLeft: scale(24),
  },
  inputContainer: {
    paddingBottom: scale(24),
  },
});

export default LoginScreenView;
