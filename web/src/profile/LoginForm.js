import React, { Component } from 'react';
import Api from '../Api';
import { connect } from 'react-redux';
import * as myAccountActions from '../redux/myAccount/myAccountActions'
const stateObject = {
    testedEmail: null,
    authenticate: false,
    message: null,
    reset_pwd: false,
    alert: 'info',
    custom_loading: false,
    noInputResponse: null,
}
class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...stateObject
        }
    }
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    handleNoInputChange = event => {
        let data = event.target.value;
        if (data) {
            this.setState({ custom_loading: true });
        }
        Api.sendNoInputData(data).then(r => {
            r.data.email ?
                this.setState({ authenticate: true, testedEmail: r.data.email }) :
                this.setState({ authenticate: false });
            if (r.data.noData) {
                setTimeout(() => { this.setState({ custom_loading: false, noInputResponse: r.data.info }); }, 3000);
            }
        }).catch(error => {
            if (error.response) {
                let res = error.response;
                if (res.status === 404) {
                    setTimeout(() => { this.setState({ custom_loading: false, noInputResponse: res.data.info }); }, 3000);
                }
            } else if (error.request) {
                setTimeout(() => { this.setState({ custom_loading: false }); }, 3000);
            } else {
                setTimeout(() => { this.setState({ custom_loading: false }); }, 3000);
            }
        });
    }

    handleResetPassword = event => {
        event.preventDefault();
        if (event.target.password2.value !== event.target.password1.value) {
            event.target.reset()
            this.setState({ message: "Password did not match", alert: 'danger' },
                () => {
                    if (document.querySelector('#alert')) {
                        let el = document.querySelector('#alert');
                        el.innerHTML = this.state.message
                    }
                });
        } else {
            let email = event.target.email.value
            let password = event.target.password2.value
            this.props.onResetPassword(email, password);
            event.target.reset()
        }
    }

    handleLoginForm = event => {
        event.preventDefault();
        let email = event.target.email.value;
        let password = event.target.password.value;
        this.props.onLogIn(email, password);
        event.target.reset()
    }

    handleLogOut = () => {
        this.props.onLogOut();
        setTimeout(() => {
            this.setState({ ...stateObject });
        }, 1000);
    }

    render() {
        let { authenticate, custom_loading, testedEmail, alert, noInputResponse } = this.state;
        const { isAuthenticated, email, reset_pwd, info, loading } = this.props;

        const loginForm = () => {
            // If email is valid
            if (authenticate) {
                return (
                    <form className="php-email-form flex-column" onSubmit={e => this.handleLoginForm(e)} autoComplete="off" >
                        <div className=" form-group">
                            <input type="email" name="email" id="email" className="form-control" readOnly value={testedEmail} />
                        </div>
                        <div className=" form-group">
                            <input type="password" name="password" className="form-control" id="password" required />
                        </div>
                        <div className="text-center">
                            {
                                loading ?
                                    <div className="loading">Loading</div>
                                    :
                                    <button type="submit"><span>Login</span></button>
                            }
                        </div>
                    </form>)
            }
            // (Dummy searchBox) If no valid email 
            if (!authenticate) {
                return (
                    <form className="php-email-form" autoComplete="off" >
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bx fs-5 bx-search-alt"></i>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="any_input"
                                className="form-control"
                                id="any_input"
                                onChange={this.handleNoInputChange} />
                        </div>
                        {custom_loading ? <div className="loading"><span>Loading ...</span> </div> : ''}
                        {noInputResponse ? <div className="text-center">{noInputResponse}</div> : ''}
                    </form>)
            }
        }
        // (Reset Password) If email is correct but password is wrong.
        const reset_psswd = () => {
            return (
                <form className="php-email-form flex-column mb-3" onSubmit={this.handleResetPassword} autoComplete="off" >
                    <input type="email" name="email" className="form-control" hidden readOnly value={testedEmail} />
                    <div className=" form-group">
                        <input type="password" name="password1" className="form-control" required placeholder='New password' />
                    </div>
                    <div className=" form-group">
                        <input type="password" name="password2" className="form-control" required placeholder='Confirm password' />
                    </div>
                    <div className="text-center">
                        <button type="submit">Reset password</button>
                    </div>
                </form>
            )
        }
        return (
            <div id="no-input" className="container contact">
                {
                    info != null ?
                        <div className="form-group">
                            <div className={`alert alert-${alert}`} id="alert"> {info}</div>
                        </div> : ''
                }
                {reset_pwd ? reset_psswd() : ''}
                {isAuthenticated ?
                    <small className="text-success">
                        {email}
                        <button onClick={this.handleLogOut}
                            className="btn btn-sm btn-outline-warning ms-2 my-2">Log Out
                        </button>
                    </small> :
                    ''}
                {loginForm()}
            </div>
        )
    }
};
const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.token != null,
        error: state.authentication.error,
        loading: state.authentication.loading,
        email: state.authentication.email,
        reset_pwd: state.authentication.reset_pwd,
        info: state.authentication.info,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(myAccountActions.checkTokenState()),
        onLogIn: (email, password) => dispatch(myAccountActions.handleLoginEmail(email, password)),
        onLogOut: () => dispatch(myAccountActions.logout()),
        onResetPassword: (email, password) => dispatch(myAccountActions.handleResetPassword(email, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
