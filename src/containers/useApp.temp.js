import { useAuthProvider } from "../hooks/useAuth";

const Client_ID = process.env?.REACT_APP_GAPI_CLIENTID;
const Client_Secret = process.env?.REACT_APP_CLIENT_SECRET;

export const useApp = () => {
  const auth = useAuthProvider({ clientID: Client_ID, API_KEY: Client_Secret });
  return auth;
};
