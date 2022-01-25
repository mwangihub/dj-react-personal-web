import React, { Component } from 'react';
import Hero from './profile/Hero';
import About from './profile/About';
import Skills from './profile/Skills';
import DjangoSites from './profile/DjangoSites';
import Resume from './profile/Resume';
import Services from './profile/Services';
import Contact from './profile/Contact';
import Header from './profile/Header';
import Footer from './profile/Footer';
import ErrorPage from './profile/ErrorPage';
import { connect } from 'react-redux';
import * as profileActions from './redux/profile/profileActions'
class Profile extends Component {
    componentDidMount() {
        this.props.fetchProfile()
    }
    render() {
        const { loading, server_error, projects } = this.props;
        return (
            server_error ?
                <ErrorPage {...server_error} /> :
                <React.Fragment>
                    <Header profile={true} />
                    <Hero {...this.props} />
                    <main id="main">
                        <About {...this.props} />
                        <Skills />
                        <Resume {...this.props} />
                        <Services {...projects} />
                        <DjangoSites/>
                        <Contact {...this.props} />
                        <Footer {...this.props} />
                    </main>
                    {loading ? <div id="preloader"></div> : ''}
                </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    const { profile: { profiles, projects, componentsLoader, server_error, profileImages } } = state;
    return {
        profile: profiles,
        loading: componentsLoader,
        server_error: server_error,
        projects: projects,
        profileImages: profileImages,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchProfile: () => dispatch(profileActions.fetchProfile())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);