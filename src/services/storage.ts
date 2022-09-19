import AsyncStorage from '@react-native-async-storage/async-storage';
import { injectable } from 'inversify';

export interface IStorageService {
  storeObject: (key: string, value: any) => Promise<void>;
  getObject: (key: string) => Promise<any | null>;
}

@injectable()
export class StorageService implements IStorageService {
  public storeObject = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  public getObject = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
}

export const StorageServiceId = Symbol('StorageService');
