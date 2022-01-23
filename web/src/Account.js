import React, { Component } from 'react';
import Header from './profile/Header';
import { connect } from 'react-redux';
import * as myAccountActions from './redux/myAccount/myAccountActions'
import AccountNotAuthenticated from './account/AccountNotAuthenticated';
import AccountMessages from './account/AccountMessages';
import AccountProfileForms from './account/AccountProfileForms';
import AccountImagesActions from './account/AccountImagesActions';
import AccountProfileDetails from './account/AccountProfileDetails';

class Account extends Component {
    
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }
    render() {
        const { isAuthenticated } = this.props;
        return (
            <>
                <Header profile={false} />
                <main id="main" className='account'>
                    {
                        isAuthenticated ?
                            <>
                                <AccountMessages />
                                <AccountProfileForms />
                                <AccountProfileDetails />
                                <AccountImagesActions />
                            </>
                            : <AccountNotAuthenticated />
                    }
                </main>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(myAccountActions.checkTokenState()),
        onLogOut: () => dispatch(myAccountActions.logout()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);