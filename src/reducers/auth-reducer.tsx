import { User } from "@/apis/auth-api";

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

type LoginAction = {
  type: "login";
  payload: { user: User }
};

type LogoutAction = {
  type: "logout"
};

export type AuthActions = LoginAction | LogoutAction;

export const initialAuthReducerValues: AuthState = {
  isAuthenticated: Boolean(localStorage.getItem("accessToken")),
  user: null,
};

export const authReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case "login": {
      const { user } = action.payload;
      return {...state, user, isAuthenticated: true};
    }

    case "logout": {
      return {isAuthenticated: false, user: null};
    }
  }
};
