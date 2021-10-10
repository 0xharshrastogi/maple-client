export const authActionType = {
  signIn: '@user/SIGNIN',
  signOut: '@user/SIGNOUT',
};

export default function authenticateReducer(state = null, { type }) {
  switch (type) {
    case authActionType.signIn:
      return true;
    case authActionType.signOut:
      return false;
    default:
      return state;
  }
}
