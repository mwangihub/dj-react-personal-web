import React, { Component } from 'react';
class Social extends Component {
    render() {
        const { github, skype, twitter } = this.props;
        return (
            <div className="social-links">
                <a href={`${twitter}`} target="_blank" className="twitter" rel="noopener noreferrer"><i className="bx bxl-twitter"></i></a>
                <a href={`${skype}`} className="google-plus"><i className="bx bxl-skype" rel="noopener noreferrer"></i></a>
                <a href={`${github}`}  target="_blank" className="google-plus" rel="noopener noreferrer" ><i className="bx bxl-github"></i></a>
            </div>
        )
    }
}

export default Social;
