import React from 'react';
import { View } from 'react-native';
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import CenterShape from '~/assets/icons/login/CenterShape';
import LeftShape from '~/assets/icons/login/LeftShape';
import RightShape from '~/assets/icons/login/RightShape';

const AnimatedLoginBackground = () => {
  const leftShapeXOffset = useSharedValue(-50);
  const leftShapeYOffset = useSharedValue(-100);

  const leftShapeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            leftShapeXOffset.value,
            {
              duration: 8000,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            },
            isFinished => {
              if (isFinished) {
                leftShapeXOffset.value = -35 - Math.random() * 25;
              }
            },
          ),
        },
        {
          translateY: withTiming(
            leftShapeYOffset.value,
            {
              duration: 8000,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            },
            isFinished => {
              if (isFinished) {
                leftShapeYOffset.value = -50 - Math.random() * 60;
              }
            },
          ),
        },
      ],
    };
  });

  const centerShapeXOffset = useSharedValue(150);
  const centerShapeYOffset = useSharedValue(-80);

  const centerShapeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            centerShapeXOffset.value,
            {
              duration: 8000,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            },
            isFinished => {
              if (isFinished) {
                centerShapeXOffset.value = 140 + Math.random() * 20;
              }
            },
          ),
        },
        {
          translateY: withTiming(
            centerShapeYOffset.value,
            {
              duration: 8000,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            },
            isFinished => {
              if (isFinished) {
                centerShapeYOffset.value = -50 - Math.random() * 50;
              }
            },
          ),
        },
      ],
    };
  });

  const rightShapeXOffset = useSharedValue(150);
  const rightShapeYOffset = useSharedValue(-100);

  const rightShapeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            rightShapeXOffset.value,
            {
              duration: 8000,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            },
            isFinished => {
              if (isFinished) {
                rightShapeXOffset.value = 140 + Math.random() * 20;
              }
            },
          ),
        },
        {
          translateY: withTiming(
            rightShapeYOffset.value,
            {
              duration: 8000,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            },
            isFinished => {
              if (isFinished) {
                rightShapeYOffset.value = -50 - Math.random() * 100;
              }
            },
          ),
        },
      ],
    };
  });

  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <Animated.View style={leftShapeAnimatedStyle}>
        <LeftShape />
      </Animated.View>
      <Animated.View style={[{ position: 'absolute' }, centerShapeAnimatedStyle]}>
        <CenterShape />
      </Animated.View>
      <Animated.View style={[{ position: 'absolute' }, rightShapeAnimatedStyle]}>
        <RightShape />
      </Animated.View>
    </View>
  );
};

export default AnimatedLoginBackground;
