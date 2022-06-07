import React from "react";

const Friends = ({ friends }) => {
  const renderFriends = Object.values(friends).map((friend) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={friend}
      >
        <div className="card-body">
          <h5>{friend}</h5>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderFriends == 0 ? "This user has no friends currently" : renderFriends}
      </div>
    </div>
  );
};

export default Friends;
