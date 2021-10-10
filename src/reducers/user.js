export const userAction = {
  signIn: '@user/SIGNIN',
  signOut: '@user/SIGNOUT',
};

export default function userReducer(state = null, { type }) {
  switch (type) {
    case userAction.signIn:
      return true;
    case userAction.signOut:
      return false;
    default:
      return state;
  }
}
