import { inject, injectable } from 'inversify';
import firestore from '@react-native-firebase/firestore';
import { BehaviorSubject } from 'rxjs';

import { User } from '~/types/user';
import { ISessionService, SessionServiceId } from './session';
import { IStorageService, StorageServiceId } from './storage';
import { USER_STORAGE_KEY } from '~/consts/storageKeys';

export interface IUserService {
  user: BehaviorSubject<User | null>;
  refreshUser: () => Promise<Error | null>;
  fetchUserByEmail: (email: string) => Promise<[User | null, Error | null]>;
  signInAndFetchUserByEmail: () => Promise<Error | null>;
  clearUserAndSignOut: () => Promise<void>;
}

@injectable()
export class UserService implements IUserService {
  private readonly _sessionService: ISessionService;
  private readonly _storageService: IStorageService;

  private readonly _user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  get user(): BehaviorSubject<User | null> {
    return this._user;
  }

  constructor(
    @inject(SessionServiceId) sessionService: ISessionService,
    @inject(StorageServiceId) storageService: IStorageService,
  ) {
    this._storageService = storageService;
    this._sessionService = sessionService;
    this.retrievePersistedUser();
  }

  public fetchUserByEmail = async (email: string): Promise<[User | null, Error | null]> => {
    const [user, error] = await this._sessionService.fetchUserByEmail(email);
    if (error) {
      return [null, error];
    }
    await this._storageService.storeObject(USER_STORAGE_KEY, user);
    this._user.next(user);
    return [user, null];
  };

  public refreshUser = async () => {
    const email = this._sessionService.firebaseUser?.email;
    if (email) {
      const [_, userFetchError] = await this.fetchUserByEmail(email);
      return userFetchError;
    }
    return new Error('No firebase user!');
  };

  public signInAndFetchUserByEmail = async () => {
    const [firebaseUserCredential, error] = await this._sessionService.signIn();
    const email = firebaseUserCredential?.user.email;
    if (email) {
      const [_, userFetchError] = await this.fetchUserByEmail(email);
      return userFetchError;
    }
    return error;
  };

  public clearUserAndSignOut = async () => {
    this._user.next(null);
    await this._sessionService.signOut();
  };

  private retrievePersistedUser = async () => {
    const user = await this._storageService.getObject(USER_STORAGE_KEY);
    if (user) {
      this._user.next(user);
    }
  };
}

export const UserServiceId = Symbol('UserService');
