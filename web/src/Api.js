import axios from "axios";

let http = (token = null) => {
    return axios.create({
        baseURL: "http://localhost:8000/api/",
        headers: {
            "Content-type": "application/json",
            Authorization: token ? `Token ${token}` : ''
        }
    });
}


const getProfile = () => {
    return http().get("/accounts/");
};
const getAllMessages = token => {
    return http(token).get('accounts/all-messages/');
};
const sendNoInputData = (data) => {
    return http().post("/accounts/", data);
};
const sendLoginRequest = (data) => {
    return http().post("/accounts/login/", data);
};
const sendResetPasswordRequest = (data) => {
    return http().post("/accounts/reset-password/", data);
};
const sendMessages = (data) => {
    return http().post("/accounts/messages/", data);
};
const sendAccountRequest = (token) => {
    return http(token).get("/myaccount/");
};
const sendDeleteMessageReuest = (token, id) => {
    return http(token).delete(`accounts/delete-messages/${id}/`);
};
const Api = {
    getProfile,
    getAllMessages,
    sendNoInputData,
    sendLoginRequest,
    sendResetPasswordRequest,
    sendMessages,
    sendAccountRequest,
    sendDeleteMessageReuest
};
export default Api