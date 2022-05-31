/* eslint-disable no-undef */
import React, { useCallback } from "react";
import { fetchUserData } from "./helper";
import { reducer } from "./reducer";

const SCOPE = "https://www.googleapis.com/auth/userinfo.email";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

const setupGoogleAuth = (config) => {
  return new Promise((resolve) => {
    gapi.load("client:auth2", async () => {
      await gapi.client.init(config);
      resolve(gapi.auth2.getAuthInstance());
    });
  });
};

const INITIAL_STATE = {
  error: null,
  user: null,
  loading: true,
};

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = AuthError.name;
  }
}

const useGoogleAuth = ({ clientID, API_KEY }) => {
  const [authenication, setAuthenication] = React.useState({
    auth: null,
    error: undefined,
  });
  const { auth, error } = authenication;

  const setupAuth = React.useCallback(async () => {
    const credentials = { scope: SCOPE, apiKey: API_KEY, clientId: clientID };
    const setAuthError = (message) =>
      setAuthenication({ auth: null, payload: new AuthError(message) });

    try {
      const GoogleAuth = await setupGoogleAuth(credentials);
      setAuthenication({ auth: GoogleAuth, error: undefined });
    } catch (err) {
      if ("message" in err) return setAuthError(err.message);
      console.error(err);
      return setAuthError("Something Went Wrong While Setting Up Auth");
    }
  }, [clientID, API_KEY]);

  React.useEffect(() => {
    setupAuth();
  }, [setupAuth]);

  return { auth, error };
};

export const useAuthProvider = ({ clientID, API_KEY }) => {
  const { auth, error } = useGoogleAuth({ clientID, API_KEY });

  const [store, dispatch] = React.useReducer(reducer, { ...INITIAL_STATE });
  const { loading, user, error: UserError } = store;

  const signout = React.useCallback(() => {
    if (error instanceof AuthError) dispatch({ type: "AUTH_ERROR", payload: error });

    if (!auth) throw new Error("Auth Instance Not Found, Cannot Perform Signout");

    console.log("Signout Called");
    auth.signOut();
  }, [auth, error]);

  const signin = React.useCallback(async () => {
    if (error instanceof AuthError) dispatch({ type: "AUTH_ERROR", payload: error });

    if (!auth) throw new Error("Auth Instance Not Found, Cannot Perform Signin");

    await auth.signIn();
  }, [auth, error]);

  const isLogin = React.useCallback(() => {
    if (error instanceof AuthError) {
      dispatch({ type: "AUTH_ERROR", payload: error });
    }

    if (!auth) throw new Error("Auth Instance Not Found, Cannot Perform Action");
    return auth.isSignedIn.get();
  }, [auth, error]);

  const setup = React.useCallback(async () => {
    if (error) return dispatch({ type: "AUTH_ERROR", payload: error });

    if (!auth) return;

    const isLogin = auth.isSignedIn.get();
    if (!isLogin) return dispatch({ type: "USER_SIGN_OUT" });

    try {
      const userData = await fetchUserData(auth);
      console.log({ userData });
      dispatch({ type: "USER_SIGN_IN", payload: userData });
    } catch (err) {
      console.log(err);
      dispatch({ type: "AUTH_ERROR", payload: err });
    }
  }, [auth, error]);

  React.useEffect(() => {
    setup();
  }, [setup]);

  React.useEffect(() => {
    if (!auth) return;

    const handleSignin = async () => {
      try {
        dispatch({ type: "FETCHING_USER_DATA" });
        const userData = await fetchUserData(auth);
        dispatch({ type: "USER_SIGN_IN", payload: userData });
      } catch (err) {
        console.log(err);
        dispatch({ type: "AUTH_ERROR", payload: err });
      }
    };

    const handleSignout = () => dispatch({ type: "USER_SIGN_OUT" });

    auth.isSignedIn.listen((login) => (login ? handleSignin() : handleSignout()));
  }, [auth]);
  console.log(user);
  const Provider = useCallback(
    ({ children }) => (
      <AuthContext.Provider value={{ signout, signin, error: UserError, isLogin, user, loading }}>
        {children}
      </AuthContext.Provider>
    ),
    [UserError, isLogin, loading, signin, signout, user]
  );

  return Provider;
};
