import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "./editpage.scss";
var _ = require("lodash");

export default function EditPage({user, setUser}) {
  const { keycloak } = useKeycloak();
  var userCopy = _.cloneDeep(user);

  function update() {
    axios({method: 'put', url: `http://localhost:4000/api/usr/${keycloak.subject}`, data: {name: userCopy.name, bio: userCopy.bio, birthdate: userCopy.birthdate.split('T')[0]}})
    setUser(userCopy)
  }


  return (
    <div>
      <div className="histItem">
        <p>Name:</p>
        <input
          type="text"
          id="name"
          name="input"
          onChange={(e) => userCopy.name = e.target.value}
        />
        <p>Bio:</p>
        <input
          type="text"
          id="bio"
          name="input"
          onChange={(e) => userCopy.bio = e.target.value}
        />
        <p>Birth Date:</p>
        <input
          type="text"
          id="bdate"
          name="input"
          onChange={(e) => userCopy.birthdate = e.target.value}
        />
        <br />
        <Link to={"/user"} className="submit btn btn-success" onClick={update}>Submit</Link>
      </div>
    </div>
  );
}
