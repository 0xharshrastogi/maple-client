import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthenticatedRoute, Navbar, Spinner } from "../components";
import Dashboard from "../components/Dashboard/Dashboard";
import { useAuth, useAuthProvider } from "../hooks";
import { ClassroomDashboard, Home, Login, ManageAccount, Signup } from "../Pages";

const Client_ID = process.env?.REACT_APP_GAPI_CLIENTID;
const Client_Secret = process.env?.REACT_APP_CLIENT_SECRET;

const Routes = () => {
  const auth = useAuth();
  console.log(auth);

  if (auth.loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Spinner />
        <h3 className="text-center text-red-600 font-bold mt-4 text-lg">Loading App</h3>
      </div>
    );
  }

  if (auth.error) {
    console.error(auth.error);
    return <div>There is Error: {auth.error.message}</div>;
  }

  const login = auth.isLogin();

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        {!login && <Route path="/login" component={Login} />}

        {login && <Redirect exact from="/class/:classID" to="/class/:classID/feed" />}
        <AuthenticatedRoute path="/private" component={() => <h1>Hello</h1>} />
        <AuthenticatedRoute path="/class/:classID" component={ClassroomDashboard} />
        <AuthenticatedRoute path="/manage" component={ManageAccount} />
        <AuthenticatedRoute path="/manage2" component={Dashboard} />

        <Route path="*">404</Route>
      </Switch>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const Setup = () => {
  const AuthProvider = useAuthProvider({ API_KEY: Client_Secret, clientID: Client_ID });

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default Setup;
