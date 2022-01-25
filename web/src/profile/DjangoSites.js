import React from 'react';

const DjangoSites = () => {
    return (
        <section id="testimonials" className="testimonials section-bg">
            <div className="container aos-init aos-animate" data-aos="fade-up">

                <div className="d-flex justify-content-center">
                    <div className="border-bottom col-lg-8 text-center">
                        <h5 className='fw-bold'>Top django web apps</h5>
                    </div>

                </div>

                <div className="d-flex justify-content-center mt-3">
                    <div className="col-lg-6">
                        <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <div className="icon">
                                            <i className="bi-youtube text-danger" />
                                        </div>

                                        <h3>You tube</h3>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <i className="bx bxl-spotify text-success" />
                                        <h3>Spotify</h3>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <i className="bx bxl-dropbox text-primary" />
                                        <h3>Dropbox</h3>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <i className="bx bxl-instagram text-danger" />
                                        <h3>Instagram</h3>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <i className="bi-globe text-secondary" />
                                        <h3>National Geographic</h3>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <i className="bi-pinterest text-danger" />
                                        <h3>Pinterest</h3>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <i className="bx bxl-firefox text-primary" />
                                        <h3>Mozila</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default DjangoSites;
