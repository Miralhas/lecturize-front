import { fetchUser } from "@/lib/apis/auth-api";
import { AuthActions, authReducer, AuthState, initialAuthReducerValues } from "@/reducers/auth-reducer";
import { User } from "@/types/auth";
import { Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { createContext } from "./create-context";

type AuthContextState = {
  dispatch: Dispatch<AuthActions>;
  state: AuthState;
  loginUser: (accessToken: string) => Promise<User>;
  logout: () => Promise<void>;
}

const { useContext, ContextProvider } = createContext<AuthContextState>();

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthReducerValues);

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
  }, []);

  const loginUser = async (accessToken: string): Promise<User> => {
    const user = await fetchUser(accessToken);
    dispatch({type: "login", payload: {user}});
    localStorage.setItem("accessToken", accessToken);
    return user;
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    dispatch({type: "logout"});
  }

  return (
    <ContextProvider value={{ dispatch, state, loginUser, logout }}>
      {children}
    </ContextProvider>
  )
}

export const useAuthContext = useContext;
