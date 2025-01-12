export interface Restaurant {
  image: string;
  id: number;
  name: string;
  description: string;
  location: string;
  rating: number;
  delivery_available: boolean;
}

export interface CountryCodes {
  name: string;
  dial_code: string;
  code: string;
}
export interface User {
  username: string;
  email: string;
  password: string;
  phone: string;
}