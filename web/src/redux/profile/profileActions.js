import *  as action from './profileActionTypes';
import Api from '../../Api';

const empty_response = {
    status: "505",
    statusText: "Internal server Error",
    info: "Probably the server setup incorrectly"
}
export const profileFetchedStarted = () => {
    return {
        type: action.PROFILE_FETCH_STARTED
    }
}
export const setFetchedProfile = (profiles, projects, profileImages) => {
    return {
        type: action.PROFILE_FETCHED,
        projects: projects,
        profiles: profiles,
        profileImages: profileImages
    }
}
export const failedFetchedProfile = server_error => {
    return {
        type: action.PROFILE_FETCH_FAILED,
        server_error: server_error
    }
}

export const fetchProfile = () => {
    return dispatch => {
        dispatch(profileFetchedStarted());
        Api.getProfile()
            .then(r => {
                if (r.status === 200) {
                    const profile = r.data.profiles[0]
                    const profileImages = r.data.profileImages
                    dispatch(setFetchedProfile(profile, r.data.projects, profileImages));
                }
            })
            .catch(error => {
                if (error.response) {
                    dispatch(failedFetchedProfile(error.response))
                } else if (error.request) {
                    empty_response['info'] = "Server is down for now, no response received"
                    dispatch(failedFetchedProfile(empty_response))
                } else {
                    dispatch(failedFetchedProfile(empty_response))
                }
                // console.log(error.config);
            });
    }
};
