export const userActionType = {
  signIn: '@user/SIGNIN',
  signOut: '@user/SIGNOUT',
};

export default function authenticateReducer(state = null, { type }) {
  switch (type) {
    case userActionType.signIn:
      return true;
    case userActionType.signOut:
      return false;
    default:
      return state;
  }
}
