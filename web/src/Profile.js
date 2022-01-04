import React, { Component } from 'react';
import Hero from './profile/Hero';
import About from './profile/About';
import Skills from './profile/Skills';
import Resume from './profile/Resume';
import Services from './profile/Services';
import Contact from './profile/Contact';
import Header from './profile/Header';
import Footer from './profile/Footer';
import ErrorPage from './profile/ErrorPage';
import LoginForm from './profile/LoginForm';
import { connect } from 'react-redux';
import * as profileActions from './redux/profile/profileActions'
class Profile extends Component {
    componentDidMount() {
        this.props.fetchProfile()
    }
    render() {
        const error = this.props.server_error ? this.props.server_error : null;
        const loader = this.props.loading ? this.props.loading : false;

        return (
            error ?
                <ErrorPage {...error} /> :
                <React.Fragment>
                    <LoginForm />
                    <Header profile={true} />
                    <Hero {...this.props} />
                    <main id="main">
                        <About {...this.props} />
                        <Skills />
                        <Resume {...this.props} />
                        <Services />
                        <Contact {...this.props} />
                    </main>
                    <Footer {...this.props} />
                    {loader ? <div id="preloader"></div> : ''}
                </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.profile.profileData,
        loading: state.profile.componentsLoader,
        server_error: state.profile.server_error,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchProfile: () => dispatch(profileActions.fetchProfile())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
