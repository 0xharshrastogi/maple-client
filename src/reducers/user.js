export const userActionType = {
  addUser: '@user/ADD',
  removeUser: '@user/REMOVE',
};

export default function userReducer(state = null, action) {
  switch (action.type) {
    case userActionType.addUser:
      return { ...action.payload };
    case userActionType.removeUser:
      return null;
  }
  return state;
}
