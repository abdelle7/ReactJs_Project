import { combineReducers } from 'redux'

const initState={
    AllUsers:[]
}
const AllUsersReducer =  (state=initState,action) => {
    if(action.type==='FETCH_USERS'){
        console.log('Reducer',action.payload);
      return action.payload
    }
    console.log('Reducer NULL');

    return state.AllUsers
};

export default combineReducers({
    AllUsers: AllUsersReducer,
});