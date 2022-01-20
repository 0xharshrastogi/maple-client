import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { setUser } from "../action/user";
import { getUser, postUser } from "../api/createUser";
import { Navbar, PrivateRoute, Spinner } from "../components";
import { useGoogleAuth } from "../hooks";
import { Home, Login, ManageAccount, Signup } from "../Pages";
import { auth, user } from "../reducers";
import { parseUser } from "../utils";

const Client_ID = process.env?.REACT_APP_GAPI_CLIENTID;
const Client_Secret = process.env?.REACT_APP_CLIENT_SECRET;

const handleCurrentUser = async (GoogleAuth) => {
  const currentUser = GoogleAuth.currentUser.get();
  const userId = currentUser.getBasicProfile().getId();

  let [userData, err] = await getUser(userId);

  if (!err) return userData;

  if (err.name === "NotFound") {
    const data = parseUser(currentUser.getBasicProfile());
    const [resData, err] = await postUser(data);

    if (!err) return resData;

    console.error(err);
  }
};

const useInitialiseApp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { GoogleAuth, error: GAuthError } = useGoogleAuth(Client_ID, Client_Secret);

  useEffect(() => {
    try {
      if (GAuthError) throw GAuthError;
      if (!GoogleAuth) return;

      dispatch(
        setUser(GoogleAuth, (err) => {
          console.error(err);
        })
      );

      if (GoogleAuth.isSignedIn.get()) {
        (async () => {
          const userData = await handleCurrentUser(GoogleAuth);
          dispatch({ type: auth.signIn });
          dispatch({ type: user.addUser, payload: userData });
        })();
      } else dispatch({ type: auth.signOut });
    } catch (e) {
      console.error(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [GoogleAuth, GAuthError, dispatch]);

  useEffect(() => {
    GoogleAuth?.isSignedIn.listen((isLogin) => {
      if (!isLogin) {
        dispatch({ type: auth.signOut });
        dispatch({ type: user.removeUser });
        return;
      } else {
        (async () => {
          const userData = await handleCurrentUser(GoogleAuth);
          dispatch({ type: auth.signIn });
          dispatch({ type: user.addUser, payload: userData });
        })();
      }
    });
  }, [GoogleAuth, GAuthError, dispatch]);

  return { error, loading };
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
    return <div>There is Error</div>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <PrivateRoute path="/he">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab repellat eius quas
            saepe ratione sint veritatis perferendis cupiditate odit, quae, rem quos
            ducimus. Incidunt a nisi optio voluptatem illo libero?
          </p>
        </PrivateRoute>

        {!isSignIn && (
          <Route exact path="/signup">
            <Signup />
          </Route>
        )}

        {!isSignIn && (
          <Route path="/login">
            <Login />
          </Route>
        )}

        <PrivateRoute path="/manage" component={ManageAccount} />
        {/* <PrivateRoute path="/class/:classId" component={ClassroomDashboard} /> */}

        <Route path="*">404</Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
