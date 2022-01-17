const action = {
  signIn: "@auth/SIGNIN",
  signOut: "@auth/SIGNOUT",
};

function reducer(state = null, payload) {
  switch (payload.type) {
    case action.signIn:
      return true;
    case action.signOut:
      return false;
    default:
      return state;
  }
}

export default { reducer, type: action };
