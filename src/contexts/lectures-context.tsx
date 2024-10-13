import { fetchLectures, Lecture, postLecture } from "@/apis/lectures-api";
import { initialLecturesReducerValue, LectureActions, lectureReducer, LectureState } from "@/reducers/lecture-reducer";
import { LectureFormValues } from "@/utils/schemas/lecture-schema";
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { Dispatch, PropsWithChildren, useReducer } from "react";
import { createContext } from "./create-context";

type LecturesMutation = UseMutationResult<Lecture, Error, LectureFormValues, unknown>;
// type LecturesQuery = UseQueryResult<Lecture[], Error>;

type AuthContextState = {
  dispatch: Dispatch<LectureActions>;
  state: LectureState;
  useLecturesMutation: () => LecturesMutation;
  useLecturesQuery: () => UseQueryResult<Lecture[], Error>
}

const { useContext, ContextProvider } = createContext<AuthContextState>();

export const LectureProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(lectureReducer, initialLecturesReducerValue);
  const queryClient = useQueryClient();

  const useLecturesQuery = () => useQuery({
    queryFn: fetchLectures,
    queryKey: ["lectures"],
    enabled: false
  });

  const useLecturesMutation = () => useMutation({
    mutationFn: postLecture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
    },
  });

  return (
    <ContextProvider value={{ dispatch, state, useLecturesMutation, useLecturesQuery }}>
      {children}
    </ContextProvider>
  )
}


export const useLectureContext = useContext;
