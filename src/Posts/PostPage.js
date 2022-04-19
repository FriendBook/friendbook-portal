import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const PostPage = ({ postCounter, setPostCounter }) => {
  return (
    <div>
      <h1>Create Post</h1>
      <PostCreate postCounter={postCounter} setPostCounter={setPostCounter} />
      <hr />
      <h1>Posts</h1>
      <PostList postCounter={postCounter} />
    </div>
  );
};

export default PostPage;
