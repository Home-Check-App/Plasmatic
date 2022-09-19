import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import HomeIcon from '~/assets/icons/tabBar/HomeIcon';
import ServicesIcon from '~/assets/icons/tabBar/ServicesIcon';
import PartnersIcon from '~/assets/icons/tabBar/PartnersIcon';
import ActivityIcon from '~/assets/icons/tabBar/ActivityIcon';
import styleSystem from '~/shared/styles';
import { scale } from '~/helpers/scale';

const HomeTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: styleSystem.colors.secondary.white,
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const renderFocusedButton = () => {
          switch (route.name) {
            case 'Home':
              return (
                <View
                  style={{
                    backgroundColor: styleSystem.colors.primary.blue,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 32,
                    padding: scale(10),
                  }}>
                  <HomeIcon height={32} width={32} color={styleSystem.colors.secondary.white} />
                </View>
              );
            case 'Services':
              return (
                <View
                  style={{
                    backgroundColor: styleSystem.colors.primary.blue,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 32,
                    padding: scale(10),
                  }}>
                  <ServicesIcon height={32} width={32} color={styleSystem.colors.secondary.white} />
                </View>
              );
            case 'Partners':
              return (
                <View
                  style={{
                    backgroundColor: styleSystem.colors.primary.blue,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 32,
                    padding: scale(10),
                  }}>
                  <PartnersIcon height={32} width={32} color={styleSystem.colors.secondary.white} />
                </View>
              );
            case 'Activity':
              return (
                <View
                  style={{
                    backgroundColor: styleSystem.colors.primary.blue,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 32,
                    padding: scale(10),
                  }}>
                  <ActivityIcon height={32} width={32} color={styleSystem.colors.secondary.white} />
                </View>
              );
            default:
              break;
          }
        };

        const renderUnFocuseButton = () => {
          switch (route.name) {
            case 'Home':
              return <HomeIcon height={32} width={32} color={styleSystem.colors.secondary.light} />;
            case 'Services':
              return <ServicesIcon height={32} width={32} color={styleSystem.colors.secondary.light} />;
            case 'Partners':
              return <PartnersIcon height={32} width={32} color={styleSystem.colors.secondary.light} />;
            case 'Activity':
              return <ActivityIcon height={32} width={32} color={styleSystem.colors.secondary.light} />;
            default:
              break;
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center' }}>
            {isFocused ? renderFocusedButton() : renderUnFocuseButton()}
            <View style={styles.labelContainer}>
              <Text
                style={[
                  styles.label,
                  { color: isFocused ? styleSystem.colors.primary.blue : styleSystem.colors.secondary.light },
                ]}>
                {label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    paddingVertical: scale(4),
  },
  label: {
    ...styleSystem.typography.labelSmall,
    fontFamily: 'avenir-heavy',
  },
});

export default HomeTabBar;
