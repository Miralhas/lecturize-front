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
