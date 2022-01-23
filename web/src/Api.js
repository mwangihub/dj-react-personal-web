import axios from "axios";
// "multipart/form-data"
let http = (token = null, c_type = "application/json" ) => {
    return axios.create({
        baseURL: "https://portfolio-web-mobuq.ondigitalocean.app/api/",
        headers: {
            "Content-type": c_type,
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
const sendDeleteProfileImageReuest = (token, id) => {
    return http(token).delete(`myaccount/delete/profile-image/${id}/`);
};

const uploadProfileImage = (token, data) => {
    console.log(data);
    return http(token, 'multipart/form-data').post("myaccount/profile-image/", data);
};
const Api = {
    getProfile,
    getAllMessages,
    sendNoInputData,
    sendLoginRequest,
    sendResetPasswordRequest,
    sendMessages,
    sendAccountRequest,
    uploadProfileImage,
    sendDeleteMessageReuest, 
    sendDeleteProfileImageReuest
};
export default Api