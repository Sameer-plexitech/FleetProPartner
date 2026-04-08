import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalStorage = {
  async get(key) {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        console.log("getting AsyncStorage==>", data);
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.log("Error in AsyncStorage.getItem: ", error);
    }
  },

  async set(key, value) {
    try {
      console.log("setting AsyncStorage==>", key,"==>",value);

      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("Error in AsyncStorage.setItem: ", error);
    }
  },

  async clear(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Error in AsyncStorage.removeItem: ", error);
    }
  }
};


