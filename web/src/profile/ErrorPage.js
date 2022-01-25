import React, { Component } from 'react'
import NotFound from './notFound'
export default class ErrorPage extends Component {
    refreshPage = () => {
        window.location.reload()
    }
    render() {
        const { status, statusText, info } = this.props;
        return (
            <div className="container" style={{ maxHeight: '100vh', overflow: 'hidden' }} data-aos="fade-up">
                <section id="error-404" className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <h1>{status}</h1>
                    <h2>{statusText}</h2>
                    <code className="text-danger">{info}</code>
                    <button className="btn btn-sm mt-2 px-5" onClick={e => this.refreshPage()}>Refresh</button>
                    <NotFound />
                </section>
            </div>
        )
    }
}
