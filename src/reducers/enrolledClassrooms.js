const type = {
  classroomFetched: "ENROLLED_CLASSROOM_FETCHED",
  error: "ENROLL_CLASSROOM_ERROR",
  startLoading: "ENROLL_CLASSROOM_START_LOADING",
  pushClassroom: "ENROLL_CLASSROOM_PUSH_CLASSROOM",
};

const initialState = {
  loading: true,
  error: null,
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.classroomFetched:
      return Object.assign({}, state, { loading: false, data: action.payload });

    case type.error:
      return Object.assign({}, state, { loading: false, error: action.payload });

    case type.startLoading:
      return Object.assign({}, state, { loading: true });

    case type.pushClassroom: {
      const previousClassrooms = state.data;
      const newClassroom = action.payload;

      previousClassrooms.push(newClassroom);

      const data = previousClassrooms.map((classroom) => ({ ...classroom }));

      return Object.assign({}, state, { loading: false, data });
    }
  }

  return state;
};

export default { reducer, type };
