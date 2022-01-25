import React from 'react'

const Resume = ({ profile: { first_name, profiles } }) => {
    const { address, phone, email, } = profiles ? profiles[0] : {}
    return (
        <section id="resume" className="resume">
            <div className="container " data-aos="fade-up">
                <div className="section-title">
                    <h2>Resume</h2>
                    <p>Skilled at delivery and maintenance of web software and accustomed to functioning within a team of top-performing developers and IT support experts.</p>
                </div>
                <div className="row resume-content">
                    <div className="col-lg-8">
                        <h3 className="resume-title">Sumary</h3>
                        <div className="resume-item pb-0">
                            <h4>{ first_name }</h4>
                            <p><em>With three years of Learning and practising web development, I am confident that Django is the best framework used in designing quality web application with deadline.</em></p>

                            <ul>
                                <li>{address}</li>
                                <li>{phone}</li>
                                <li>{email}</li>
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
export default React.memo(Resume)