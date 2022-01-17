import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class Header extends Component {
    render() {
        const { profile, isAuthenticated } = this.props;
        const navigationLinks = () => {
            return (
                <React.Fragment>
                    <li><a href="#hero" className="nav-link scrollto active"><i className="bx bx-home" /> <span>Home</span></a></li>
                    <li><a href="#about" className="nav-link scrollto"><i className="bx bx-user" /> <span>About</span></a></li>
                    <li><a href="#skills" className="nav-link scrollto"><i className="bx bx-sm bxl-steam" /> <span>Skills</span></a></li>
                    <li><a href="#resume" className="nav-link scrollto"><i className="bx bx-file-blank" /> <span>Resume</span></a></li>
                    <li><a href="#services" className="nav-link scrollto"><i className="bx bx-server" /> <span>Services</span></a></li>
                    <li><a href="#contact" className="nav-link scrollto"><i className="bx bx-envelope" /> <span>Contact</span></a></li>
                   
                </React.Fragment>
            )
        }
        const dashboardNavigationLinks = () => {
            return (
                <li>
                    <Link className="nav-link scrollto" style={{ background: 'green', color: "#fff" }} to="/">
                        <i className="bx bx-home" />
                        <span className='text-white'>Home</span>
                    </Link>
                </li>
            )
        }
        return (
            <header id="header" className="d-flex flex-column justify-content-center">
                <nav id="navbar" className="navbar nav-menu">
                    <ul>
                        {profile ? navigationLinks() : dashboardNavigationLinks()}
                        {isAuthenticated ?
                            <li>
                                <Link className="nav-link scrollto" style={{ background: '#e00202', color: "#fff" }} to="/account/authenticated">
                                    <i className="bx bx-user" />
                                    <span className='text-white'>Account</span>
                                </Link>
                            </li> :
                            ''}
                    </ul>
                </nav>
            </header>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.token !== null,
    }
}

export default connect(mapStateToProps)(Header)