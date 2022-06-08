import { ReactKeycloakProvider } from "@react-keycloak/web";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Friends from "./Friends/Friends";
import Navbar from "./Navbar";
import PostPage from "./Posts/PostPage";
import Users from "./Users/Users";
import Welcome from "./Welcome/Welcome";
import keycloak from "./Keycloak";
import PrivateRoute from "./helpers/PrivateRoute";
import UserPage from "./UserPage/UserPage";
import axios from "axios";
import EditPage from "./EditPage/EditPage";

const App = () => {
  const [postCounter, setPostCounter] = useState(0);
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState({});
  const [userList, setUserList] = useState([]);
  const [isCompromised, setIsCompromised] = useState(false);

  useEffect(() => {
    const fetchUsers = async (isCompromised) => {
      //friendbook.com
      //localhost:4000
      if (isCompromised) {
        const frndsres = await axios.get(
          `http://friendbook.com/api/frnds/${keycloak.subject}`,
          {
            headers: { Authorization: `Bearer ${keycloak.token}` },
          }
        );
        setFriends(frndsres.data);
      } else {
        const frndsres = await axios.get(
          `http://friendbook.com/api/frnds/${keycloak.subject}`,
          {
            headers: { Authorization: `Bearer ${keycloak.token}` },
          }
        );
        setFriends(frndsres.data);
        const userRes = await axios.get(
          `http://localhost:4000/api/usr/${keycloak.subject}`,
          {
            headers: { Authorization: `Bearer ${keycloak.token}` },
          }
        );
        setUser(userRes.data.row[0]);
        if (keycloak.hasRealmRole("admin")) {
          const userListRes = await axios.get("http://localhost:4000/api/usr", {
            headers: { Authorization: `Bearer ${keycloak.token}` },
          });
          setUserList(userListRes);
        }
      }
    };
    keycloak.onAuthSuccess = async function () {
      try {
        await axios.get(
          `http://localhost:4000/api/usr/self/${keycloak.subject}`,
          {
            headers: { Authorization: `Bearer ${keycloak.token}` },
          }
        );
        setIsCompromised(false);
      } catch (error) {
        console.log("Users Service compromised");
        setIsCompromised(true);
      } finally {
        if (keycloak.authenticated) {
          fetchUsers(isCompromised);
        }
      }
    };
  });

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
                    user={user}
                  />
                </PrivateRoute>
              }
            />
            {keycloak.hasRealmRole("admin") ? (
              <Route
                path="/users"
                element={
                  <PrivateRoute>
                    <Users userList={userList} isCompromised={isCompromised} />
                  </PrivateRoute>
                }
              />
            ) : (
              <Route
                path="/user"
                element={
                  <PrivateRoute>
                    <UserPage user={user} isCompromised={isCompromised} />
                  </PrivateRoute>
                }
              />
            )}
            <Route
              path="/friends"
              element={
                <PrivateRoute>
                  <Friends friends={friends} />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit"
              element={
                <PrivateRoute>
                  <EditPage user={user} setUser={setUser} />
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
