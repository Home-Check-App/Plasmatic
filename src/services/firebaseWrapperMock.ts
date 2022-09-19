import { injectable } from 'inversify';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { User } from '~/types/user';
import { IFirebaseWrapperService } from './firebaseWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_STORAGE_KEY } from '~/consts/storageKeys';

const MOCK_FIREBASE_USER = {
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

@injectable()
export class FirebaseWrapperServiceMock implements IFirebaseWrapperService {
  private _firebaseAuthStateChangeCallback?: (user: FirebaseAuthTypes.User | null) => void;

  public init = (onFirebaseAuthStateChanged: (user: FirebaseAuthTypes.User | null) => void) => {
    this._firebaseAuthStateChangeCallback = onFirebaseAuthStateChanged;
    this.getInitialUser();
  };

  private checkIfLocalUserIsStored = async () => {
    let result;
    try {
      result = await AsyncStorage.getItem(USER_STORAGE_KEY);
    } catch (e) {
      console.log(e);
    }
    return !!result;
  };

  private getInitialUser = async () => {
    const hasUserStored = await this.checkIfLocalUserIsStored();
    if (hasUserStored) {
      this._firebaseAuthStateChangeCallback && this._firebaseAuthStateChangeCallback(MOCK_FIREBASE_USER as any);
    } else {
      this._firebaseAuthStateChangeCallback && this._firebaseAuthStateChangeCallback(null);
    }
  };

  public fetchUserByEmail = async (email: string): Promise<[User | null, Error | null]> => {
    const user = await Promise.resolve({
      displayName: 'Alex',
      email: 'test@gmail.com',
      location: 'Berlin, DE',
      photoURL: 'pic3',
    });
    return [user, null];
  };

  public stopUpdates = () => {};

  public signIn = async (): Promise<[FirebaseAuthTypes.UserCredential | null, Error | null]> => {
    const firebaseUserCredential = await Promise.resolve({
      user: MOCK_FIREBASE_USER,
    } as any);
    this._firebaseAuthStateChangeCallback && this._firebaseAuthStateChangeCallback(MOCK_FIREBASE_USER as any);

    return [firebaseUserCredential, null];
  };

  public signOut = async () => {
    await Promise.resolve();
    this._firebaseAuthStateChangeCallback && this._firebaseAuthStateChangeCallback(null);
  };
}
