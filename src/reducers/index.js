import { combineReducers } from 'redux'

const initState = {
    AllUsers: []
}
const AllUsersReducer = (state = initState, action) => {
    if (action.type === 'FETCH_USERS') {
        return action.payload
    }
    else if (action.type === 'GET_ALL_DATA') {
        return []
    }
    return state.AllUsers
};

export default combineReducers({
    AllUsers: AllUsersReducer,
});