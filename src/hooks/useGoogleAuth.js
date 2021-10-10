/* eslint-disable no-undef */
import { useEffect, useState } from 'react';

export function useGoogleAuth(clientId, apiKey) {
  const [GoogleAuth, setGoogleAuth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    function init() {
      gapi.load('client:auth2', async () => {
        await gapi.client.init({
          scope: 'https://www.googleapis.com/auth/userinfo.email',
          apiKey,
          clientId,
        });

        setGoogleAuth(gapi.auth2.getAuthInstance());
      });
    }

    try {
      init();
    } catch (e) {
      console.log(error);
      setError(e);
    }
  }, [clientId, apiKey]);

  return { GoogleAuth, error };
}
