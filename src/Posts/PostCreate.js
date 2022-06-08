import React, { useState } from "react";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

const PostCreate = ({ postCounter, setPostCounter, user }) => {
  const { keycloak } = useKeycloak();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  

  const onSubmit = async (event) => {
    event.preventDefault();
    var currentDate = new Date();
    var date =
      currentDate.getDate() +
      "/" +
      currentDate.getMonth() +
      "/" +
      currentDate.getFullYear();
    var time =
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();

    await axios.post(`http://friendbook.com/api/msg/${keycloak.subject}`, {
      name: user.name,
      date: date,
      time: time,
      title: title,
      message: message,
    },
    {
      headers: { Authorization: `Bearer ${keycloak.token}` },
    });

    setTitle("");
    setMessage("");
    setPostCounter(postCounter + 1);
    
    window.location.reload(false);
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
