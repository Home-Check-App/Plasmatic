import { Platform } from 'react-native';
import { inject, injectable } from 'inversify';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import {
  INotificationAnalyticsService,
  NotificationAnalyticsServiceId,
} from '~/services/analytics/notificationsAnalytics';

export interface INotificationService {
  getIOSAuthStatus: () => Promise<FirebaseMessagingTypes.AuthorizationStatus>;
  requestPermission: () => Promise<boolean>;
  getGCMToken: () => Promise<string | null>;
  getInitialNotificationLink: () => Promise<string | undefined>;
  onNotificationOpenedApp: (listener: (url: string) => void) => void;
  removeNotificationOpenListener: () => void;
}

@injectable()
export class NotificationService implements INotificationService {
  private readonly _notificationAnalyticsService: INotificationAnalyticsService;

  private _unsubscribeFromNotifications: () => void = () => undefined;

  constructor(
    @inject(NotificationAnalyticsServiceId)
    notificationAnalyticsService: INotificationAnalyticsService,
  ) {
    this._notificationAnalyticsService = notificationAnalyticsService;
  }

  public async getIOSAuthStatus() {
    return messaging().hasPermission();
  }

  public async requestPermission() {
    try {
      let permissionGranted = await this.checkIfPermissionHasBeenGranted();
      if (permissionGranted) {
        await messaging().registerDeviceForRemoteMessages();
        return true;
      }
      permissionGranted = await this.requestPermissions();
      await messaging().registerDeviceForRemoteMessages();
      return permissionGranted;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async getGCMToken() {
    return messaging().getToken();
  }

  public async getInitialNotificationLink() {
    const message = await messaging().getInitialNotification();

    this._notificationAnalyticsService.reportInitialNotificationOpen(message?.data);

    return message?.data?.link;
  }

  public onNotificationOpenedApp = (listener: (url: string) => void) => {
    const unsubscribeFromNotifications = messaging().onNotificationOpenedApp(message => {
      const url = message?.data?.link;

      if (url) {
        listener(url);
      }
    });
    this._unsubscribeFromNotifications = unsubscribeFromNotifications;
  };

  public removeNotificationOpenListener = () => {
    this._unsubscribeFromNotifications();
  };

  private async checkIfPermissionHasBeenGranted() {
    if (Platform.OS === 'android') {
      return true;
    }
    const authStatus = await messaging().hasPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  }

  private async requestPermissions() {
    if (Platform.OS === 'android') {
      return true;
    }
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  }
}

export const NotificationServiceId = Symbol('NotificationService');
