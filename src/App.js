import React, { useState, useEffect } from "react";
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
  Login,
  Home,
  Profile,
  Play,
  Series
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
// firebase.auth().signInAnonymously();

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {

  const [loggedIn, setLoggedIn] = useState();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
  });

  const ProtectedRoute = (props) => {
    console.log(loading, loggedIn);

    if (loading === true) {
      return (
        <div>
        </div>);
    } else {
      if (loggedIn === true) {
        return (
          <Route
            path={props.path}>
            {props.children}
          </Route>
        );
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        );
      }
    }
  };

  const SlashRoute = (props) => {
    console.log(loading, loggedIn);

    if (loading === true) {
      return (
        <div>
        </div>);
    } else {
      if (loggedIn === true) {
        return (
          <Redirect
            to={{
              pathname: "/browse",
            }}
          />
        );
      } else {
        return (
          <Redirect
            to={{
              pathname: "/home",
            }}
          />
        );
      }
    }
  };

  return (
    <div id="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/movie">
              <Movie />
            </ProtectedRoute>
            <ProtectedRoute path="/browse">
              <Browse />
            </ProtectedRoute>
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
            <Route path="/login">
              <Login />
            </Route>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
            <Route path="/home">
              <Home />
            </Route>
            <ProtectedRoute path="/play">
              <Play />
            </ProtectedRoute>
            <ProtectedRoute path="/series">
              <Series />
            </ProtectedRoute>
            <ProtectedRoute path="/setting/profile">
              <SettingProfile />
            </ProtectedRoute>
            <ProtectedRoute path="/setting/membership">
              <SettingMembership />
            </ProtectedRoute>
            <ProtectedRoute path="/setting/payment">
              <SettingPayment />
            </ProtectedRoute>
            <ProtectedRoute path="/setting/password">
              <SettingPassword />
            </ProtectedRoute>
            <ProtectedRoute path="/setting">
              <Redirect
                to={{
                  pathname: "/setting/profile",
                }}
              />
            </ProtectedRoute>
            <SlashRoute path="/">
              {/* <Redirect
                to={{
                  pathname: "/home",
                }}
              /> */}
            </SlashRoute>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>

    </div>

  );
}


export default App;
