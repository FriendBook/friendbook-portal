import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Friends from "./Friends/Friends";
import Navbar from "./Navbar";
import PostPage from "./Posts/PostPage";
import Users from "./Users/Users";

const App = () => {
  const [postCounter, setPostCounter] = useState(0);

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path='/posts' element={
            <PostPage postCounter={postCounter} setPostCounter={setPostCounter}/>
          } />
          <Route path="/users" element={
            <Users />
          } />
          <Route path="/friends" element={
            <Friends />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
