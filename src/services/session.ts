import { inject, injectable } from 'inversify';
import { BehaviorSubject } from 'rxjs';

import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { UserAuthStatus } from '~/types/userAuthStatus';
import { FirebaseWrapperServiceId, IFirebaseWrapperService } from './firebaseWrapper';
import { User } from '~/types/user';

export interface ISessionService {
  firebaseUser: FirebaseAuthTypes.User | null;
  userStatus: BehaviorSubject<UserAuthStatus>;
  fetchUserByEmail: (email: string) => Promise<[User | null, Error | null]>;
  signIn: () => Promise<[FirebaseAuthTypes.UserCredential | null, Error | null]>;
  signOut: () => Promise<void>;
  stopUpdates: () => void;
}

@injectable()
export class SessionService implements ISessionService {
  private readonly _userStatus: BehaviorSubject<UserAuthStatus> = new BehaviorSubject<UserAuthStatus>(
    UserAuthStatus.UNKNOWN,
  );
  private readonly _firebaseWrapperService: IFirebaseWrapperService;

  private _firebaseUser: FirebaseAuthTypes.User | null = null;

  get userStatus() {
    return this._userStatus;
  }

  get firebaseUser() {
    return this._firebaseUser;
  }

  constructor(@inject(FirebaseWrapperServiceId) firebaseWrapperService: IFirebaseWrapperService) {
    this._firebaseWrapperService = firebaseWrapperService;
    this._firebaseWrapperService.init(this.onFirebaseAuthStateChanged);
  }

  public fetchUserByEmail = (email: string) => {
    return this._firebaseWrapperService.fetchUserByEmail(email);
  };

  public stopUpdates = () => {
    this._firebaseWrapperService.stopUpdates();
  };

  public signIn = async (): Promise<[FirebaseAuthTypes.UserCredential | null, Error | null]> => {
    return this._firebaseWrapperService.signIn();
  };

  public signOut = async () => {
    return this._firebaseWrapperService.signOut();
  };

  private onFirebaseAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    this._firebaseUser = user;
    this._userStatus.next(UserAuthStatus.UNAUTHORIZED);
  };
}

export const SessionServiceId = Symbol('SessionService');
