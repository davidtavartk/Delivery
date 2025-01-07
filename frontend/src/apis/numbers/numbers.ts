import axios from 'axios';
import { CountryCodes } from '../types';

const fetchCountryCodes = async (): Promise<CountryCodes[]> => {
  try {
    const response = await axios.get('https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching country codes:', error);
    throw error;
  }
};

export default fetchCountryCodes;
