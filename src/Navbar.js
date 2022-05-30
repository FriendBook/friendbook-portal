import React from "react";
import { useKeycloak } from "@react-keycloak/web";

const Navbar = () => {
  const { keycloak, initialized } = useKeycloak();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        FriendBook
      </a>
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
          <a className="nav-item nav-link" href="/posts">
            Posts <span className="sr-only"></span>
          </a>
          <a className="nav-item nav-link" href="/users">
            Users
          </a>
          <a className="nav-item nav-link" href="/friends">
            Friends
          </a>
        </div>
      </div>
      {!keycloak.authenticated && (
        <button
          type="button"
          className="text-blue-800 btn btn-primary"
          onClick={() => keycloak.login()}
        >
          Login
        </button>
      )}
      {!!keycloak.authenticated && (
        <button
          type="button"
          className="text-blue-800 btn btn-primary"
          onClick={() => keycloak.logout()}
        >
          Logout ({keycloak.tokenParsed.preferred_username})
        </button>
      )}
    </nav>
  );
};

export default Navbar;
