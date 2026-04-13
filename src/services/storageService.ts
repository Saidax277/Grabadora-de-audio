import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  // Método para guardar
  async saveData<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(`Error guardando datos en ${key}`, e);
    }
  },

  // Método para recuperar
  async getData<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(`Error recuperando datos de ${key}`, e);
      return null;
    }
  },

  async clear(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
};