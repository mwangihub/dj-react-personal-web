import React from 'react'
import Social from './Social';
const Hero = ({ profile: { first_name, links }, profileImages }) => {
    const profile_img = profileImages.length > 0 ? profileImages[0].profile_img : '';
    return (
        <section id="hero" className="d-flex flex-column justify-content-center" style={{
            backgroundImage: profile_img ? `url("${profile_img}")` : '',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'top right',
        }}>
            <div className="container">
                <h1>{first_name ? first_name : ''}</h1>
                <Social {...links} />
            </div>
        </section>
    )
}
export default React.memo(Hero)