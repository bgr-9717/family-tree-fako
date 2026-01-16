
const domain = "https://YOUR_DOMAIN.auth.af-south-1.amazoncognito.com";
const clientId = "YOUR_APP_CLIENT_ID";
const logoutUri = "http://localhost:3000/";

export function logout() {
  sessionStorage.clear();

  window.location.href =
    `${domain}/logout` +
    `?client_id=${clientId}` +
    `&logout_uri=${encodeURIComponent(logoutUri)}`;
}
