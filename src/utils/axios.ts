import axios from "axios";

export const requester = axios.create({
  baseURL: 'https://localhost:8080',
  timeout: 1000,
});