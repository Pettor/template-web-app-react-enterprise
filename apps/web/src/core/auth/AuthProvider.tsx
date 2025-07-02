import type { ReactNode, ReactElement } from "react";
import { useReducer } from "react";
import { usePostRefreshTokenMutate } from "@package/api";
import { useRunOnce } from "@package/react";
import { AuthContext } from "./AuthContext";
import { AuthReducer } from "./AuthReducer";
import type { AuthState } from "~/classes/auth/AuthState";

export interface AuthProviderProps {
  children: ReactNode;
}

const initialState: AuthState = {
  status: "idle",
};

export function AuthProvider({ children }: AuthProviderProps): ReactElement {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const { mutateAsync: refreshToken } = usePostRefreshTokenMutate();

  useRunOnce({
    func: async () => {
      try {
        // Run once on app load to check if the user is logged in
        await refreshToken();
        dispatch({ type: "auth/login" });
      } catch {
        dispatch({ type: "auth/logout" });
      }
    },
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
