import React from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import "./userpage.scss";

export default function UserPage({ user, isCompromised }) {
    const { keycloak } = useKeycloak();

  const userCSV = [
    ["Username", "Bio", "Date of Birth", "Given Name", "Family Name", "Email"],
    [user.name, user.bio, user.birthdate, keycloak.tokenParsed.given_name, keycloak.tokenParsed.family_name, keycloak.tokenParsed.email],
  ];
  function deleteUser() {
    if (window.confirm("You are about to delete your account. Are you sure you want to proceed?")) {
        axios.delete(`http://localhost:4000/api/usr/${keycloak.subject}`);
        keycloak.logout();
    }
  }

  return (
    <div>
    {!isCompromised ? <div
      className="card"
      style={{ width: "30%", marginBottom: "20px" }}
      key={user.name}
    >
      <div className="card-body">
        <label className="id">{user.id}</label>
        <h3>{!!user.name? user.name : "Service Temporarily Unavailable"}</h3>
        <p>Bio: {user.bio}</p>
        <label>Birth Date: {user.birthdate}</label>
        <Link className="edit btn btn-success" to={"/edit"}>
          Edit Personal Data
        </Link>
      </div>
      <CSVLink className="btn btn-info" data={userCSV}>
        Download Personal Data
      </CSVLink>
      <button onClick={deleteUser} className="delete btn btn-danger">
        Delete Account
      </button>
    </div> : "Service Temporarily Down"}
    </div>
  );
}
