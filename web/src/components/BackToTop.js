import React, { useState } from 'react';

const BackToTop = () => {
    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 100) {
            setVisible(true)
        }
        else if (scrolled <= 100) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    window.addEventListener('scroll', toggleVisible);
    return (
        <>
            { visible?
                <p className="back-to-top d-flex align-items-center justify-content-center active" onClick={scrollToTop}>
                    <i className="bi bi-arrow-up-short" />
                </p>
                :
                ''
            }
        </>

    );
}

export default BackToTop;