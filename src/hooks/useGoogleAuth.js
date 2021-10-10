/* eslint-disable no-undef */
import { useEffect, useState } from 'react';

export function useGoogleAuth(clientId, apiKey) {
  const [GoogleAuth, setGoogleAuth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    function init() {
      gapi.load('client:auth2', async () => {
        try {
          await gapi.client.init({
            scope: 'https://www.googleapis.com/auth/userinfo.email',
            apiKey,
            clientId,
          });

          setGoogleAuth(gapi.auth2.getAuthInstance());
        } catch (e) {
          setError(e);
        }
      });
    }

    init();
  }, []);

  return { GoogleAuth, error };
}
