import axios from "axios";

const urls = {
  baseURL: "http://localhost:3000/",
  productionURL: "https://api.example.com/",
}

export const api = axios.create({
    baseURL: urls.baseURL,
    withCredentials: true,
  });

