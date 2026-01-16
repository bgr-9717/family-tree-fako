const domain = "https://YOUR_DOMAIN.auth.af-south-1.amazoncognito.com";
const clientId = "YOUR_APP_CLIENT_ID";
const redirectUri = "http://localhost:3000/";

export function login() {
  window.location.href =
    `${domain}/login` +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=openid+email+profile`;
}