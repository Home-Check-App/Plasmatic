import { useEffect, useRef, useState } from 'react';
import { Subscription } from 'rxjs';

import { useInjection } from '~/services/serviceProvider';
import { onEmit } from '~/helpers/onEmit';
import { IUserService, UserServiceId } from '~/services/user';
import { User } from '~/types/user';

export const useUser = () => {
  const service = useRef(useInjection<IUserService>(UserServiceId));

  const [user, setUser] = useState<User | null>(null);

  const refreshUser = () => {
    return service.current.refreshUser();
  };

  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<User | null>(service.current.user, value => {
        setUser(value);
      }),
    ];
    return () => {
      subscriptions.forEach(it => it.unsubscribe());
    };
  }, []);

  return { user, refreshUser };
};

export const useUserSignInAndFetch = () => {
  const service = useRef(useInjection<IUserService>(UserServiceId));

  const signInAndFetchUser = () => {
    return service.current.signInAndFetchUserByEmail();
  };

  return { signInAndFetchUser };
};

export const useClearUserAndSignOut = () => {
  const service = useRef(useInjection<IUserService>(UserServiceId));

  const clearUserAndSignOut = () => {
    return service.current.clearUserAndSignOut();
  };

  return { clearUserAndSignOut };
};
