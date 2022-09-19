import { useEffect, useRef, useState } from 'react';
import { Subscription } from 'rxjs';

import { useInjection } from '~/services/serviceProvider';
import { onEmit } from '~/helpers/onEmit';
import { ISessionService, SessionServiceId } from '~/services/session';
import { UserAuthStatus } from '~/types/userAuthStatus';

export const useUserAuthStatus = () => {
  const service = useRef(useInjection<ISessionService>(SessionServiceId));

  const [userAuthStatus, setUserAuthStatus] = useState(UserAuthStatus.UNKNOWN);

  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<UserAuthStatus>(service.current.userStatus, value => {
        setUserAuthStatus(value);
      }),
    ];
    return () => {
      subscriptions.forEach(it => it.unsubscribe());
    };
  }, []);

  return { userAuthStatus };
};
