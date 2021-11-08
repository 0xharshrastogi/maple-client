export const userActionType = {
  addUser: '@user/ADD',
  removeUser: '@user/REMOVE',
  addUserRole: '@user/ADD_ROLE',
};

export default function userReducer(state = null, action) {
  switch (action.type) {
    case userActionType.addUser:
      return { ...action.payload };
    case userActionType.addUserRole:
      return { ...state, ...action.payload };
    case userActionType.removeUser:
      return null;
  }
  return state;
}
