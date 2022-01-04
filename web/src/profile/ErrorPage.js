import React, { Component } from 'react'
import NotFound from './notFound'
import { ProfileConsumer } from '../contextApi';
export default class ErrorPage extends Component {
    render() {
        console.log(this.props);
        const { status, statusText, info } = this.props;
        return (
            <div className="container" style={{ maxHeight: '100vh', overflow: 'hidden' }}>
                <section id="error-404" className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <h1>{status}</h1>
                    <h2>{statusText}</h2>
                    <code className="text-danger">{info}</code>
                    {/* <a className="btn" href="index.html">Back to home</a> */}
                    <NotFound />
                </section>
            </div>
        )
    }
}
