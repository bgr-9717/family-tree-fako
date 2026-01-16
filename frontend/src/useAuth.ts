import { useEffect, useState } from "react";

const domain = "https://YOUR_DOMAIN.auth.REGION.amazoncognito.com";
const clientId = "YOUR_APP_CLIENT_ID";
const redirectUri = "http://localhost:3000/";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      const idToken = sessionStorage.getItem("idToken");
      setIsAuthenticated(Boolean(idToken));
      return;
    }

    fetch(`${domain}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        redirect_uri: redirectUri,
        code,
      }),
    })
      .then((res) => res.json())
      .then((tokens) => {
        sessionStorage.setItem("idToken", tokens.id_token);
        sessionStorage.setItem("accessToken", tokens.access_token);
        setIsAuthenticated(true);

        // clean URL
        window.history.replaceState({}, document.title, "/");
      });
  }, []);

  return { isAuthenticated };
}
