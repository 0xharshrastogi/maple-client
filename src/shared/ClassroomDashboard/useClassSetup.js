import { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { fetchClassdata } from "../../action";

function reducer(state, action) {
  switch (action.type) {
    case "CLASSROOM_DATA_FAILURE":
      return Object.assign({}, state, { loading: false, data: action.payload });

    case "CLASSROOM_DATA_SUCCESS":
      return Object.assign({}, state, { loading: false, data: action.payload });
  }
  return state;
}

export const useClassSetup = ({ classID }) => {
  if (!classID) throw new Error("Class ID not passed");

  const dispatch = useDispatch();
  const [store, classroomDispatch] = useReducer(reducer, {
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    console.count("Fetching Classdata");
    const handleError = (error) =>
      classroomDispatch({ type: "CLASSROOM_DATA_FAILURE", payload: error });

    const handleData = (data) =>
      classroomDispatch({ type: "CLASSROOM_DATA_SUCCESS", payload: data });

    dispatch(fetchClassdata({ classID, onError: handleError, onSuccess: handleData }));
  }, [classID, dispatch]);

  return { ...store };
};
