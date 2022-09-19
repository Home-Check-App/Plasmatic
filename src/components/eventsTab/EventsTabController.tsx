import React from 'react';
import { useUserEvents } from '~/facades/userEventsFacades';
import EventsTabView from './EventsTabView';

const EventsTabController = () => {
  const { userEvents, isLoading } = useUserEvents();

  return <EventsTabView events={userEvents} isLoading={isLoading} />;
};

export default EventsTabController;
