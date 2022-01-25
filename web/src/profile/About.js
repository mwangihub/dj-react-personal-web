import React from 'react';
const About = ({ profile: { first_name, links, images, profiles }, profileImages }) => {
    const { address, phone, email, } = profiles ? profiles[0] : {}
    const profile_img = profileImages.length > 0 ? profileImages[0].profile_img : '';
    return (
        <section id="about" className="about">
            <div className="container" data-aos="fade-up" data-aos-delay="200">
                <div className="section-title">
                    <h2>About</h2>
                </div>
                <div>
                    <p>Using best development methodology to deliver web application solutions, I design and build web applications that will meet specific client's needs. I offer a full compliment of Python related services including: design, development, upgrades, support and maintenance.</p>
                    
                    <h4 className='mt-4'>My Objective</h4>
                    <p>
                        To obtain a position as a web application developer; specifically with django, in a fun, fast paced, cutting edge environment that promotes teamwork and integrity and that fosters personal and professional development.</p>
                </div>
                <div className="row">
                    <div className="col-lg-4 p-3" style={{
                        backgroundImage: profile_img ? `url("${profile_img}")` : '',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'top right',
                        height: "380px"
                    }} data-aos="fade-right" data-aos-delay="400">
                    </div>
                    <div className="col-lg-8 pt-4 pt-lg-0 content">
                        <h3>Django Fullstack Web Developer.</h3>
                        <p className="fst-italic">For all projects related to<code className='fs-6'> Python, Django, Django REST, ReactRedux, ReactJS, React-Native, Vanilla JS, HTML, Bootstrap</code> and<code className='fs-6'> CSS </code> feel free to contact me.</p>
                        <div className="row">
                            <div className="col-lg-6">
                                <ul>
                                    <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong>
                                        <span>{phone}</span>
                                    </li>
                                    <li><i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>{address}</span></li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <ul>
                                    <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>{email}</span></li>
                                    <li><i className="bi bi-chevron-right"></i> <strong>Upwork:</strong> <span>Available</span></li>
                                </ul>
                            </div>
                        </div>
                        <p>
                            For more than three years as django web developer, I am self-assured individual with enough experience to offer. Flexible and poised promoting well-developed skills in Full-stack Development, acquired through high level training in various technology envirionments.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default About;