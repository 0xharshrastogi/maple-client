import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "../action";
import { useGoogleAuth } from "../hooks";
import { auth, user } from "../reducers";

const Client_ID = process.env?.REACT_APP_GAPI_CLIENTID;
const Client_Secret = process.env?.REACT_APP_CLIENT_SECRET;

export const useInitialiseApp = () => {
  const dispatch = useDispatch();
  const { GoogleAuth, error: GAuthError } = useGoogleAuth(Client_ID, Client_Secret);
  const { data, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (GAuthError) throw GAuthError;
    if (!GoogleAuth) return;

    const isSignedIn = GoogleAuth.isSignedIn.get();

    if (!isSignedIn) {
      dispatch({ type: auth.signOut });
      dispatch({ type: user.LOADING_USER_STOP });
      return;
    }

    dispatch(setUser(GoogleAuth));
  }, [GoogleAuth, GAuthError, dispatch]);

  useEffect(() => {
    const onLoginChange = (isLogin) => {
      isLogin ? dispatch(setUser(GoogleAuth)) : dispatch(removeUser());
    };

    GoogleAuth?.isSignedIn.listen(onLoginChange);
  }, [GoogleAuth, GAuthError, dispatch]);

  return { loading, error, data };
};
