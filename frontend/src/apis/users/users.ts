import { api } from '..';
import { User } from '../types';


export const createUser = async (user: User): Promise<User> => {
  try {
    const response = await api.post('/users/register', user);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to register user.');
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

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
    return response.data;
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
};

export const loginUser = async (phone: string, password: string): Promise<{ message: string }> => {
  try {
    const response = await api.post('/users/login', { phone, password });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to log in.');
  } catch (error) {
    console.error('Error logging in user:', error);
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