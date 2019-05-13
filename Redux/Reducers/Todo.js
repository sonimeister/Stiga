import { REDUX_ACTIONS } from "../../GlobalConstants/AppConstants";

const initialState = { todo: [] };

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case REDUX_ACTIONS.ADD_TODO:
      return {
        todo: [...state.todo, action.todo]
      };
    case REDUX_ACTIONS.DELETE_TODO:
      return {
        todo: state.todo.filter(tod => tod.title !== action.todo.title)
      };
    case REDUX_ACTIONS.CLEAR_STATE:
      state = initialState;
    default:
      return state;
  }
}
