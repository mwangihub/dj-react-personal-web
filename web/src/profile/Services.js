import React, { Component } from 'react'
import { ProfileConsumer } from '../contextApi';
const Servive = ({ openModal, details }) => {
    return (
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 ">
            <div className="icon-box iconbox-yellow" onClick={e => openModal()}>
                <div className="icon" >
                    <i className="bx bx-layer" />
                </div>
                <h4>Django-React Intergration</h4>
                <p>Simple app that intergrates Django and React.</p>
            </div>

        </div>
    )
}
export default class Services extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: null,
            modalOpen: false
        }
    }
    openModal = () => {
        let viewService = document.querySelector("#viewService");
        viewService.style.display = "flex";
    }
    closeModal = event => {
        let
            viewService = document.querySelector("#viewService"),
            serviceCodeSample = document.querySelector("#serviceCodeSample");
        serviceCodeSample.className += " out";
        setTimeout(function () {
            viewService.style.display = "none";
            serviceCodeSample.classList.remove("out")
        }, 400);
    }
    render() {
        const { modalOpen, details } = this.state;
        const properties = {
            openModal: this.openModal,
            details: details
        }
        return (
            <section id="services" className="services">
                <div className="container " >
                    <div className="section-title"><h2>Services</h2></div>
                    <p>Working closely with my clients and small teams, I use Django to produce outstanding, high performing and secure custom websites with unique and professional web design. If your project requires, to use python framework and Java script I ensure that your goals are met in time.</p>
                    <p>Check my github account for more projects. Most repos are private.</p>
                    <div className="row" id="allServices position-relative">
                        <Servive {...properties} />
                        <Servive {...properties} />
                    </div>
                    <div id="viewService" className="viewService">
                        <div id="serviceCodeSample" className="serviceCodeSample mb-4 bg-light rounded-3">
                            <div className="container-fluid ">
                                <h1 className="display-6 fw-bold">Custom jumbotron</h1>
                            </div>
                        </div>
                        <button id="closeModal" className="btn btn-sm btn-primary px-5" onClick={e => this.closeModal(e)}>Close</button>
                    </div>
                </div>
            </section>
        )
    }
}