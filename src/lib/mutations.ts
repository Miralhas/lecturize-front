import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { login, register } from "./apis/auth-api";
import { postLecture, putLectureImage } from "./apis/lectures-api";

export const useLecturesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLecture,
    onSuccess: (lecture) => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      toast.success(`Lecture ${lecture.title} has been created successfully!`, {
        position: "bottom-right",
      });
    },
    onError: (error) => {
      toast.error("Failed to create lecture. Please try again.", {
        description: error.message,
      })
    }
  })
};


export const useLectureImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, id }: { file: File, id: number }) => {
      return putLectureImage(file, id)
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["lectures"] })
    }
  })
};


export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onError: () => {
      toast.error("Failed to log in. Please try again.", {
        description: "Something went wrong...",
      })
    }
  });
}

export const useRegisterMutation = () => useMutation({
  mutationFn: register,
  onError: () => {
    toast.error("Failed to register. Please try again.", {
      description: "Something went wrong...",
    })
  }
});
