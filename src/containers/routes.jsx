import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Spinner from '../components/Spinner/Spinner';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { authActionType } from '../reducers/authentication';
import { userActionType } from '../reducers/user';
import extractCurrentUserData from '../utils/extractCurrentUserData';
import Home from './Home/Home';
import UserLogin from './Login/Login';
import ManageAccount from './ManageAccount/Dashboard';
import UserSignup from './Signup/Singup';

console.log(process.env);

const Routes = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isSignIn = useSelector((state) => state?.isSignedIn);
  const dispatch = useDispatch();

  const { GoogleAuth, error: GAuthError } = useGoogleAuth(
    process.env?.REACT_APP_GAPI_CLIENTID,
    process.env?.REACT_APP_CLIENT_SECRET
  );

  useEffect(() => {
    const handleCurrentUser = (GoogleAuth) => {
      const currentUser = GoogleAuth.currentUser.get();
      const userData = extractCurrentUserData(currentUser.getBasicProfile());

      dispatch({ type: authActionType.signIn });
      dispatch({ type: userActionType.addUser, payload: userData });
    };

    try {
      if (GAuthError) throw GAuthError;
      if (!GoogleAuth) return;

      if (GoogleAuth.isSignedIn.get()) handleCurrentUser(GoogleAuth);
      else dispatch({ type: authActionType.signOut });

      GoogleAuth.isSignedIn.listen((isLogin) => {
        if (!isLogin) {
          dispatch({ type: authActionType.signOut });
          dispatch({ type: userActionType.removeUser });
          return;
        } else handleCurrentUser(GoogleAuth);
      });

      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setError(e);
    }
  }, [GoogleAuth, GAuthError, dispatch]);

  if (loading && !error) {
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

        {!isSignIn && (
          <Route exact path="/signup">
            <UserSignup />
          </Route>
        )}

        {!isSignIn && (
          <Route path="/login">
            <UserLogin />
          </Route>
        )}

        {isSignIn && <Route path="/manage" component={ManageAccount} />}

        <Route path="*">404</Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
