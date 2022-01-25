import React, { Component } from 'react'

class ServicesPortfolio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            renderSlider: false
        }
    }
    componentDidMount() {
        const handler = e => this.setState({ renderSlider: e.matches });
        window.matchMedia("(max-width: 576px)").addEventListener('change', handler);
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
        document.querySelector("body").style.overflow = "visible";
    }

    render() {
        const { brief, cartegory, project_name, client, url } = this.props
        const { renderSlider } = this.state
        return (
            <div id="viewService" className="viewService">
                <div id="serviceCodeSample" className="serviceCodeSample mb-4 bg-light rounded-3 portfolio-details">
                    <div className="gy-4">
                        {!renderSlider && (
                            <div id="slider" className="col-lg-12 p-md-2">
                                <div className="portfolio-details-slider swiper">
                                    <div className="swiper-wrapper align-items-center">
                                        {/* {
                                            images && images.map((image, index) => {
                                                return (
                                                    <div className="swiper-slide d-flex justify-content-center" key={image.id}>
                                                        <img src={`${image.profile_img}`} alt="projects-img" style={{}} />
                                                    </div>
                                                )
                                            })
                                        } */}
                                    </div>
                                    <div className="swiper-pagination"></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="row gy-4">
                        <div className="col-lg-12">
                            <div className="portfolio-info">
                                <h3>Project information</h3>
                                <ul>
                                    <li><strong>Category</strong>: {cartegory}</li>
                                    <li><strong>Client</strong>: {client}</li>
                                    <li><strong>Project URL</strong>: <a href={`${url}`}>{url}</a></li>
                                </ul>
                            </div>
                            <div className="portfolio-description">
                                <h2>About {project_name}</h2>
                                <p>{brief}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button id="closeModal"
                    onClick={e => this.closeModal(e)}
                    className="btn btn-sm btn-primary px-5">Close</button>
            </div>
        )
    }
}
export default ServicesPortfolio;