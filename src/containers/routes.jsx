import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { removeUser, setUser } from "../action/user";
import { Navbar, PrivateRoute, Spinner } from "../components";
import { useGoogleAuth } from "../hooks";
import { Home, Login, ManageAccount, Signup } from "../Pages";
import { auth, user } from "../reducers";

const Client_ID = process.env?.REACT_APP_GAPI_CLIENTID;
const Client_Secret = process.env?.REACT_APP_CLIENT_SECRET;

const useInitialiseApp = () => {
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

const Routes = () => {
  const isSignIn = useSelector((state) => state?.isSignedIn);

  const { loading, error } = useInitialiseApp();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Spinner />
        <h3 className="text-center text-red-600 font-bold mt-4 text-lg">Loading App</h3>
      </div>
    );
  }

  if (error) {
    console.error(error);
    return <div>There is Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        {!isSignIn && <Route exact path="/signup" component={Signup} />}
        {!isSignIn && <Route path="/login" component={Login} />}

        <PrivateRoute path="/manage" component={ManageAccount} />

        <Route path="*">404</Route>
      </Switch>
    </>
  );
};

export default Routes;
