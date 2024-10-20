import { LectureFormValues } from "@/lib/schemas/lecture-schema";
import { Lecture } from "@/types/lecture";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchLectures = async (): Promise<Lecture[]> => {
  const response = await fetch(`${BASE_URL}/lectures`);
  const lectures: Lecture[] = await response.json();
  return lectures;
};

export const postLecture = async (lecture: LectureFormValues): Promise<Lecture> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("accessToken")}`);

  const response = await fetch(`${BASE_URL}/lectures`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(lecture),
  });

  return await response.json();
};

export const putLectureImage = async (file: File, id: number) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("description", file.name.slice(0, file.name.indexOf(".")));
  const response = await axios.put(`${BASE_URL}/lectures/${id}/image`, formData, {
    headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` }
  });
  return response.data;
}
