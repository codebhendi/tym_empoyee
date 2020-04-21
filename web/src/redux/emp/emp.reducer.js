import ActionTypes from './emp.types';

const INITIAL_STATE = {
  loading: false,
};

const analystReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.START_GET_EMP:
      return { ...state, loading: true };

    case ActionTypes.STOP_GET_EMP:
      return { ...state, loading: false };

    case ActionTypes.DONE_GET_EMP:
      return {
        ...state,
        loading: false,
        empList: action.empList,
        surveys: action.surveys,
      };

    case ActionTypes.START_POST_SURVEY:
      return { ...state, loading: true };

    case ActionTypes.DONE_POST_SURVEY:
      return { ...state, loading: false };

    case ActionTypes.STOP_POST_SURVEY:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default analystReducer;
