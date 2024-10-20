import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLecture, putLectureImage } from "./apis/lectures-api";

export const useLecturesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLecture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
    },
  })
};


export const useLectureImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, id }: { file: File, id: number }) => {
      return putLectureImage(file, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
    },
  })
};
