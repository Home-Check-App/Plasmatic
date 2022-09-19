import { useEffect, useRef } from 'react';
import { INotificationService, NotificationServiceId } from '~/services/notifications';
import { useInjection } from '~/services/serviceProvider';

export const useNotifications = () => {
  const service = useRef(useInjection<INotificationService>(NotificationServiceId));

  const getInitialNotificationLink = async () => {
    return service.current.getInitialNotificationLink();
  };

  const onNotificationOpenedApp = async (listener: (url: string) => void) => {
    service.current.onNotificationOpenedApp(listener);
  };

  const removeNotificationOpenListener = () => {
    service.current.removeNotificationOpenListener();
  };

  const printOutNotificationsToken = async () => {
    const token = await service.current.getGCMToken();
    console.log('🚀 ~ file: notificationsFacades.ts ~ line 18 ~ printOutNotificationsToken ~ token', token);
  };

  useEffect(() => {
    printOutNotificationsToken();
  }, []);

  return { getInitialNotificationLink, onNotificationOpenedApp, removeNotificationOpenListener };
};
