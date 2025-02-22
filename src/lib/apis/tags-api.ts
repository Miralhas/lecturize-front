import { Tag } from "@/types/tag";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchTags = async (): Promise<Tag[]> => {
  const result = await axios.get(`${BASE_URL}/tags`);
  return result.data;
}
