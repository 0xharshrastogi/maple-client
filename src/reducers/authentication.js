export const authActionType = {
  signIn: '@auth/SIGNIN',
  signOut: '@auth/SIGNOUT',
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
