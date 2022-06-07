import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { keycloak } = useKeycloak();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to={"/"} className="navbar-brand">
        FriendBook
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to={"/posts"} className="nav-item nav-link">
            Posts
          </Link>
          {keycloak.hasRealmRole("admin") ? (
            <Link to={"/users"} className="nav-item nav-link">
              Users
            </Link>
          ) : (
            <Link to={"/user"} className="nav-item nav-link">
              Profile
            </Link>
          )}
          <Link to={"/friends"} className="nav-item nav-link">
            Friends
          </Link>
        </div>
      </div>
      {!keycloak.authenticated ? (
        <button
          type="button"
          className="text-blue-800 btn btn-primary"
          onClick={() => keycloak.login()}
        >
          Login
        </button>
      ) : (
        <div>
          <button
            style={{ marginRight: 10 }}
            type="button"
            className="text-blue-800 btn btn-primary"
            onClick={() => keycloak.accountManagement()}
          >
            Edit email
          </button>
          <button
            type="button"
            className="text-blue-800 btn btn-primary"
            onClick={() => keycloak.logout()}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
