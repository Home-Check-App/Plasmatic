import { BehaviorSubject } from 'rxjs';
import mockFirestore from '@react-native-firebase/firestore';
import { Container, injectable } from 'inversify';

import { IUserService, UserService, UserServiceId } from '~/services/user';
import { ISessionService, SessionServiceId } from '~/services/session';
import { UserAuthStatus } from '~/types/userAuthStatus';
import { mockFirebaseUser } from './session.spec';
import { IStorageService, StorageServiceId } from './storage';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const mockUser = {
  displayName: 'Alex',
  email: 'alexkorzh7@gmail.com',
  photoURL: 'pic1',
  location: 'Palm Springs, CA',
};

describe('fetchUserByEmail', () => {
  @injectable()
  class SessionServiceMock implements ISessionService {
    firebaseUser: FirebaseAuthTypes.User | null = mockFirebaseUser as any;
    userStatus: BehaviorSubject<UserAuthStatus> = new BehaviorSubject<UserAuthStatus>(UserAuthStatus.AUTHORIZED);
    signIn = () => Promise.resolve([{ user: mockFirebaseUser }, null] as any);
    stopUpdates: () => void = () => undefined;
  }

  @injectable()
  class StorageServiceMock implements IStorageService {
    storeObject: (key: string, value: any) => Promise<void> = () => Promise.resolve();
    getObject: (key: string) => Promise<any> = () => Promise.resolve(null);
  }

  it('Should successfully fetch user by email', async () => {
    // @ts-expect-error
    mockFirestore().collection.mockImplementationOnce((collectionName: string) => {
      expect(collectionName).toEqual('users');
      return {
        where: (leftValue: string, operator: string, rightValue: string) => {
          expect(leftValue).toEqual('email');
          expect(operator).toEqual('==');
          expect(rightValue).toEqual('alexkorzh7@gmail.com');
          return {
            get: () => {
              return new Promise(resolve => {
                resolve({
                  empty: false,
                  size: 1,
                  docs: [{ data: () => mockUser }],
                });
              });
            },
          };
        },
      };
    });

    const myContainer = new Container();
    myContainer.bind<IUserService>(UserServiceId).to(UserService);
    myContainer.bind<ISessionService>(SessionServiceId).to(SessionServiceMock);
    myContainer.bind<IStorageService>(StorageServiceId).to(StorageServiceMock);

    const instance = myContainer.get<IUserService>(UserServiceId);
    const [user, error] = await instance.fetchUserByEmail('alexkorzh7@gmail.com');
    expect(user).toEqual(mockUser);
    expect(error).toBeFalsy();
  });
  it('Should return error "User not found!"', async () => {
    // @ts-expect-error
    mockFirestore().collection.mockImplementationOnce((collectionName: string) => {
      expect(collectionName).toEqual('users');
      return {
        where: (leftValue: string, operator: string, rightValue: string) => {
          expect(leftValue).toEqual('email');
          expect(operator).toEqual('==');
          expect(rightValue).toEqual('alexkorzh7@gmail.com');
          return {
            get: () => {
              return new Promise(resolve => {
                resolve({
                  empty: true,
                  size: 0,
                  docs: [],
                });
              });
            },
          };
        },
      };
    });

    const myContainer = new Container();
    myContainer.bind<IUserService>(UserServiceId).to(UserService);
    myContainer.bind<ISessionService>(SessionServiceId).to(SessionServiceMock);
    myContainer.bind<IStorageService>(StorageServiceId).to(StorageServiceMock);

    const instance = myContainer.get<IUserService>(UserServiceId);
    const [user, error] = await instance.fetchUserByEmail('alexkorzh7@gmail.com');
    expect(user).toEqual(null);
    expect(error?.message).toEqual('User not found!');
  });
  it('Should return error "More than one user with the same email"', async () => {
    // @ts-expect-error
    mockFirestore().collection.mockImplementationOnce((collectionName: string) => {
      expect(collectionName).toEqual('users');
      return {
        where: (leftValue: string, operator: string, rightValue: string) => {
          expect(leftValue).toEqual('email');
          expect(operator).toEqual('==');
          expect(rightValue).toEqual('alexkorzh7@gmail.com');
          return {
            get: () => {
              return new Promise(resolve => {
                resolve({
                  empty: false,
                  size: 2,
                  docs: [{ data: () => mockUser }, { data: () => mockUser }],
                });
              });
            },
          };
        },
      };
    });

    const myContainer = new Container();
    myContainer.bind<IUserService>(UserServiceId).to(UserService);
    myContainer.bind<ISessionService>(SessionServiceId).to(SessionServiceMock);
    myContainer.bind<IStorageService>(StorageServiceId).to(StorageServiceMock);

    const instance = myContainer.get<IUserService>(UserServiceId);
    const [user, error] = await instance.fetchUserByEmail('alexkorzh7@gmail.com');
    expect(user).toEqual(null);
    expect(error?.message).toEqual('More than one user with the same email');
  });
});

describe('signInAndFetchUserByEmail', () => {
  @injectable()
  class StorageServiceMock implements IStorageService {
    storeObject: (key: string, value: any) => Promise<void> = () => Promise.resolve();
    getObject: (key: string) => Promise<any> = () => Promise.resolve(null);
  }

  it('Should successfully sign in and fetch user by email', async () => {
    @injectable()
    class SessionServiceMock implements ISessionService {
      firebaseUser: FirebaseAuthTypes.User | null = mockFirebaseUser as any;
      userStatus: BehaviorSubject<UserAuthStatus> = new BehaviorSubject<UserAuthStatus>(UserAuthStatus.AUTHORIZED);
      signIn = () => Promise.resolve([{ user: mockFirebaseUser }, null] as any);
      stopUpdates: () => void = () => undefined;
    }
    // @ts-expect-error
    mockFirestore().collection.mockImplementationOnce((collectionName: string) => {
      expect(collectionName).toEqual('users');
      return {
        where: (leftValue: string, operator: string, rightValue: string) => {
          expect(leftValue).toEqual('email');
          expect(operator).toEqual('==');
          expect(rightValue).toEqual('alexkorzh7@gmail.com');
          return {
            get: () => {
              return new Promise(resolve => {
                resolve({
                  empty: false,
                  size: 1,
                  docs: [{ data: () => mockUser }],
                });
              });
            },
          };
        },
      };
    });

    const myContainer = new Container();
    myContainer.bind<IUserService>(UserServiceId).to(UserService);
    myContainer.bind<ISessionService>(SessionServiceId).to(SessionServiceMock);
    myContainer.bind<IStorageService>(StorageServiceId).to(StorageServiceMock);

    const instance = myContainer.get<IUserService>(UserServiceId);
    const error = await instance.signInAndFetchUserByEmail();

    expect(error).toBeFalsy();
  });
  it('Should return error if sign in fails', async () => {
    @injectable()
    class SessionServiceMock implements ISessionService {
      firebaseUser: FirebaseAuthTypes.User | null = mockFirebaseUser as any;
      userStatus: BehaviorSubject<UserAuthStatus> = new BehaviorSubject<UserAuthStatus>(UserAuthStatus.AUTHORIZED);
      signIn = () => Promise.resolve([null, new Error()] as any);
      stopUpdates: () => void = () => undefined;
    }

    const myContainer = new Container();
    myContainer.bind<IUserService>(UserServiceId).to(UserService);
    myContainer.bind<ISessionService>(SessionServiceId).to(SessionServiceMock);
    myContainer.bind<IStorageService>(StorageServiceId).to(StorageServiceMock);

    const instance = myContainer.get<IUserService>(UserServiceId);
    const error = await instance.signInAndFetchUserByEmail();

    expect(error).toBeTruthy();
  });
});

describe('refreshUser', () => {
  @injectable()
  class StorageServiceMock implements IStorageService {
    storeObject: (key: string, value: any) => Promise<void> = () => Promise.resolve();
    getObject: (key: string) => Promise<any> = () => Promise.resolve(null);
  }

  it('Should successfully update user', async () => {
    @injectable()
    class SessionServiceMock implements ISessionService {
      firebaseUser: FirebaseAuthTypes.User | null = mockFirebaseUser as any;
      userStatus: BehaviorSubject<UserAuthStatus> = new BehaviorSubject<UserAuthStatus>(UserAuthStatus.AUTHORIZED);
      signIn = () => Promise.resolve([{ user: mockFirebaseUser }, null] as any);
      stopUpdates: () => void = () => undefined;
    }
    // @ts-expect-error
    mockFirestore().collection.mockImplementationOnce((collectionName: string) => {
      expect(collectionName).toEqual('users');
      return {
        where: (leftValue: string, operator: string, rightValue: string) => {
          expect(leftValue).toEqual('email');
          expect(operator).toEqual('==');
          expect(rightValue).toEqual('alexkorzh7@gmail.com');
          return {
            get: () => {
              return new Promise(resolve => {
                resolve({
                  empty: false,
                  size: 1,
                  docs: [{ data: () => mockUser }],
                });
              });
            },
          };
        },
      };
    });

    const myContainer = new Container();
    myContainer.bind<IUserService>(UserServiceId).to(UserService);
    myContainer.bind<ISessionService>(SessionServiceId).to(SessionServiceMock);
    myContainer.bind<IStorageService>(StorageServiceId).to(StorageServiceMock);

    const instance = myContainer.get<IUserService>(UserServiceId);
    const error = await instance.refreshUser();

    expect(error).toBeFalsy();
  });
  it('Should return error if refresh fails', async () => {
    @injectable()
    class SessionServiceMock implements ISessionService {
      firebaseUser: FirebaseAuthTypes.User | null = mockFirebaseUser as any;
      userStatus: BehaviorSubject<UserAuthStatus> = new BehaviorSubject<UserAuthStatus>(UserAuthStatus.AUTHORIZED);
      signIn = () => Promise.resolve([{ user: mockFirebaseUser }, null] as any);
      stopUpdates: () => void = () => undefined;
    }
    // @ts-expect-error
    mockFirestore().collection.mockImplementationOnce((collectionName: string) => {
      expect(collectionName).toEqual('users');
      return {
        where: (leftValue: string, operator: string, rightValue: string) => {
          expect(leftValue).toEqual('email');
          expect(operator).toEqual('==');
          expect(rightValue).toEqual('alexkorzh7@gmail.com');
          return {
            get: () => {
              return new Promise(resolve => {
                resolve({
                  empty: true,
                  size: 0,
                  docs: [],
                });
              });
            },
          };
        },
      };
    });

    const myContainer = new Container();
    myContainer.bind<IUserService>(UserServiceId).to(UserService);
    myContainer.bind<ISessionService>(SessionServiceId).to(SessionServiceMock);
    myContainer.bind<IStorageService>(StorageServiceId).to(StorageServiceMock);

    const instance = myContainer.get<IUserService>(UserServiceId);
    const error = await instance.refreshUser();

    expect(error).toBeTruthy();
  });
  it('Should return "No firebase user!" error if no firebase user is avaialble', async () => {
    @injectable()
    class SessionServiceMock implements ISessionService {
      firebaseUser: FirebaseAuthTypes.User | null = null;
      userStatus: BehaviorSubject<UserAuthStatus> = new BehaviorSubject<UserAuthStatus>(UserAuthStatus.AUTHORIZED);
      signIn = () => Promise.resolve([{ user: mockFirebaseUser }, null] as any);
      stopUpdates: () => void = () => undefined;
    }

    const myContainer = new Container();
    myContainer.bind<IUserService>(UserServiceId).to(UserService);
    myContainer.bind<ISessionService>(SessionServiceId).to(SessionServiceMock);
    myContainer.bind<IStorageService>(StorageServiceId).to(StorageServiceMock);

    const instance = myContainer.get<IUserService>(UserServiceId);
    const error = await instance.refreshUser();

    expect(error).toBeTruthy();
    expect(error?.message).toEqual('No firebase user!');
  });
});
