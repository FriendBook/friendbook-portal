import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "http://friendbook.com/auth/",
 realm: "Friendbook",
 clientId: "react-auth",
});

export default keycloak;
