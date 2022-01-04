import React, { Component } from 'react'
import { ProfileConsumer } from '../contextApi';
import Social from './Social';

export default class Footer extends Component {
    render() {
        let data = this.props.data;
        const links = data ? data.links : {}
        return (
            <footer id="footer">
                <div className="container">
                    <h3>{data ? data.first_name : ''}</h3>
                    <p>For all projects related to<code className='fs-6'> Python, Django, Django REST, ReactJS, React-Native JS, Vanilla JS, HTML, Bootstrap</code> and<code className='fs-6'> CSS </code> contact me.</p>
                    <Social {...links} />
                    <div className="copyright">
                        &copy; Copyright <strong><span>Innovest.com</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        Template <a href="https://bootstrapmade.com/">Credits</a>
                    </div>
                </div>
            </footer>
        )
    }
}
