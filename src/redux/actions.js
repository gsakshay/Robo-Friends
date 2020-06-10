export const SEARCH_CHANGE = "SEARCH_CHANGE";
export const ADD_ROBOT = "ADD_ROBOT";
export const FETCH_ROBOT_PENDING = "FETCH_ROBOT_PENDING";
export const FETCH_ROBOT_SUCCESS = "FETCH_ROBOT_SUCCESS";
export const FETCH_ROBOT_ERROR = "FETCH_ROBOT_ERROR";

export const searchChange = (searchText) => {
    return{
        type:SEARCH_CHANGE,
        payload:searchText,
    }
}

export const addRobot = (user) => {
    return{
        type:ADD_ROBOT,
        payload:user
    }
}

export const fetchRobots = () => (dispatch) => {
    dispatch({type:FETCH_ROBOT_PENDING})
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) =>response.json())
    .then(data=>{dispatch({type:FETCH_ROBOT_SUCCESS,payload:data})})
    .catch(err=>{dispatch({type:FETCH_ROBOT_ERROR,payload:err})})
}