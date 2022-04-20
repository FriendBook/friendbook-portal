import React, { useState, useEffect } from "react";
import axios from "axios";

const Friends = () => {
  const [friends, setFriends] = useState({});
  const [tempUser, setTempUser] = useState(1);

  const fetchFriends = async () => {
    const res = await axios.get("http://localhost:8082/friends/" + tempUser);

    console.log(res.data)
    setFriends(res.data);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const renderFriends = Object.values(friends).map((friend) => {
    return (
        <div
          className="card"
          style={{ width: "30%", marginBottom: "20px" }}
          key={friend.name}
        >
          <div className="card-body">
            <h3>{friend.name}</h3>
            <label>{friend.bio}</label>
          </div>
        </div>
      );
  }
  );


  return (
      <div>
          <h3>Friends of user {tempUser}</h3>
    <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderFriends}
    </div>
    </div>
  );
};

export default Friends;
