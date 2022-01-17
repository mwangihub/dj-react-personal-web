import React, { Component } from 'react'

class AccountNotAuthenticated extends Component {
    render() {
        return (
            <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-5">You are forbidden from this action</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                        It could be that you were navigating the pages around so that you reached this URL. Or using you knowledge you somehow figured out how to reach this URL. Either way we humbly request you to respect this website as it is a personal space and leave this endpoint.
                    </p>
                    <p className="lead mb-4">
                        Otherwise it will be consindered as breach of privacy and related laws.
                    </p>
                </div>
            </div>
        )
    }
}
export default AccountNotAuthenticated