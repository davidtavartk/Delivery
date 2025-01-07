import {api} from '..';
import Restaurant from '../types';

export const getRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response = await api.get("/restaurants");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
