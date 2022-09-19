import { injectable } from 'inversify';
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import config from 'react-native-config';

import { UserAuthStatus } from '~/types/userAuthStatus';
import { User } from '~/types/user';

export interface IFirebaseWrapperService {
  init: (onFirebaseAuthStateChanged: (user: FirebaseAuthTypes.User | null) => void) => void;
  fetchUserByEmail: (email: string) => Promise<[User | null, Error | null]>;
  signIn: () => Promise<[FirebaseAuthTypes.UserCredential | null, Error | null]>;
  signOut: () => Promise<void>;
  stopUpdates: () => void;
}

@injectable()
export class FirebaseWrapperService implements IFirebaseWrapperService {
  private _firebaseAuthStateChangeSubscriber?: () => void;

  public init = (onFirebaseAuthStateChanged: (user: FirebaseAuthTypes.User | null) => void) => {
    GoogleSignin.configure({
      webClientId: config.GOOGLE_WEB_CLIENT_ID,
    });
    this._firebaseAuthStateChangeSubscriber = auth().onAuthStateChanged(onFirebaseAuthStateChanged);
  };

  public fetchUserByEmail = async (email: string): Promise<[User | null, Error | null]> => {
    const usersQuerySnapshot = await firestore().collection('users').where('email', '==', email).get();
    if (usersQuerySnapshot.empty) {
      return [null, new Error('User not found!')];
    }
    if (usersQuerySnapshot.size > 1) {
      return [null, new Error('More than one user with the same email')];
    }
    const user = usersQuerySnapshot.docs[0].data() as User;
    return [user, null];
  };

  public stopUpdates = () => {
    if (this._firebaseAuthStateChangeSubscriber) {
      this._firebaseAuthStateChangeSubscriber();
    }
  };

  public signIn = async (): Promise<[FirebaseAuthTypes.UserCredential | null, Error | null]> => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const firebaseUserCredential = await auth().signInWithCredential(googleCredential);
      return [firebaseUserCredential, null];
    } catch (e) {
      console.log(e);
      return [null, e];
    }
  };

  public signOut = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await auth().signOut();
  };
}

export const FirebaseWrapperServiceId = Symbol('FirebaseWrapperService');
