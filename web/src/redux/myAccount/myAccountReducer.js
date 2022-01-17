import *  as authAction from './myAccountActionTypes';

const innitialState = {
    token: null,
    error: null,
    loading: false,
    reset_pwd: false,
    email: null,
    info: null,
    accountData:[],
    accountError:null,
    accountLoader:false,
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

//AACOUNT DATA
export const accountDataFetchStarted = (state, action) => {
    return stateObjectUpdater(state, {
        accountError: null,
        accountLoader: true
    });
}
export const accountDataFetched = (state, action) => {
    return stateObjectUpdater(state, {
        accountError: null,
        accountLoader: false,
        accountData: action.accountData,
    });
}
export const accountDataFetchFailed = (state, action) => {
    return stateObjectUpdater(state, {
        accountError: action.accountError,
        accountLoader: false,
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

        case authAction.ACCOUNT_DATA_FETCH_STARTED: return accountDataFetchStarted(state, action);
        case authAction.ACCOUNT_DATA_FETCHED: return accountDataFetched(state, action);
        case authAction.ACCOUNT_DATA_FETCH_FAILED: return accountDataFetchFailed(state, action);
        default: return state;
    }
}
export default myAccountReducer;