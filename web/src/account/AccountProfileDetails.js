import React, { Component } from 'react'

export class AccountProfileDetails extends Component {
    render() {
        return (
            <section className='profile__dashboard'>
                <div className="section-title">
                    <h2 className='fs-5'>Profile Details</h2>
                    <p className="lead mb-4">Profile details under different emails</p>
                </div>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title py-3">Profile Details<span></span></h5>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label ">Full Name</div>
                                        <div className="col-lg-9 col-md-8">Kevin Anderson</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        )
    }
}

export default AccountProfileDetails
