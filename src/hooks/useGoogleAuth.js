/* eslint-disable no-undef */
import { useEffect, useState } from "react";

const SCOPE = "https://www.googleapis.com/auth/userinfo.email";

// Function Setup GoogleAuth Instance
function setupGoogleAuth(config) {
  return new Promise((resolve) => {
    gapi.load("client:auth2", async () => {
      await gapi.client.init(config);
      resolve(gapi.auth2.getAuthInstance());
    });
  });
}

export default function useGoogleAuth(clientId, apiKey) {
  const [GoogleAuth, setGoogleAuth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const DEFAULT_CREDENTIALS = { scope: SCOPE, apiKey, clientId };

    (async () => {
      try {
        const GoogleAuth = await setupGoogleAuth(DEFAULT_CREDENTIALS);
        setGoogleAuth(GoogleAuth);
      } catch (e) {
        console.err(e);
        setError(e);
      }
    })();
  }, [clientId, apiKey]);

  return { GoogleAuth, error };
}
