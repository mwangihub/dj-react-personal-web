import React, { Component } from 'react'
import ServicesPortfolio from './ServicesPortfolio'

class Services extends Component {
    constructor(props) {
        super(props)

        this.state = {
            project: null
        }
    }

    openModal = project => {
        let viewService = document.querySelector("#viewService");
        viewService.style.display = "flex";
        document.querySelector("body").style.overflow = "hidden";
        this.setState({ project })
    }

    render() {
        const projects = this.props
        const { project } = this.state
        return (
            <section id="services" className="services">
                <div className="container overflow-hidden">
                    <div className="section-title"><h2>Services</h2></div>
                    <div data-aos="fade-right" >
                        <p>Working closely with my client and small teams, I use Django to produce outstanding, high performing and secure custom websites with unique and professional web design. Check my github account for more projects. Most of my repositories are private and that is for good reason(s). Feel free to fork, improve or adjust my of my projects to suite your need or for learning purposes.</p>
                    </div>
                    <div className='' data-aos="fade-right" data-aos-delay="100">
                        <small >
                            <a href="https://github.com/mwangihub/mwangihub" target="_blank" rel="noopener noreferrer" >
                                <i className="bi-github fs-5 me-2" /> View and follow me on github</a></small>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-5">
                            <div data-aos="fade-right" data-aos-delay="300">
                                <h4 className='my-4'>My services to clients</h4>
                                <ul className='my_service'>
                                    <li >
                                        <strong>Migrating to Django web site.</strong> <br />
                                        <p className='text-justify'>Django is dedicated to address the issues of intense deadlines. With a very short duration of time i help clients to migrate to Django backend without data loss. Django is scalable with security feature in it makes your web site more applealing</p>
                                    </li>
                                    <li>
                                        <strong>Django support, third-party packages and maintenance.</strong> <br />
                                        <p className='text-justify'>I offer professional help in maintaing, identifying and repairing Django application hence improving performance and user experience. Django also intergrates and power other web applications in both development and production levels, not mentioning the fact that python has multiple packages that can ease the issue of security, performance and functionality.</p>
                                    </li>
                                    <li> <strong>Django web application development.</strong> <br />
                                        <p className='text-justify'>With deadlines, i offer web sites that meet client's needs with less risks of accerlarated development.</p>
                                    </li>
                                    <li> <strong>Django testing and assurance.</strong> <br />
                                        <p className='text-justify'>As part of Django development, i use vast python tools in django to create test units and verify the status of client's website.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div data-aos="fade-left" data-aos-delay="500">
                                <h4 className='my-4'>My working methodology</h4>
                                <div className="list-group">
                                    <div>
                                        <h5 className="mb-1 fw-bold">Requirements</h5>
                                    </div>
                                    <small className="mb-1">Client's needs drives the whole business. We work closely together to find out;</small>
                                    <ol>
                                        <li><small>The client's needs</small></li>
                                        <li><small>The problem or gaps</small></li>
                                        <li><small>Then I determine how django will be implemented through extensive research</small></li>
                                    </ol>
                                </div>
                                <div className="list-group">
                                    <div>
                                        <h5 className="mb-1 fw-bold">WorkFlow</h5>
                                    </div>
                                    <small className="mb-1">I oftenly write a well detailed plan that elaborates Django web development workflow and how to enhance web functionalities.</small>
                                </div>
                                <div className="list-group">
                                    <div>
                                        <h5 className="mb-1 fw-bold">Dates, project and pricing</h5>
                                    </div>
                                    <small className="mb-1">Depending with complexity of the application, I will always have time frame for diffrent tasks or assign parts of it to my small team. After discussing pricing and required resources, I commence the project with convenience</small>
                                </div>
                                <div className="list-group">
                                    <div>
                                        <h5 className="mb-1 fw-bold">Unit testing</h5>
                                    </div>
                                    <small className="mb-1">After completing the project, I will run comprehensive tests on the newly implemented web application</small>
                                </div>
                                <div className="list-group">
                                    <div>
                                        <h5 className="mb-1 fw-bold">Client's feedback</h5>
                                    </div>
                                    <small className="mb-1">After testing the core functionality, the client will be required to give feedback and then I will implement corrective measures</small>
                                </div>
                                <div className="list-group">
                                    <div>
                                        <h5 className="mb-1 fw-bold">Deployement and maintainace</h5>
                                    </div>
                                    <small className="mb-1">The application will then be deployed then afterwards run maintenance to streamline user experience</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row position-relative mb-4" id="allServices ">
                        {
                            projects && Object.keys(projects).map((project, i) => {
                                return (
                                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 " key={i} data-aos="zoom-in" data-aos-delay="500">
                                        <div className="icon-box iconbox-yellow" onClick={e => this.openModal(projects[i])}>
                                            <div className="icon" >
                                                <i className="bx bxl-dribbble" />
                                            </div>
                                            <h4>{projects[i].project_name}</h4>
                                            <p>{projects[i].brief.substring(0, 100)}...</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <ServicesPortfolio {...project} />
                </div>
            </section>
        )
    }
}
export default Services