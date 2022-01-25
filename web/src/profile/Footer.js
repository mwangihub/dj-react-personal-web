import React, { Component } from 'react'
import Api from '../Api';
import { connect } from 'react-redux';
import * as myAccountActions from '../redux/myAccount/myAccountActions'
const stateObject = {
    testedEmail: "pmwangij9@gmail.com",
    authenticate: false,
    message: null,
    reset_pwd: false,
    alert: 'info',
    custom_loading: false,
    noInputResponse: null,
}
const Spinner = () => {
    return (
        <div className="spinner-grow text-success my-2" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}
class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...stateObject
        }
    }
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    handleCheckNoInputValue = event => {
        event.preventDefault();
        let data = event.target.email.value;
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
                setTimeout(() => {
                    this.setState({
                        custom_loading: false,
                        noInputResponse: "Sever connection failed",
                        alert: 'danger'
                    });
                }, 3000);
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
            let email = this.state.testedEmail;
            let password = event.target.password2.value
            this.props.onResetPassword(email, password);
            event.target.reset()
        }
    }

    handleLoginForm = event => {
        event.preventDefault();
        let email = this.state.testedEmail;
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
        const { profile: { first_name, links, profiles }, isAuthenticated, email, reset_pwd, info, loading } = this.props;
        let { authenticate, custom_loading, testedEmail, alert, noInputResponse } = this.state;
        const { address, phone } = profiles ? profiles[0] : {}
        const { github, skype, twitter } = links ? links : {};

        const loginForm = () => {
            if (authenticate) {
                return (
                    <form className="focused d-flex flex-column align-items-center" onSubmit={e => this.handleLoginForm(e)} autoComplete="off" >
                        <label className='text-muted mb-4'>{testedEmail}</label>
                        <input type="password" name="password" id="password" required autoFocus />
                        {loading ? <Spinner /> : <button type="submit"><span>Login</span></button>}
                    </form>)
            }
            if (!authenticate) {
                return (
                    <form autoComplete="off" onSubmit={e => this.handleCheckNoInputValue(e)} className="d-flex flex-column align-items-center">
                        <input type="email" required name="email" />

                        {custom_loading ? <Spinner /> : ''}
                        {noInputResponse ? <div className="text-center">
                            <span className={`text-${alert}`}>{noInputResponse}</span>
                        </div> : ''}

                    </form>)
            }
        }

        const reset_psswd = () => {
            return (
                <form className=" focused mb-3" onSubmit={this.handleResetPassword} autoComplete="off" >
                    <input type="email" name="email" hidden readOnly value={testedEmail} />
                    <input type="password" name="password1" required placeholder='New password' />
                    <input type="password" name="password2" required placeholder='Confirm password' />
                    <div className="text-center">
                        <button type="submit">Reset password</button>
                    </div>
                </form>
            )
        }
        return (
            <footer id="footer" >
                <div className="footer-newsletter">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6" data-aos="zoom-out" data-aos-delay="300">
                                <h4>I am available for hire</h4>
                                <p>For all projects related to<code className='fs-6'> Python, Django, Django REST, ReactRedux, ReactJS, React-Native, Vanilla JS, HTML, Bootstrap</code> and<code className='fs-6'> CSS </code> contact me.</p>
                                <div className="d-flex flex-column align-items-center">
                                    {
                                        info != null ?
                                            <div className="form-group">
                                                <div className={`alert alert-${alert}`} id="alert"> {info}</div>
                                            </div> : ''
                                    }
                                    {isAuthenticated ?
                                        <small className="text-success">
                                            {email}<button onClick={this.handleLogOut}
                                                className="btn btn-sm btn-outline-warning ms-2 my-2">Log Out
                                            </button>
                                        </small>
                                        :
                                        <div className='w-100'>
                                            {reset_pwd ? reset_psswd() : ''}
                                            {loginForm()}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-top">
                    <div className="container">
                        <div className="row overflow-hidden">
                            <div className="col-lg-3 col-md-6 footer-contact " data-aos="fade-right" data-aos-delay="100">
                                <h3>{first_name} M<span>.</span></h3>
                                <p>
                                    {address}
                                    <br /> Kenya
                                    <br /><br />
                                    <strong>Phone:</strong> {phone}<br />
                                    <strong>Email:</strong> pmwassini@gmail.com<br />
                                </p>

                            </div>
                            <div className="col-lg-3 col-md-6 footer-links"></div>
                            <div className="col-lg-3 col-md-6 footer-links"></div>
                            <div className="col-lg-3 col-md-6 footer-links" data-aos="fade-left" data-aos-delay="200">
                                <h4>My Social Networks</h4>
                                <p>Check my github account for more projects. Follow me on twitter. Reach me through skype</p>
                                <div className="social-links mt-3">
                                    <a href={`${twitter}`} className="twitter"><i className="bx bxl-twitter"></i></a>
                                    <a href={`${skype}`} className="google-plus"><i className="bx bxl-skype"></i></a>
                                    <a href={`${github}`} className="linkedin"><i className="bx bxl-github"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container py-4">
                    <div className="copyright">
                        &copy; Copyright <strong><span>pmwassini@gmail.com</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        <a href="https://www.digitalocean.com/?refcode=3654e7ea820f&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge" >
                            <img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge" className='img-fluid'
                                style={{ height: "50px" }}
                            />
                        </a>
                    </div>
                </div>

            </footer>
        )
    }
}


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
export default connect(mapStateToProps, mapDispatchToProps)(Footer);


