import mockAnalytics from '@react-native-firebase/analytics';
import { Container } from 'inversify';

import analyticsEvents from '~/consts/analyticsEvents';
import {
  INotificationAnalyticsService,
  NotificationAnalyticsService,
  NotificationAnalyticsServiceId,
} from '~/services/analytics/notificationsAnalytics';

const expectedParams = {
  // ...expected analytics event params
};

const notification = {
  payload: {
    /* Notification payload we test against */
  },
};

describe('reportInitialNotificationOpen', () => {
  it('Should successfully report opening app from cold start push notification open', async () => {
    //@ts-expect-error
    mockAnalytics().logEvent.mockImplementationOnce((eventName: string, params: any) => {
      expect(eventName).toEqual(analyticsEvents.APP_OPEN_FROM_INITIAL_PUSH_NOTIFICATION);
      expect(params).toEqual(expectedParams);

      return Promise.resolve();
    });

    const myContainer = new Container();
    myContainer
      .bind<INotificationAnalyticsService>(NotificationAnalyticsServiceId)
      .to(NotificationAnalyticsService)
      .inSingletonScope();

    const instance = myContainer.get<INotificationAnalyticsService>(NotificationAnalyticsServiceId);

    await instance.reportInitialNotificationOpen(notification);
    expect(mockAnalytics().logEvent).toBeCalled();
  });
});
