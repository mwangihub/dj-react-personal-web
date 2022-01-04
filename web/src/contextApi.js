// import React, { Component } from 'react';
// import Api from './Api';
// import { connect } from 'react-redux';
// import * as myAccountActions from './redux/myAccount/myAccountActions'

// const ProfileContext = React.createContext();
// class ProProvider extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             profile: {},
//             myInfo: null,
//             loading: false,
//             server_e: null,
//             server_s: null,
//             server_error: null,
//             contactMessage_sent: false,
//             contactMessage_error: false,
//         }
//         this.empty_response = {
//             status: "505",
//             statusText: "Internal server Error",
//             info: "Probably the owner didn't setup the profile correctly"
//         }
//     }


//     static getDerivedStateFromProps(props, state) {
//             const stateObjectUpdater = (currentStateObject, updatedStateObject) => {
//                 return {
//                     ...currentStateObject, ...updatedStateObject
//                 }
//             }
//             if (props.profileData != null) {
//                 console.log("profileData");
//                 return stateObjectUpdater(state, {
//                     profile: props.profileData,
//                 });
//             }
//             return null
//     }

//     componentDidMount() {
//         this.props.fetchProfile()
//     }
//     fetchProfile = () => {
//         Api.getProfile()
//             .then(r => {
//                 console.log("fetchProfile() ", r.status);
//                 if (r.status === 200) {
//                     let profile = r.data[0];
//                     let myInfo = r.data[0].profiles[0];
//                     let loading = false
//                     r.data.length === 0 ? this.setState({
//                         profile: r.data, loading: false
//                     }) : this.setState({ profile, myInfo, loading });
//                 }
//             })
//             .catch(error => {
//                 if (error.response) {
//                     this.setState({ server_error: error.response, loading: false })
//                 } else if (error.request) {
//                     this.empty_response['info'] = "Server is down for now, no response received"
//                     this.setState({ server_error: this.empty_response, loading: false })
//                 } else {
//                     // console.log('Error', error.message);
//                     this.setState({ server_error: this.empty_response, loading: false })
//                 }
//                 // console.log(error.config);
//             });
//     };

    

//     handleLoginEmail = event => {
//         event.preventDefault();
//         let data = {
//             'email': event.target.email.value,
//             'password': event.target.password.value
//         }
//         Api.sendLoginRequest(data).then(r => {
//             let response = r.data
//             response.info ? this.setState({ loginMessage: response.info }) : this.setState({ loginMessage: null });
//             response.token ? this.setState({ token: response.token }) : this.setState({ token: null });
//         }).catch(error => {
//             if (error.response) {
//                 console.log(error.response);
//             } else if (error.request) {
//                 console.log(error.request);
//             } else {
//                 console.log("Another error occured when sending no input");
//             }
//         });
//         event.target.reset();
//     }

//     render() {
//         // console.log(this.props);
//         return (
//             <ProfileContext.Provider value={{
//                 ...this.state,
//                 // ...this.props,
//                 sendContactMessage: this.sendContactMessage,
//                 handleLoginEmail: this.handleLoginEmail,
//             }}>
//                 {this.props.children}
//             </ProfileContext.Provider>
//         )
//     }
// }
// const mapStateToProps = state => {
//     // console.log(state.profileData);
//     return {
//         profileData: state.profileData,
//         componentsLoader: state.componentsLoader,
//         s_error: state.server_error,
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         fetchProfile: () => dispatch(myAccountActions.fetchProfile())
//     }
// }

// const ProfileProvider = connect(mapStateToProps, mapDispatchToProps)(ProProvider);

// const ProfileConsumer = ProfileContext.Consumer;
// export { ProfileProvider, ProfileConsumer };
