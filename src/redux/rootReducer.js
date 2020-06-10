
import { SEARCH_CHANGE,ADD_ROBOT,FETCH_ROBOT_PENDING,FETCH_ROBOT_SUCCESS,FETCH_ROBOT_ERROR } from "./actions"

const initialState = {
  searchField: "",
  robots: [],
  newName: "",
  newEmail: "",
  isLoading:true,
};

export const rootReducer = (state=initialState, action) => {
    switch (action.type) {
      case SEARCH_CHANGE:
        return {
          ...state,
          searchField: action.payload,
        };
      case ADD_ROBOT:
        return {
          ...state,
          robots: [...state.robots,action.payload]
        };
      
        
      case FETCH_ROBOT_PENDING:
        return {
          ...state,
          isLoading: true,
        };
      case FETCH_ROBOT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          robots: action.payload,
        };
      case FETCH_ROBOT_ERROR:
          return{
           ...state,
           isLoading:false     
      }
      default:
        return state;
    }
}