import { LectureFormValues } from "@/lib/schemas/lecture-schema";

type AdditionalLectureFields = {
  tags: string[] | { id: number, name: string }[];
  id: number;
  imageUrl: string;
  metrics: {
    timesVisited: number, 
    timesShared: number
  };
}

export type Lecture = Omit<LectureFormValues, "tags" | "image"> & AdditionalLectureFields;
