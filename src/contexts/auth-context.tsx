import { fetchUser, login, LoginResponse, register, User } from "@/apis/auth-api";
import { AuthActions, authReducer, AuthState, initialAuthReducerValues } from "@/reducers/auth-reducer";
import { LoginFormValues } from "@/utils/schemas/login-schema";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Dispatch, PropsWithChildren, useReducer } from "react";
import { createContext } from "./create-context";
import { RegisterFormValues } from "@/utils/schemas/register-schema";

type LoginMutation = UseMutationResult<LoginResponse, Error, LoginFormValues, unknown>;
type RegisterMutation = UseMutationResult<User, Error, RegisterFormValues, unknown>

type AuthContextState = {
  dispatch: Dispatch<AuthActions>;
  state: AuthState;
  loginUser: (data: LoginFormValues) => Promise<User>;
  loginMutation: LoginMutation;
  registerMutation: RegisterMutation;
  registerUser: (data: RegisterFormValues) => Promise<User>;
}

const { useContext, ContextProvider } = createContext<AuthContextState>();

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthReducerValues);
  
  const loginMutation = useMutation({
    mutationFn: login,
  });

  const registerMutation = useMutation({
    mutationFn: register,
  })

  const loginUser = async (data: LoginFormValues): Promise<User> => {
    const response = await loginMutation.mutateAsync(data);
    const user = await fetchUser(response.accessToken);
    dispatch({type: "login", payload: {user}});
    return user;
  };

  const registerUser = async (data: RegisterFormValues): Promise<User> => {
    const user = await registerMutation.mutateAsync(data);
    dispatch({type: "login", payload: {user}})
    return user;
  } 

  return (
    <ContextProvider value={{ dispatch, state, loginMutation, loginUser, registerMutation, registerUser }}>
      {children}
    </ContextProvider>
  )
}

export const useAuthContext = useContext;
