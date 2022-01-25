import React, { Component } from 'react'
export default class Skills extends Component {
    render() {
        return (
            <section id="skills" className="skills section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>Skills</h2>
                    </div>
                    <div>
                        <p>Experienced in working with Digital Ocean app and cloud platform. Experienced with building Heroku web apps with django. Familiar with Unix and linux internals and bash scripting. Currently on the way to becoming PENTester Certified by Offesive Security</p>
                        <ul className='mt-3' style={{ listStyle: "none" }}>
                            <li>
                                <i className="bi bi-chevron-right text-success" />
                                <span> Experienced in managing both back-end and front-end aspects of development process</span>
                            </li>
                            <li>
                                <i className="bi bi-chevron-right text-success" />
                                <span> Experienced in deplyoying web applications to Digital ocean</span>
                            </li>
                            <li>
                                <i className="bi bi-chevron-right text-success" />
                                <span> Experienced in building full-stack applications using django and React, HTML, CSS and bootstrap</span>
                            </li>
                            <li>
                                <i className="bi bi-chevron-right text-success" />
                                <span> Experienced in building RESTful APIs using Django REST Framework for any web application</span>
                            </li>
                            <li>
                                <em> Ready to learn new skills and join any team in production of quality applications.</em>
                            </li>
                        </ul>
                    </div>
                    <div className="row skills-content">
                        <div className="col-lg-6" data-aos="fade-right" data-aos-delay="200">
                            <div className="progress">
                                <span className="skill">ReactJS <i className="val">90%</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" style={{ width: '90%' }} />
                                </div>
                            </div>
                            <div className="progress">
                                <span className="skill">React-Native <i className="val">90%</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" style={{ width: '90%' }} />
                                </div>
                            </div>
                            <div className="progress">
                                <span className="skill">Python<i className="val">80%</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" style={{ width: '80%' }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6"data-aos="fade-left" data-aos-delay="200">
                            <div className="progress">
                                <span className="skill">HTML <i className="val">100%</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className="progress">
                                <span className="skill">CSS <i className="val">100%</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className="progress">
                                <span className="skill">JavaScript <i className="val">95%</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" style={{ width: '95%' }} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}