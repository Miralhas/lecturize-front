import { LectureFormValues } from "@/lib/schemas/lecture-schema";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export type Lecture = Omit<LectureFormValues, "tags"> & {tags: string[] | { id: number }[]} & {id: number};

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

