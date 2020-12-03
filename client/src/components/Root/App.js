import React, { useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import ProtectedRoute from "../Auth/ProtectedRoute";

import Navbar from "../Navbar/Navbar";
import ProjectList from "../Projects/ProjectList";
import ProjectDetails from "../Projects/ProjectDetails";

import AuthService from "../../services/auth-service";
import AuthContext from "../../context/auth-context";// Importing my authentication context

function App() {
  const initialValue = JSON.parse(localStorage.getItem("user")) || null // checking if user information is already inside local storage
  const [loggedInUser, setLoggedInUser] = useState(initialValue); // setting loggedIn either as extracted user info or null

  const service = new AuthService();

  // Function to help fetch a logged in user
  const fetchUser = () => {
    if (loggedInUser === null) {
      service
        .isAuthenticated()
        .then((response) => {
          setLoggedInUser(response);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    }
  };

  // Function to help get the loggedIn user
  const getLoggedInUser = (userObject) => {
    setLoggedInUser(userObject);
  };

  // Run to check if user is authenticated
  fetchUser();

  return loggedInUser ? (
    <section className="App">
      <AuthContext.Provider value={{loggedInUser, setLoggedInUser}}>
        <Navbar />
        <Switch>
          <ProtectedRoute
            user={loggedInUser}
            path="/projects/:id"
            component={ProjectDetails}
          />
          <ProtectedRoute
            user={loggedInUser}
            path="/projects"
            component={ProjectList}
          />
        </Switch>
      </AuthContext.Provider>
    </section>
  ) : (
    <section className="App">
      <AuthContext.Provider value={loggedInUser}>
      <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />

      <Switch>
        <Route
          exact
          path="/signup"
          render={() => <Signup getUser={getLoggedInUser} />}
        />
        <Route
          exact
          path="/"
          render={() => <Login getUser={getLoggedInUser} />}
        />
        <ProtectedRoute
          user={loggedInUser}
          path="/projects/:id"
          component={ProjectDetails}
        />
        <ProtectedRoute
          user={loggedInUser}
          path="/projects"
          component={ProjectList}
        />
      </Switch>
      </AuthContext.Provider>
    </section>
  );
}

export default App;
