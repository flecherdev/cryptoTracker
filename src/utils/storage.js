import AsyncStorage from '@react-native-community/async-storage';

class Store {
  static instance = new Store();

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.log(`storage store error ${error}`);
      return false;
    }
  };

  get = async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log(`storage get error ${error}`);
      throw Error(error);
    }
  };

  getAll = async keys => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.log(`storage getAll error ${error}`);
      throw Error(error);
    }
  };

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.log(`storage getAll error ${error}`);
      throw Error(error);
    }
  };

  remove = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log(`storage remove error ${error}`);
      return false;
    }
  };
}

export default Store;
