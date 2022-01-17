import React, { Component } from 'react'
import Social from './Social';

export default class Footer extends Component {
    render() {
        const { profile: { email, first_name, links } } = this.props
        return (
            <footer id="footer">
                <div className="container">
                    <h3>{first_name}</h3>
                    <p>For all projects related to<code className='fs-6'> Python, Django, Django REST, ReactRedux, ReactJS, React-Native, Vanilla JS, HTML, Bootstrap</code> and<code className='fs-6'> CSS </code> contact me.</p>
                    <Social {...links} />

                    <div className="mb-2">
                        <a href="https://www.digitalocean.com/?refcode=3654e7ea820f&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge" >
                            <img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge" className='img-fluid'/>
                        </a>
                    </div>

                    <div className="copyright">
                        &copy; Copyright <strong><span>{email}</span></strong>. All Rights Reserved
                    </div>

                </div>
            </footer>
        )
    }
}
