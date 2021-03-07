import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
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

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvYUabb_1GGZOHPLa2gOz3nqWGG5sYKIs",
  authDomain: "redstream-d1a42.firebaseapp.com",
  projectId: "redstream-d1a42",
  storageBucket: "redstream-d1a42.appspot.com",
  messagingSenderId: "194906792996",
  appId: "1:194906792996:web:7560022676a7f7161b24b1",
  measurementId: "G-3ESESXD7K5"
};

firebase.initializeApp(firebaseConfig);

//for test propose, remove if login function is fully developed
firebase.auth().signInAnonymously();

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
