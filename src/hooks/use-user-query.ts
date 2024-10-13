import { User, fetchUser as fetchUserApi } from "@/apis/auth-api";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

const fetchUser = async (context: QueryFunctionContext) : Promise<User> => {
  const { queryKey } = context;
  const [_, accessToken] = queryKey;

  return await fetchUserApi(accessToken as string);
}

export const useUserQuery = (accessToken: string) => {
  return useQuery({
    queryFn: fetchUser,
    queryKey: ['user', accessToken],
    enabled: false,
  });
}

