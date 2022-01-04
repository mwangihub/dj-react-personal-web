import React, { Component } from 'react';
import { ProfileConsumer } from '../contextApi';
export default class Resume extends Component {
    render() {
        let data = this.props.data;
        const profile = data ? data.profiles[0] : {}
        return (
            <section id="resume" className="resume">
                <div className="container">
                    <div className="section-title">
                        <h2>Resume</h2>
                        <p>Skilled at delivery and maintenance of web software and accustomed to functioning within a team of top-performing developers and IT support experts.</p>
                    </div>
                    <div className="row resume-content">
                        <div className="col-lg-8">
                            <h3 className="resume-title">Sumary</h3>
                            <div className="resume-item pb-0">
                                <h4>{data ? data.first_name : ''}</h4>
                                <p><em>With three years of Learning web development, I am confident that Django is one of the best python framework in designing quality web application with deadline.
                                    For any jobs related to <code>Django, Django Rest & React</code>, feel free to contact me.</em></p>
                                <ul>
                                    <li>{profile.address}</li>
                                    <li>{profile.phone}</li>
                                    <li>{profile.email}</li>
                                </ul>
                            </div>
                            <h3 className="resume-title">Education</h3>
                            <div className="resume-item">
                                <h4>Degree: Bsc. Information Technology
                                    <span className="text-success"> (on progress)</span> </h4>
                                <h5>January, 2019 to December, 2022</h5>
                                <p><em>Mount Kenya University, Ke</em></p>
                                <p>Followed my passion in a core of Programing and Algorithm classes.</p>
                                <p>Excelled in user experience and user interfaces in Web Applications.</p>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <h3 className="resume-title">Work Experience</h3>
                            <div className="resume-item">
                                <h4>Freelance Web Developer</h4>
                                <h5>2019 - Present</h5>
                                <p><em>Up work and Github: Nairobi, Kenya</em></p>
                                <ul>
                                    <li>Developed an ecommerce webapp, customer web websites, personal websites.</li>
                                    <li>Passionate about software architecture and AI.</li>
                                    <li>Quick learner and can work with team either online or virtual</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}