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
        this.setState({ project })
    }

    render() {
        const projects = this.props
        const { project } = this.state
        return (
            <section id="services" className="services">
                <div className="container " >
                    <div className="section-title"><h2>Services</h2></div>
                    <p>Working closely with my clients and small teams, I use Django to produce outstanding, high performing and secure custom websites with unique and professional web design.</p>
                    <p>Check my github account for more projects. Most of my repositories are private and that is for good reasons.</p>
                    <div className="row" id="allServices position-relative">
                        {
                            projects && Object.keys(projects).map((project, i) => {
                                return (
                                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 " key={i}>
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