import React, { useImperativeHandle, useRef, useState } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  View,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styleSystem from '~/shared/styles';

import { scale } from '~/helpers/scale';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const { width: WIDTH } = Dimensions.get('window');

interface Props {
  defaultTabIndex?: number;
  flatListContainerStyle?: any;
  tabsIds: string[];
  tabIcons?: Array<(props: any) => JSX.Element>;
  tabsContent: JSX.Element[];
  onTabSwitchCallback?: (newTab: string) => void;
}

const TabView: React.FC<Props> = React.forwardRef(
  (
    { defaultTabIndex = 0, ...props }: Props,
    ref: ((instance: unknown) => void) | null | React.MutableRefObject<unknown>,
  ) => {
    const listRef = useRef<any | null>(null);
    const scrollXValue = useSharedValue(Platform.OS === 'ios' ? 0 : 0.01);
    const [currentTab, setCurrentTab] = useState(props.tabsIds[defaultTabIndex]);
    const [activeIndex, setActiveIndex] = useState(defaultTabIndex);

    const onTabButtonPress = (tab: string) => {
      if (!listRef.current) {
        return;
      }
      setCurrentTab(tab);
      const screenId = props.tabsIds.findIndex((tabName: string) => tabName === tab);
      setActiveIndex(screenId);
      listRef.current.scrollToIndex({ index: screenId, animated: true });
      if (props.onTabSwitchCallback) {
        props.onTabSwitchCallback(tab);
      }
    };

    const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const newIndex = Math.round(event.nativeEvent.contentOffset.x / (WIDTH - 24));
      if (newIndex !== activeIndex) {
        setCurrentTab(props.tabsIds[newIndex]);
        setActiveIndex(newIndex);
        if (props.onTabSwitchCallback) {
          props.onTabSwitchCallback(props.tabsIds[newIndex]);
        }
      }
    };

    const renderItem = ({ item }: any) => {
      return <View style={styles.screenContainer}>{item}</View>;
    };

    const getItemLayout = (_: any, index: number) => {
      return { length: WIDTH, offset: WIDTH * index, index };
    };

    useImperativeHandle(ref, () => ({
      switchToTab: (tab: string) => {
        onTabButtonPress(tab);
      },
    }));

    const scrollHandler = useAnimatedScrollHandler(event => {
      scrollXValue.value = event.contentOffset.x;
    });

    return (
      <View style={styles.listsContainer}>
        <View style={styles.tabsContainer}>
          <View style={styles.container}>
            {props.tabsIds.map((tabId, index) => {
              const colorStyle = useAnimatedStyle(() => {
                const color = interpolateColor(
                  scrollXValue.value,
                  [WIDTH * (index - 1), WIDTH * index, WIDTH * (index + 1)],
                  [
                    styleSystem.colors.secondary.light,
                    styleSystem.colors.primary.blue,
                    styleSystem.colors.secondary.light,
                  ],
                );

                return { color };
              });
              const opacityStyle = useAnimatedStyle(() => {
                const opacity = interpolate(
                  scrollXValue.value,
                  [WIDTH * (index - 1), WIDTH * index, WIDTH * (index + 1)],
                  [0, 1, 0],
                  Extrapolate.CLAMP,
                );

                return { opacity };
              });

              return (
                <TouchableOpacity
                  key={tabId}
                  style={styles.tabContainer}
                  onPress={() => {
                    onTabButtonPress(tabId);
                  }}
                  activeOpacity={0.7}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {props.tabIcons && (
                      <View style={{ paddingRight: scale(10) }}>
                        {props.tabIcons[index]({
                          fill:
                            currentTab === tabId ? styleSystem.colors.primary.blue : styleSystem.colors.secondary.light,
                        })}
                      </View>
                    )}
                    <Animated.Text style={[styles.label, colorStyle]}>{tabId}</Animated.Text>
                  </View>
                  <Animated.View style={[styles.bottomLine, opacityStyle]} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <AnimatedFlatList
          ref={listRef}
          scrollEnabled={false}
          data={props.tabsContent}
          keyExtractor={(_: any, index: number) => `${index}`}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          initialScrollIndex={defaultTabIndex}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          onMomentumScrollEnd={onMomentumScrollEnd}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          style={[styles.flatListContainer, props.flatListContainerStyle]}
          contentContainerStyle={styles.contentContainer}
          pagingEnabled
          horizontal
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: scale(50), // calculate to remove shadows on top
    backgroundColor: styleSystem.colors.secondary.white,
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleSystem.colors.secondary.white,
  },
  label: {
    ...styleSystem.typography.H5,
    color: styleSystem.colors.primary.blue,
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: scale(2),
    backgroundColor: styleSystem.colors.primary.blue,
  },
  flatListContainer: {
    flexGrow: 1,
    backgroundColor: styleSystem.colors.secondary.light,
  },
  contentContainer: {
    flexGrow: 1,
  },
  screenContainer: {
    width: WIDTH,
  },
  listsContainer: {
    flex: 1,
    overflow: 'visible',
  },
  tabsContainer: {
    backgroundColor: styleSystem.colors.secondary.white,
    overflow: 'visible',
    position: 'relative',
  },
});

export default TabView;
