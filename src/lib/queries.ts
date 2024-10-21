import { useQuery } from "@tanstack/react-query";
import { fetchLectures } from "./apis/lectures-api";
import { fetchUser } from "./apis/auth-api";

export const useLecturesQuery = () => useQuery({
  queryFn: fetchLectures,
  queryKey: ["lectures"],
});

export const useUserQuery = (accessToken: string) => useQuery({
  queryKey: ["user", accessToken],
  queryFn: () => fetchUser(accessToken),
  enabled: false
})
