import React from "react";

const Users = ({userList, isCompromised}) => {
  

  function render() {
    if(!isCompromised && !!userList.data){
      return Object.values(userList.data.rows).map((user) => {
        return (
          <div
            className="card"
            style={{ width: "30%", marginBottom: "20px" }}
            key={user.id}
          >
            <div className="card-body">
              <h3>{user.name}</h3>
              <label>{user.bio}</label>
            </div>
          </div>
        );
      });
    }
  }
  

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {!isCompromised ? render() : "Service Temporarily Unavailable"}
    </div>
  );
};

export default Users;
