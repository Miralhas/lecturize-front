import { LoginFormValues } from "@/utils/schemas/login-schema";

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

type LoginResponse = {
  accessToken: string;
  expiresIn: number
}
export const login = async (loginBody: LoginFormValues): Promise<LoginResponse> => {
  const result = await axios.post(`${BASE_URL}/auth/login`, loginBody);
  return result.data;
}
