import type { ReactNode, ReactElement } from "react";
import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { AuthReducer } from "./AuthReducer";
import type { AuthState } from "~/classes/auth/AuthState";

export interface AuthProviderProps {
  children: ReactNode;
  initialAuthStatus?: AuthState["status"];
}

const initialState: AuthState = {
  status: "idle",
};

export function AuthProvider({ children, initialAuthStatus = "idle" }: AuthProviderProps): ReactElement {
  const [state, dispatch] = useReducer(AuthReducer, {
    ...initialState,
    status: initialAuthStatus,
  });

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
