import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import UserSignup from './Signup/Singup';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/signup">
          <UserSignup />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
