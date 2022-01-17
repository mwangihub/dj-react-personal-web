import React, { Component } from 'react'
import Api from '../Api'

const contactDetails = (address, email, phone) => {
    return (
        <div className="col-lg-4">
            <div className="info">
                <div className="address">
                    <i className="bi bi-geo-alt"></i>
                    <h4>Location:</h4>
                    <p>{address}</p>
                </div>
                <div className="email">
                    <i className="bi bi-envelope"></i>
                    <h4>Email:</h4>
                    <p>{email}</p>
                </div>
                <div className="phone">
                    <i className="bi bi-phone"></i>
                    <h4>Call:</h4>
                    <p>{phone}</p>
                </div>
            </div>
        </div>
    )
}
const innitialState = {
    loading: false,
    error: false,
    sent: false
}
export default class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...innitialState
        }
    }

    sendContactMessage = event => {
        event.preventDefault();
        let data = {
            'email': event.target.email.value,
            'name': event.target.name.value,
            'message': event.target.message.value
        }
        event.target.reset();
        this.setState({ loading: true });
        Api.sendMessages(data)
            .then(r => {
                if (r.status === 201) {
                    this.setState({ sent: true, error: false, loading: false }, () => {
                        setTimeout(() => {
                            this.setState({ sent: false });
                        }, 3000);
                    })
                } else {
                    this.setState({ error: true, sent: false, loading: false }, () => {
                        setTimeout(() => {
                            this.setState({ error: false })
                        }, 3000);
                    })
                }
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Another error occured when sending Message");
                }
            });
    }
    render() {
        const { profile: { profiles } } = this.props
        const { address, phone, email, } = profiles ? profiles[0] : {}
        const { loading, error, sent } = this.state;
        return (
            <section id="contact" className="contact">
                <div className="container">
                    <div className="section-title">
                        <h2>Contact</h2>
                    </div>
                    <div className="row mt-1">
                        {contactDetails(address, email, phone)}
                        <div className="col-lg-8 mt-5 mt-lg-0">
                            <form method="POST" className="php-email-form" onSubmit={e => this.sendContactMessage(e)} action='.'>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                                    </div>
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                        <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                                </div>
                                {
                                    loading ?
                                        <div className="loading">Loading</div> :
                                        sent ?
                                            <div className="sent-message">Your message has been sent. Thank you!</div> :
                                            error ?
                                                <div className="error-message">Internal server error!</div> :
                                                <div className="text-center"><button type="submit">Send Message</button></div>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}