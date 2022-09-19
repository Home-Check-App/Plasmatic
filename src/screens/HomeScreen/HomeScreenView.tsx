import React from 'react';
import { Text, View } from 'react-native';
import CalendarIcon from '~/assets/icons/home/CalendarIcon';
import PeopleIcon from '~/assets/icons/home/PeopleIcon';
import PostsIcon from '~/assets/icons/home/PostsIcon';
import EventsTab from '~/components/eventsTab';

import HomeScreenHeader from '~/components/homeScreenHeader/HomeScreenHeader';
import TabView from '~/shared/components/TabView';

type Props = {
  name: string | null;
  location: string | null;
  profilePictureURL: string | null;
};

const HomeScreenView: React.FC<Props> = props => {
  const homeViews = [
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home1</Text>
    </View>,
    <EventsTab />,
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home3</Text>
    </View>,
  ];

  return (
    <View style={{ flex: 1 }}>
      <HomeScreenHeader name={props.name} location={props.location} profilePictureURL={props.profilePictureURL} />
      <TabView
        defaultTabIndex={1}
        tabsContent={homeViews}
        tabsIds={['Posts', 'Events', 'Connect']}
        tabIcons={[
          (props: any) => <PostsIcon {...props} />,
          (props: any) => <CalendarIcon {...props} />,
          (props: any) => <PeopleIcon {...props} />,
        ]}
      />
    </View>
  );
};

export default HomeScreenView;
