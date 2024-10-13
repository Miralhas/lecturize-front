import { Lecture } from "@/apis/lectures-api"

export type LectureState = {
  lectures: Lecture[] | null;
  currentLecture: Lecture | null;
}

type AllLecturesAction = {
  type: "lectures/loaded";
  payload: Lecture[];
}

type CurrentLectureAction = {
  type: "lecture/current";
  payload: Lecture;
}

export type LectureActions = AllLecturesAction | CurrentLectureAction;

export const initialLecturesReducerValue: LectureState = {
  currentLecture: null,
  lectures: null
}

export const lectureReducer = (state: LectureState, action: LectureActions): LectureState => {
  switch (action.type) {
    case "lectures/loaded": {
      return {...state, lectures: action.payload};
    }

    case "lecture/current": {
      return {...state, currentLecture: action.payload};
    }
  }
}
