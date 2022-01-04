import *  as authAction from './profileActionTypes';

const innitialState = {
    profileData: null,
    componentsLoader: false,
    server_error: null,
}
const stateObjectUpdater = (currentStateObject, updatedStateObject) => {
    return {
        ...currentStateObject, ...updatedStateObject
    }
}

// To be moved out of this folder
const profileFetchedStarted = (state, action) => {
    return stateObjectUpdater(state, {
        server_error: null,
        componentsLoader: true
    });
}
const setFetchedProfile = (state, action) => {
    return stateObjectUpdater(state, {
        componentsLoader: false,
        server_error: null,
        profileData: action.profileData
    });
}

const failedFetchedProfile = (state, action) => {
    return stateObjectUpdater(state, {
        componentsLoader: false,
        server_error: action.server_error,
        profileData: null
    });
}

const profileReducer = (state = innitialState, action) => {
    switch (action.type) {
        //To be created outside this method
        case authAction.PROFILE_FETCH_STARTED: return profileFetchedStarted(state, action);
        case authAction.PROFILE_FETCHED: return setFetchedProfile(state, action);
        case authAction.PROFILE_FETCH_FAILED: return failedFetchedProfile(state, action);
        default: return state;
    }
}
export default profileReducer;