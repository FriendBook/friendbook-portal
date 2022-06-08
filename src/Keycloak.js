import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "http://localhost:8080/auth",
 realm: "Friendbook",
 clientId: "react-auth-local",
});

export default keycloak;
