import *  as authAction from './profileActionTypes';

const innitialState = {
    componentsLoader: false,
    server_error: null,
    profiles: {},
    projects: [],
    profileImages: []
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
        projects: action.projects,
        profiles: action.profiles,
        profileImages: action.profileImages
    });
}

const failedFetchedProfile = (state, action) => {
    return stateObjectUpdater(state, {
        componentsLoader: false,
        server_error: action.server_error,
    });
}

const profileReducer = (state = innitialState, action) => {
    switch (action.type) {
        case authAction.PROFILE_FETCH_STARTED: return profileFetchedStarted(state, action);
        case authAction.PROFILE_FETCHED: return setFetchedProfile(state, action);
        case authAction.PROFILE_FETCH_FAILED: return failedFetchedProfile(state, action);
        default: return state;
    }
}
export default profileReducer;