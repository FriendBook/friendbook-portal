import React, { useState } from "react";
import axios from "axios";

const PostCreate = ({postCounter, setPostCounter}) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    var currentDate = new Date();
    var date = currentDate.getDate() + "/" + currentDate.getMonth() + "/" + currentDate.getFullYear();
    var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    var userID = 1;

    await axios.post("http://friendbook.com/msg", {
      title: title,
      message: message,
      userid: userID,
      date: date,
      time: time
    });

    setTitle("");
    setMessage("");
    setPostCounter(postCounter+1);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
          <label>Message</label>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
