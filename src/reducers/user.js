const type = {
  ADD_USER: "ADD_USER",
  REMOVE_USER: "REMOVE_USER",
  ERROR_USER: "USER_ERROR",
  LOADING_USER_START: "USER_LOADING_START",
  LOADING_USER_STOP: "USER_LOADING_STOP",
};

const initialState = { data: null, error: null, loading: true };

function reducer(state = initialState, action) {
  switch (action.type) {
    case type.LOADING_USER_START:
      return Object.assign({}, state, { loading: true });

    case type.LOADING_USER_STOP:
      return Object.assign({}, state, { loading: false });

    case type.ADD_USER: {
      return Object.assign({}, state, { data: action.payload, loading: false });
    }

    case type.REMOVE_USER: {
      return Object.assign({}, initialState, { loading: false });
    }

    case type.ERROR_USER: {
      console.log(action.payload);
      return Object.assign({}, state, { error: action.payload, loading: false });
    }
  }

  return state;
}

export default { reducer, type };
