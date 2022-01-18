const userAction = {
  addUser: "@user/ADD",
  removeUser: "@user/REMOVE",
  addUserRole: "@user/ADD_ROLE",
  addClassrooms: "@user/INSERT_CLASSROOM",
  pushClassrooms: "@user/PUSH_CLASSROOM",
  insertJoinedClassrooms: "@user/INSERT_JOINED_CLASSROOM",
  pushJoinedClassroom: "@user/PUSH_JOINED_CLASSROOM",
};

function reducer(state = null, action) {
  switch (action.type) {
    case userAction.addUser:
      return { ...action.payload };
    case userAction.addUserRole:
      return { ...state, ...action.payload };
    case userAction.removeUser:
      return null;
    case userAction.addClassrooms:
      return { ...state, classrooms: Array.from(action.payload) };
    case userAction.pushClassrooms:
      return { ...state, classrooms: [...state.classrooms, { ...action.payload }] };
    case userAction.pushJoinedClassroom:
      return { ...state, enrolledIn: [...state.enrolledIn, { ...action.payload }] };
    case userAction.insertJoinedClassrooms:
      return { ...state, enrolledIn: [...action.payload] };
  }
  return state;
}

export default { reducer, type: userAction };
