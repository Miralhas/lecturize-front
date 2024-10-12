import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export type NamedTags = {
  id: number;
  name: string;
} 

export const fetchTags = async (): Promise<NamedTags[]> => {
  const result = await axios.get(`${BASE_URL}/tags`);
  return result.data;
}
