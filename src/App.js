import { ReactKeycloakProvider } from "@react-keycloak/web";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Friends from "./Friends/Friends";
import Navbar from "./Navbar";
import PostPage from "./Posts/PostPage";
import Users from "./Users/Users";
import Welcome from "./Welcome/Welcome";
import keycloak from "./Keycloak";
import PrivateRoute from "./helpers/PrivateRoute";

const App = () => {
  const [postCounter, setPostCounter] = useState(0);

  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/posts"
              element={
                <PrivateRoute>
                  <PostPage
                    postCounter={postCounter}
                    setPostCounter={setPostCounter}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="/friends"
              element={
                <PrivateRoute>
                  <Friends />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ReactKeycloakProvider>
  );
};

export default App;
