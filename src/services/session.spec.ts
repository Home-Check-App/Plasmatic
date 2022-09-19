import { Container } from 'inversify';
import mockAuth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { ISessionService, SessionServiceId, SessionService } from '~/services/session';
import { UserAuthStatus } from '~/types/userAuthStatus';

export const mockFirebaseUser = {
  displayName: 'Alex',
  email: 'test@gmail.com',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  phoneNumber: 'number',
  photoURL: 'url',
  providerData: [],
  providerId: 'facebook.com',
  uid: 'MOCK_ID',
};

describe('userStatus', () => {
  it('User status should be unauthorized', done => {
    // @ts-expect-error
    mockAuth().onAuthStateChanged.mockImplementationOnce((callback: (user: FirebaseAuthTypes.User | null) => void) => {
      callback(null);
      done();
    });

    const myContainer = new Container();
    myContainer.bind<ISessionService>(SessionServiceId).to(SessionService);

    const instance = myContainer.get<ISessionService>(SessionServiceId);

    const subscriptionCallback = jest.fn();

    instance.userStatus.subscribe(subscriptionCallback);

    expect(subscriptionCallback).toBeCalledWith(UserAuthStatus.UNAUTHORIZED);
  });
  it('User status should be authorized', done => {
    // @ts-expect-error
    mockAuth().onAuthStateChanged.mockImplementationOnce((callback: (user: FirebaseAuthTypes.User | null) => void) => {
      callback(mockFirebaseUser as any);
      done();
    });

    const myContainer = new Container();
    myContainer.bind<ISessionService>(SessionServiceId).to(SessionService);

    const instance = myContainer.get<ISessionService>(SessionServiceId);

    const subscriptionCallback = jest.fn();

    instance.userStatus.subscribe(subscriptionCallback);

    expect(subscriptionCallback).toBeCalledWith(UserAuthStatus.AUTHORIZED);
  });
});

describe('signIn', () => {
  it('Should successfully sign in', async () => {
    // @ts-expect-error
    mockAuth().onAuthStateChanged.mockImplementationOnce((callback: (user: FirebaseAuthTypes.User | null) => void) => {
      callback(null);
    });
    // @ts-expect-error
    mockAuth.GoogleAuthProvider.credential.mockImplementationOnce((token: string) => {
      expect(token).toEqual('GOOGLE_AUTH_TOKEN');
      return { auth: true };
    });
    // @ts-expect-error
    mockAuth().signInWithCredential.mockImplementationOnce((status: any) => {
      expect(status.auth).toEqual(true);
      return { user: mockFirebaseUser };
    });

    const myContainer = new Container();
    myContainer.bind<ISessionService>(SessionServiceId).to(SessionService);

    const instance = myContainer.get<ISessionService>(SessionServiceId);

    const subscriptionCallback = jest.fn();
    instance.userStatus.subscribe(subscriptionCallback);
    expect(subscriptionCallback).toBeCalledWith(UserAuthStatus.UNAUTHORIZED);

    const [firebaseUserCredential, error] = await instance.signIn();
    expect(firebaseUserCredential?.user).toEqual(mockFirebaseUser);
    expect(error).toBeFalsy();
  });
});
