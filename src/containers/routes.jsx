import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { userActionType } from '../reducers/user';
import Home from './Home/Home';
import UserSignup from './Signup/Singup';

const Routes = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isSignIn = useSelector((state) => state?.isSignedIn);
  const dispatch = useDispatch();

  console.log(isSignIn);

  const { GoogleAuth, error: GAuthError } = useGoogleAuth(
    process.env?.REACT_APP_GAPI_CLIENTID,
    process.env?.REACT_APP_CLIENT_SECRET
  );

  useEffect(() => {
    try {
      if (GAuthError) throw GAuthError;
      if (!GoogleAuth) return;

      if (GoogleAuth.isSignedIn.get()) dispatch({ type: userActionType.signIn });
      else dispatch({ type: userActionType.signOut });

      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setError(e);
    }
  }, [GoogleAuth, GAuthError]);

  if (loading && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading App</div>
    );
  }

  if (error) {
    console.error(error);
    return <div>There is Error</div>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        {!isSignIn && (
          <Route exact path="/signup">
            <UserSignup />
          </Route>
        )}

        <Route path="*">404</Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
