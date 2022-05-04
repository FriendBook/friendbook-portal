import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState({});

  const fetchUsers = async () => {
    const res = await axios.get("http://friendbook.com/api/usr");

    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderUsers = Object.values(users).map((user) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={user.name}
      >
        <div className="card-body">
          <h3>{user.name}</h3>
          <label>{user.bio}</label>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderUsers}
    </div>
  );
};

export default Users;
