import { LoginFormValues } from "@/lib/schemas/login-schema";
import { RegisterFormValues } from "@/lib/schemas/register-schema";

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export type User = {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export type LoginResponse = {
  accessToken: string;
  expiresIn: number
}

export const login = async (loginBody: LoginFormValues): Promise<LoginResponse> => {
  const result = await axios.post(`${BASE_URL}/auth/login`, loginBody);
  return result.data;
}

export const register = async (registerBody: RegisterFormValues): Promise<User> => {
  const result = await axios.post(`${BASE_URL}/auth/register`, registerBody);
  return result.data;
}

export const fetchUser = async (accessToken: string): Promise<User> => {
  const result = await axios.get(`${BASE_URL}/user`, {
    headers: {"Authorization": `Bearer ${accessToken}`}
  });
  return result.data;
}
