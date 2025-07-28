import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';
const USER_ROLE_KEY = 'userRole';

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error('Error saving token', e);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error('Error getting token', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_ROLE_KEY);
  } catch (e) {
    console.error('Error removing token', e);
  }
};

export const saveUserRole = async (role: string) => {
  try {
    await AsyncStorage.setItem(USER_ROLE_KEY, role);
  } catch (e) {
    console.error('Error saving user role', e);
  }
};

export const getUserRole = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(USER_ROLE_KEY);
  } catch (e) {
    console.error('Error getting user role', e);
    return null;
  }
}; 