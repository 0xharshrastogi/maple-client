export const reducer = (state, action) => {
  switch (action.type) {
    case "AUTH_ERROR":
      return Object.assign({}, state, { error: action.payload, loading: false });
    case "USER_SIGN_OUT":
      return Object.assign({}, state, { user: null, loading: false });
    case "USER_SIGN_IN":
      return Object.assign({}, state, { user: action.payload, loading: false });
    case "FETCHING_USER_DATA":
      return Object.assign({}, state, { loading: true });
  }

  return state;
};
