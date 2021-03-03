import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  // Link
} from "react-router-dom";
import {
  Browse,
  Movie,
  SettingProfile,
  SettingMembership,
  SettingPassword,
  SettingPayment,
  SignupPlan,
  SignupAccount,
  SignupPayment,
} from './pages';
// import styled from 'styled-components';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <div id="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/movie">
              <Movie />
            </Route>
            <Route path="/browse">
              <Browse />
            </Route>
            <Route path="/account">
            </Route>
            <Route path="/signup/plan">
              <SignupPlan />
            </Route>
            <Route path="/signup/account">
              <SignupAccount />
            </Route>
            <Route path="/signup/payment">
              <SignupPayment />
            </Route>
            <Route path="/signup">
              <Redirect
                to={{
                  pathname: "/signup/plan",
                }}
              />
            </Route>
            <Route path="/setting/profile">
              <SettingProfile />
            </Route>
            <Route path="/setting/membership">
              <SettingMembership />
            </Route>
            <Route path="/setting/payment">
              <SettingPayment />
            </Route>
            <Route path="/setting/password">
              <SettingPassword />
            </Route>
            <Route path="/setting">
              <Redirect
                to={{
                  pathname: "/setting/profile",
                }}
              />
            </Route>
            <Route path="/">
              <Redirect
                to={{
                  pathname: "/browse",
                }}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>

    </div>

  );
}


export default App;
