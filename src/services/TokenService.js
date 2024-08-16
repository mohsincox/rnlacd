import AsyncStorage from '@react-native-async-storage/async-storage';

let token = null;

export const setToken = async newToken => {
  token = newToken;

  if (token !== null) {
    await AsyncStorage.setItem('token', token);
  } else {
    await AsyncStorage.removeItem('token');
  }
};

export const getToken = async () => {
  if (token !== null) {
    return token;
  }

  token = await AsyncStorage.getItem('token');
};
