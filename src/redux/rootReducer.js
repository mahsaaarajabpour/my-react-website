
import { combineReducers } from 'redux';


import userInfoReducer from './UserInfo/userInfo.reducer';


const rootReducer = combineReducers({
    userInfo: userInfoReducer,
});

export default rootReducer;