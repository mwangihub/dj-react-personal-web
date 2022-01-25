import React from 'react';
const menuIcon = e => {
    let el = e.target;
    document.querySelector("body").classList.toggle('mobile-nav-active')
    el.classList.toggle('bi-list')
    el.classList.toggle('bi-x')
}
const MenuIcon = () => {
    return (
        <>
            <i className="bi bi-list mobile-nav-toggle d-xl-none fs-2 fw-bold" onClick={e => menuIcon(e)} />
        </>
    );
};

export default MenuIcon;
