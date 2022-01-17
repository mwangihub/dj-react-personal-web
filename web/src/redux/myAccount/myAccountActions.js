import *  as action from './myAccountActionTypes';
import axios from 'axios';
import Api from '../../Api';

export const empty_response = {
    status: "505",
    statusText: "Internal server Error",
    info: "Probably the server setup incorrectly"
}

// AUTHENTICATION 
export const authStart = () => {
    return {
        type: action.AUTH_START
    }
}
export const authSuccess = (email, token) => {
    return {
        type: action.AUTH_SUCCESS,
        token: token,
        email: email
    }
}
export const authResetAccount = info => {
    return {
        type: action.AUTH_RESET_ACCOUNT,
        info: info
    }
}
export const authResetAccountSuccess = info => {
    return {
        type: action.AUTH_RESET_ACCOUNT_SUCCESS, info: info
    }
}
export const authFail = error => {
    return {
        type: action.AUTH_FAIL,
        error: error
    }
}
const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('email');
    return {
        type: action.AUTH_LOGOUT
    }
}
export const handleResetPassword = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        //pmwangij9@gmail.com
        Api.sendResetPasswordRequest({ email, password })
            .then(r => {
                let res = r.data
                if (r.status === 200) {
                    dispatch(authResetAccountSuccess(res.info));
                }
            }).catch(error => {
                if (error.res) {
                    console.log(error.res);
                    dispatch(authFail(error.res))
                } else if (error.request) {
                    console.log(error.request);
                    dispatch(authFail(error.request))
                } else {
                    dispatch(authFail("Another error occured when sending no input"))
                    console.log("Another error occured when sending no input");
                }
            });
    }

}
export const handleLoginEmail = (email, password) => {
    //use dispatch method to let reducer know its using async functions i.e axios
    return dispatch => {
        dispatch(authStart());
        Api.sendLoginRequest({ email, password })
            .then(r => {
                let res = r.data
                //pmwangij9@gmail.com
                const token = res.token ? res.token : null;
                const email = res.email ? res.email : null;
                const info = res.info ? res.info : null;
                const expirationDate = res.token ? new Date(new Date().getTime() + 7200 * 1000) : null;
                // var variables = {
                //     "token": token,
                //     "email": email,
                //     "expirationDate": expirationDate
                // }
                // console.log(variables);
                if (r.status === 200) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('expirationDate', expirationDate);
                    dispatch(authSuccess(email, token));
                    dispatch(checkAuthTimeout(3600));
                }
                if (r.status === 202) {
                    dispatch(authResetAccount(info));
                }
            }).catch(error => {
                if (error.res) {
                    console.log(error.res);
                    dispatch(authFail(error.res))
                } else if (error.request) {
                    console.log(error.request);
                    dispatch(authFail(error.request))
                } else {
                    dispatch(authFail("Another error occured when sending no input"))
                    console.log("Another error occured when sending no input");
                }
            });
    }

}
export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8000/api/accounts/login/', {
            username: username,
            password: password
        }).then(res => {
            const token = res.data.key;
            const email = res.data.email;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(email, token));
            dispatch(checkAuthTimeout(3600));
        }).catch(e => {
            dispatch(authFail(e))
        })
    }
}
export const checkTokenState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (token === 'undefined') {
            dispatch(logout());
        } else {
            const expireDate = new Date(localStorage.getItem('expirationDate'));
            if (expireDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(email, token));
                dispatch(checkAuthTimeout((expireDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

// ACCOUNT DATA
export const accountDataFetchStarted = () => {
    return {
        type: action.ACCOUNT_DATA_FETCH_STARTED
    }
}
export const accountDataFetched = accountData => {
    return {
        type: action.ACCOUNT_DATA_FETCHED,
        accountData: accountData
    }
}
export const accountDataFetchFailed = accountFetchError => {
    return {
        type: action.ACCOUNT_DATA_FETCH_FAILED,
        accountFetchError: accountFetchError
    }
}

export const fetchAccountData = () => {
    return dispatch => {
        dispatch(accountDataFetchStarted());
        const token = localStorage.getItem('token');
        Api.sendAccountRequest(token)
            .then(r => {
                if (r.status === 200) {
                    dispatch(accountDataFetched(r.data));
                }
            })
            .catch(error => {
                if (error.response) {
                    dispatch(accountDataFetchFailed(error.response))
                } else if (error.request) {
                    empty_response['info'] = "Server is down for now, no response received"
                    dispatch(accountDataFetchFailed(empty_response))
                } else {
                    dispatch(accountDataFetchFailed(empty_response))
                }
                // console.log(error.config);
            });
    }
};