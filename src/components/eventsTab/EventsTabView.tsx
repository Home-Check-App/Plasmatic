import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CalendarIcon from '~/assets/icons/home/CalendarIcon';
import { scale } from '~/helpers/scale';

import styleSystem from '~/shared/styles';
import { UserEvent } from '~/types/event';
import BigEventItem from '../bigEventItem/BigEventItem';
import SmallEventItem from '../smallEventItem/SmallEventItem';

type Props = {
  events: UserEvent[];
  isLoading: boolean;
};

const EventsTabView: React.FC<Props> = props => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.topEventsContainer}>
        <View style={styles.topEventsContainerTextSection}>
          <Text style={styleSystem.typography.H5}>Your Next Events</Text>
          <TouchableOpacity>
            <Text style={styleSystem.typography.labelMedium}>View More</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          nestedScrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={props.events}
          keyExtractor={({ eventName }) => `${eventName}`}
          renderItem={({ item }) => (
            <SmallEventItem eventName={item.eventName} imageURL={item.thumbnailURL} time={item.time} />
          )}
          ListEmptyComponent={
            props.isLoading ? (
              <ActivityIndicator color={styleSystem.colors.primary.blue} />
            ) : (
              <Text style={styleSystem.typography.labelMedium}>There're no events!</Text>
            )
          }
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: scale(16) }}
        />
      </View>
      {props.events && props.events.length !== 0 && (
        <View style={[styles.bottomEventsContainer, { marginTop: scale(16) }]}>
          <BigEventItem {...props.events[0]} />
          <View style={styles.iconContainer}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CalendarIcon width={28} height={28} fill={styleSystem.colors.primary.blue} />
              <Text
                style={[
                  styleSystem.typography.labelMedium,
                  { color: styleSystem.colors.primary.blue, paddingLeft: scale(6) },
                ]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: styleSystem.colors.ui.homeBackground,
    paddingVertical: scale(16),
  },
  topEventsContainer: {
    backgroundColor: styleSystem.colors.secondary.white,
    paddingBottom: scale(24),
  },
  topEventsContainerTextSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(16),
    paddingHorizontal: scale(24),
  },
  bottomEventsContainer: {
    backgroundColor: styleSystem.colors.secondary.white,
    paddingVertical: scale(24),
    paddingHorizontal: scale(16),
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: scale(16),
  },
});

export default EventsTabView;
