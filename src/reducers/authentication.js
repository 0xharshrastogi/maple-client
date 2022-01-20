const action = {
  signIn: "@auth/SIGNIN",
  signOut: "@auth/SIGNOUT",
};

function reducer(state = null, actionDispatch) {
  switch (actionDispatch.type) {
    case action.signIn: {
      return true;
    }
    case action.signOut: {
      return false;
    }
  }

  return state;
}

export default { reducer, type: action };
