const initialState = {
  loading: true,
  data: [],
  error: null,
};

const type = {
  userClassLoaded: "USER_CLASS_DATA_FETCH",
  error: "USER_CLASS_ERROR",
  startLoading: "START_LOADING",
  stopLoading: "STOP_LOADING",
  pushClassroom: "PUSH_CLASSROOM",
};

function pushClassrooms(oldClassrooms = [], newClassroom) {
  oldClassrooms.push(newClassroom);
  return oldClassrooms.map((classes) => ({ ...classes }));
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.userClassLoaded:
      return Object.assign({}, state, { data: action.payload, loading: false });

    case type.error:
      return Object.assign({}, state, { error: action.payload, loading: false });

    case type.startLoading:
      return Object.assign({}, state, { loading: true });

    case type.stopLoading:
      return Object.assign({}, state, { loading: false });

    case type.pushClassroom: {
      return Object.assign({}, state, {
        loading: false,
        data: pushClassrooms(state.data, action.payload),
      });
    }
  }

  return state;
};

export default { reducer, type };
