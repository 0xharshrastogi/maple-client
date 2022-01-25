import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthProvider } from "../hooks";

const Client_ID = process.env?.REACT_APP_GAPI_CLIENTID;
const Client_Secret = process.env?.REACT_APP_CLIENT_SECRET;

const Routes = () => {
  const auth = useAuthProvider({ API_KEY: Client_Secret, clientID: Client_ID });
  console.log(auth);

  return <h1>Hello</h1>;
};

// const Routes = () => {
//   const auth = useSelector((state) => state.isSignedIn);
//   const { loading, error } = useInitialiseApp();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <Spinner />
//         <h3 className="text-center text-red-600 font-bold mt-4 text-lg">Loading App</h3>
//       </div>
//     );
//   }

//   if (error) {
//     console.error(error);
//     return <div>There is Error: {error.message}</div>;
//   }

//   return (
//     <>
//       <AuthContext.Provider value={auth}>
//         <Navbar />
//         <Switch>
//           <Route exact path="/" component={Home} />
//           {!auth && <Route exact path="/signup" component={Signup} />}
//           {!auth && <Route path="/login" component={Login} />}

//           <Private path="/private" component={() => <h1>Hello</h1>} />

//           <Private auth={auth} path="/manage" component={ManageAccount} />

//           <Route path="*">404</Route>
//         </Switch>
//       </AuthContext.Provider>
//     </>
//   );
// };

const Private = ({ component, auth, ...rest }) => {
  console.log({ auth });
  const Render = (props) => {
    return auth ? (
      component
    ) : (
      // eslint-disable-next-line react/prop-types
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  };

  return <Route {...rest} render={Render} />;
};

Private.propTypes = {
  component: PropTypes.func,
  auth: PropTypes.bool,
};

export default Routes;
