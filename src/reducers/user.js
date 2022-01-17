export const userActionType = {
  addUser: "@user/ADD",
  removeUser: "@user/REMOVE",
  addUserRole: "@user/ADD_ROLE",
  addClassrooms: "@user/INSERT_CLASSROOM",
  pushClassrooms: "@user/PUSH_CLASSROOM",
  insertJoinedClassrooms: "@user/INSERT_JOINED_CLASSROOM",
  pushJoinedClassroom: "@user/PUSH_JOINED_CLASSROOM",
};

export default function userReducer(state = null, action) {
  switch (action.type) {
    case userActionType.addUser:
      return { ...action.payload };
    case userActionType.addUserRole:
      return { ...state, ...action.payload };
    case userActionType.removeUser:
      return null;
    case userActionType.addClassrooms:
      return { ...state, classrooms: Array.from(action.payload) };
    case userActionType.pushClassrooms:
      return { ...state, classrooms: [...state.classrooms, { ...action.payload }] };
    case userActionType.pushJoinedClassroom:
      return { ...state, enrolledIn: [...state.enrolledIn, { ...action.payload }] };
    case userActionType.insertJoinedClassrooms:
      return { ...state, enrolledIn: [...action.payload] };
  }
  return state;
}
