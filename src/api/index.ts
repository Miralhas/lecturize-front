import { LectureFormValues, LoginFormValues } from "@/utils/schemas";
import axios from 'axios';

// const BASE_URL = "https://lecturizeit.westus2.cloudapp.azure.com/api";
const BASE_URL = "http://localhost:8080/api";
const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJsZWN0dXJpemUtaXQiLCJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE3Mjg3NTkxMzEsImlhdCI6MTcyODY3MjczMSwic2NvcGUiOlsiQURNSU4iLCJVU0VSIl19.qtXFsebZvFq8Cl1oAZKd14wlrcBl01kzEu5h0NBYRPYgWE57Cuhq-tVGIewa3uCQayR6fhoa1AoD2AKZ3hn2WeU_ufOEyr2o36a6IWKOBUIjnQB_ydpozwkhaqOV32zSGWQIAn01f811-_Hypk_oH5NZj5L3fddob2ljkqpe2C1tgeLhrq8PxPB_ZgU1iTyUaPtmjV01gsgiCjPPeGDWRmeeqMVih_BLadrpXElTCBq-olcNt3gyFvw_y2ksL6NyQvA07-XcgcS_DcUUDXao50tsKT_9Ru7mU3JTZMF7-LV6ZBdhI3fzN8FcLS9uGsuP3EaGlFcxH3recoRVSJJAtQ";

type Tags = string[] | { id: number }[];

export type Lecture = {
  id?: number;
  title: string;
  lecturer: string;
  description: string;
  createdAt?: Date | string;
  startsAt: Date | string;
  endsAt: Date | string;
  type: "PRESENTIAL" | "HYBRID" | "ONLINE";
  status?: string;
  tags: Tags;
  maximumCapacity?: number;
  address?: string;
  url?: string;
}

export const LECTURE_BASE: Lecture = {
  title: "LECTURE 11/10",
  lecturer: "Sua tia",
  description: "aaaaaaaaa",
  startsAt: "2024-11-05T03:00:00-03:00",
  endsAt: "2024-11-06T06:00:00-03:00",
  type: "PRESENTIAL",
  address: "asd",
  maximumCapacity: 10,
  tags: [
    { id: 10 },
    { id: 33 }
  ]
};

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

  return await response.json() as Promise<Lecture>;
};

type LoginResponse = {
  accessToken: string;
  expiresIn: number
}

export type ErrorResponse = {
  detail: string;
  instance?: string;
  status?: number;
  title: string;
  type?: string;
};

export const login = async (loginBody: LoginFormValues): Promise<LoginResponse> => {
  const result = await axios.post(`${BASE_URL}/auth/login`, loginBody);
  return result.data;
}

export type NamedTags = {
  id: number;
  name: string;
} 

export const fetchTags = async (): Promise<NamedTags[]> => {
  const result = await axios.get(`${BASE_URL}/tags`);
  return result.data;
}