import *  as authAction from './myAccountActionTypes';

const innitialState = {
    token: null,
    error: null,
    loading: false,
    reset_pwd: false,
    email: null,
    info: null,
}
const stateObjectUpdater = (currentStateObject, updatedStateObject) => {
    return {
        ...currentStateObject, ...updatedStateObject
    }
}
const authStart = (state, action) => {
    return stateObjectUpdater(state, {
        error: null,
        loading: true
    });
}
const authSuccess = (state, action) => {
    return stateObjectUpdater(state, {
        error: null,
        loading: false,
        info: null,
        token: action.token,
        email: action.email
    });
}
const authResetAccount = (state, action) => {
    return stateObjectUpdater(state, {
        reset_pwd: true,
        loading: false,
        info: action.info
    });
}
const authResetAccountSuccess = (state, action) => {
    return stateObjectUpdater(state, {
        loading: false,
        reset_pwd: false,
        info: action.info
    });
}
const authFail = (state, action) => {
    return stateObjectUpdater(state, {
        error: action.error,
        loading: false,
    });
}
const authLogout = (state, action) => {
    return stateObjectUpdater(state, {
        token: null
    });
}


const myAccountReducer = (state = innitialState, action) => {
    switch (action.type) {
        case authAction.AUTH_START: return authStart(state, action);
        case authAction.AUTH_SUCCESS: return authSuccess(state, action);
        case authAction.AUTH_FAIL: return authFail(state, action);
        case authAction.AUTH_RESET_ACCOUNT: return authResetAccount(state, action);
        case authAction.AUTH_RESET_ACCOUNT_SUCCESS: return authResetAccountSuccess(state, action);
        case authAction.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
}
export default myAccountReducer;