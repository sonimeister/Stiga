import { REDUX_ACTIONS } from "../GlobalConstants/AppConstants";

export const addTodo = todo => {
  return {
    type: REDUX_ACTIONS.ADD_TODO,
    todo
  };
};

export const deleteTodo = todo => {
  return {
    type: REDUX_ACTIONS.DELETE_TODO,
    todo
  };
};
export const clearState = () => {
  return {
    type: REDUX_ACTIONS.CLEAR_STATE
  };
};
