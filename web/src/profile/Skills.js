import React, { Component } from 'react'
import { ProfileConsumer } from '../contextApi';
export default class Skills extends Component {
    render() {
        return (
            <section id="skills" className="skills section-bg">
                <div className="container">
                    <div className="section-title">
                        <h2>Skills</h2>
                    </div>
                    <div>
                        <p>By hobby I learnt and became full stack web developer which i doupt a college degree can easily offer. I started by picking up straight python courses and later started learning Django in 2018. There are different tutorials in youtube and free books to start learning Django from scratch, only if you have basic knowledge in python.</p>
                        <p>I can't say Django is the only framework to create web apps but its the most easiet to learn in shortest time possible.</p>
                    </div>
                    <div className="row skills-content">
                        <div className="col-lg-8">
                            <div className="progress">
                                <span className="skill">HTML <i className="val">100%</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className="progress">
                                <span className="skill">CSS <i className="val">100%</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className="progress">
                                <span className="skill">JavaScript <i className="val">95%</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" style={{ width: '95%' }} />
                                </div>
                            </div>
                            <div className="progress">
                                <span className="skill">ReactJS <i className="val">90%</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" style={{ width: '90%' }} />
                                </div>
                            </div>
                            <div className="progress">
                                <span className="skill">React-Native <i className="val">90%</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" style={{ width: '90%' }} />
                                </div>
                            </div>
                            <div className="progress">
                                <span className="skill">Python<i className="val">80%</i></span>
                                <div className="progress-bar-wrap">
                                    <div className="progress-bar" style={{ width: '80%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}