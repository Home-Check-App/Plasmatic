import { injectable } from 'inversify';
import analytics from '@react-native-firebase/analytics';

import analyticsEvents from '~/consts/analyticsEvents';

export interface INotificationAnalyticsService {
  reportInitialNotificationOpen: (notificationOpen: any) => Promise<void>;
}

@injectable()
export class NotificationAnalyticsService implements INotificationAnalyticsService {
  public reportInitialNotificationOpen = async (notificationOpen: any) => {
    // Resolve push notifications data and report the event

    const params = {};
    await analytics().logEvent(analyticsEvents.APP_OPEN_FROM_INITIAL_PUSH_NOTIFICATION, params);
  };
}

export const NotificationAnalyticsServiceId = Symbol('NotificationAnalyticsService');
