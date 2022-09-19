import React from 'react';
import renderer from 'react-test-renderer';

import BigEventItem from './BigEventItem';

const mockEvent = {
  thumbnailURL: 'events2',
  eventName: 'Business Head Meeting',
  time: 'Mon Jul 18, 12:00 pm',
  location: 'EcoWorld, CA',
  bigThumbnailURL: 'events4',
};

test('renders correctly', () => {
  const tree = renderer.create(<BigEventItem {...mockEvent} />).toJSON();
  expect(tree).toMatchSnapshot();
});
