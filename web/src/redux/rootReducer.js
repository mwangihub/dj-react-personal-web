import { combineReducers } from 'redux';
import profileReducer from './profile/profileReducer';
import myAccountReducer from './myAccount/myAccountReducer'

const rootReducer = combineReducers({
    authentication: myAccountReducer,
    profile: profileReducer
})

export default rootReducer;