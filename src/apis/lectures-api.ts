import { LectureFormValues } from "@/utils/schemas/lecture-schema";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJsZWN0dXJpemUtaXQiLCJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE3Mjg3NTkxMzEsImlhdCI6MTcyODY3MjczMSwic2NvcGUiOlsiQURNSU4iLCJVU0VSIl19.qtXFsebZvFq8Cl1oAZKd14wlrcBl01kzEu5h0NBYRPYgWE57Cuhq-tVGIewa3uCQayR6fhoa1AoD2AKZ3hn2WeU_ufOEyr2o36a6IWKOBUIjnQB_ydpozwkhaqOV32zSGWQIAn01f811-_Hypk_oH5NZj5L3fddob2ljkqpe2C1tgeLhrq8PxPB_ZgU1iTyUaPtmjV01gsgiCjPPeGDWRmeeqMVih_BLadrpXElTCBq-olcNt3gyFvw_y2ksL6NyQvA07-XcgcS_DcUUDXao50tsKT_9Ru7mU3JTZMF7-LV6ZBdhI3fzN8FcLS9uGsuP3EaGlFcxH3recoRVSJJAtQ";

export type Lecture = Omit<LectureFormValues, "tags"> & {tags: string[] | { id: number }[]} & {id: number};

export const fetchLectures = async (): Promise<Lecture[]> => {
  const response = await fetch(`${BASE_URL}/lectures`);
  const lectures: Lecture[] = await response.json();
  return lectures;
};

export const postLecture = async (lecture: LectureFormValues): Promise<Lecture> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);

  const response = await fetch(`${BASE_URL}/lectures`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(lecture),
  });

  return await response.json();
};

