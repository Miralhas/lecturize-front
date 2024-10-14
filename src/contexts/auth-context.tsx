import { fetchUser, login, LoginResponse, register, User } from "@/lib/apis/auth-api";
import { LoginFormValues } from "@/lib/schemas/login-schema";
import { RegisterFormValues } from "@/lib/schemas/register-schema";
import { AuthActions, authReducer, AuthState, initialAuthReducerValues } from "@/reducers/auth-reducer";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { createContext } from "./create-context";

type LoginMutation = UseMutationResult<LoginResponse, Error, LoginFormValues, unknown>;
type RegisterMutation = UseMutationResult<User, Error, RegisterFormValues, unknown>

type AuthContextState = {
  dispatch: Dispatch<AuthActions>;
  state: AuthState;
  loginUser: (data: LoginFormValues) => Promise<User>;
  loginMutation: LoginMutation;
  registerMutation: RegisterMutation;
  registerUser: (data: RegisterFormValues) => Promise<User>;
  logout: () => Promise<void>;
}

const { useContext, ContextProvider } = createContext<AuthContextState>();

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthReducerValues);
  
  const loginMutation = useMutation({
    mutationFn: login,
  });

  const registerMutation = useMutation({
    mutationFn: register,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    
    const verifyAccessToken = async (token: string) => {
      try {
        const user = await fetchUser(token);
        dispatch({type: "login", payload: {user}});
      } catch (error) {
        console.log(error);
        dispatch({type: "logout"});
      }
    }

    if (accessToken) verifyAccessToken(accessToken);
  }, [])

  const loginUser = async (data: LoginFormValues): Promise<User> => {
    const response = await loginMutation.mutateAsync(data);
    const user = await fetchUser(response.accessToken);
    dispatch({type: "login", payload: {user}});
    localStorage.setItem("accessToken", response.accessToken);
    return user;
  };

  const registerUser = async (data: RegisterFormValues): Promise<User> => {
    const user = await registerMutation.mutateAsync(data);
    await loginUser({email: user.email, password: data.password});
    return user;
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    dispatch({type: "logout"});
  }

  return (
    <ContextProvider value={{ dispatch, state, loginMutation, loginUser, registerMutation, registerUser, logout }}>
      {children}
    </ContextProvider>
  )
}

export const useAuthContext = useContext;
