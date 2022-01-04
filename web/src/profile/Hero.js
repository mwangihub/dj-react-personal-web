import React, { Component } from 'react'
import { ProfileConsumer } from '../contextApi'
import Social from './Social';

class Hero extends Component {

    render() {
        // console.log(this.props.data);
        let data = this.props.data;
        // const profile = data ? data.profiles[0] : {}
        const links = data ? data.links : {}
        return (
            <section id="hero" className="d-flex flex-column justify-content-center">
                <div className="container">
                    <h1>{data ? data.first_name : ''}</h1>
                    <Social {...links}/>
                </div>
            </section>
        )
    }
}


export default Hero