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
  Series,
  Upload,
  Playlist,
  EditMovie,
  ManageAdmins,
  ManageMovies,
  Search,
  ManageSeries,
  UploadSeries,
  BrowseSeries
} from './pages';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

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

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: orange,
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
    // console.log(loading, loggedIn);

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
              pathname: "/login/protected",
            }}
          />
        );
      }
    }
  };

  const UnprotectedRoute = (props) => {
    console.log(loading, loggedIn);

    if (loading === true) {
      return (
        <div>
        </div>);
    } else {
      if (loggedIn === false) {
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
              pathname: "/",
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
            <ProtectedRoute path="/movie/:id">
              <Movie />
            </ProtectedRoute>
            <ProtectedRoute path="/movie">
              <Movie />
            </ProtectedRoute>
            <ProtectedRoute path="/browse/series">
              <BrowseSeries />
            </ProtectedRoute>
            <ProtectedRoute path="/browse">
              <Browse />
            </ProtectedRoute>
            <Route path="/signup/plan/:error">
              <SignupPlan />
            </Route>
            <Route path="/signup/plan">
              <SignupPlan />
            </Route>
            <Route path="/signup/account/:plan">
              <SignupAccount />
            </Route>
            <Route path="/signup/account">
              <SignupAccount />
            </Route>
            <Route path="/signup/payment">
              <SignupPayment />
            </Route>
            <UnprotectedRoute path="/signup">
              <Redirect
                to={{
                  pathname: "/signup/plan",
                }}
              />
            </UnprotectedRoute>
            <UnprotectedRoute path="/login/:error">
              <Login />
            </UnprotectedRoute>
            <UnprotectedRoute path="/login">
              <Login />
            </UnprotectedRoute>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute path="/playlist/:id">
              <Playlist />
            </ProtectedRoute>
            <ProtectedRoute path="/playlist">
              <Playlist />
            </ProtectedRoute>
            <ProtectedRoute path="/editMovie/:id">
              <EditMovie />
            </ProtectedRoute>
            <ProtectedRoute path="/manage/admins">
              <ManageAdmins />
            </ProtectedRoute>
            <ProtectedRoute path="/manage/movies/:search">
              <ManageMovies />
            </ProtectedRoute>
            <ProtectedRoute path="/manage/movies">
              <ManageMovies />
            </ProtectedRoute>
            <ProtectedRoute path="/manage/series">
              <ManageSeries />
            </ProtectedRoute>
            <UnprotectedRoute path="/home">
              <Home />
            </UnprotectedRoute>
            <ProtectedRoute path="/play/:id">
              <Play />
            </ProtectedRoute>
            <ProtectedRoute path="/series">
              <Series />
            </ProtectedRoute>
            <ProtectedRoute path="/search/:value">
              <Search />
            </ProtectedRoute>
            <ProtectedRoute path="/upload/movie">
              <Upload />
            </ProtectedRoute>
            <ProtectedRoute path="/upload/series">
              <UploadSeries />
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
