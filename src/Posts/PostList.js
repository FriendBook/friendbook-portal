import React, { useState, useEffect } from "react";
import axios from "axios";
import "./posts.scss";
import { useKeycloak } from "@react-keycloak/web";

const PostList = ({ postCounter }) => {
  const [posts, setPosts] = useState({});
  const { keycloak } = useKeycloak();

  function deletePost(post) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios.delete(`http://friendbook.com/api/msg/${post._id}`,
      {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      });
      window.location.reload(false);
    }
  }

  const fetchPosts = async () => {
    //friendbook.com
    //localhost:8081
    const res = await axios.get("http://friendbook.com/api/msg");

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [postCounter]);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.title}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <label style={{ fontSize: "20px" }}>{post.message}</label>
          <label style={{ fontSize: "12px", bottom: "0", display: "block" }}>
            Posted on {post.date} at {post.time} by {post.username}
          </label>
          <label>
            {keycloak.hasRealmRole("admin") ? (
              <button className="btn btn-danger" onClick={() => deletePost(post)}>Delete</button>
            ) : (
              ""
            )}
          </label>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
