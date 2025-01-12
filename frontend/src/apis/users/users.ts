import { api } from '..';
import { User } from '../types';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkUserExists = async (phone: string): Promise<{ exists: boolean }> => {
  try {
    const response = await api.post('/users/check', { phone });
    return response.data; // Assumes the API returns { exists: true/false }
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
};


// export const getUserById = async (id: number): Promise<User> => {
//   try {
//     const response = await api.get(`/users/${id}`);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const createUser = async (user: User): Promise<User> => {
//   try {
//     const response = await api.post('/users', user);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };