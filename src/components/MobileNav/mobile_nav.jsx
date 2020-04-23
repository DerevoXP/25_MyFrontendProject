import React from 'react';
import image from '../../assets/img/core-img/logo.png';


function MobileNav(props) {

    return (
        <div className="mobile-nav">
            <div className="amado-navbar-brand">
                <a href="index.html"><img src={image} alt="" /></a>
            </div>
            <div className="amado-navbar-toggler">
                <span></span><span></span><span></span>
            </div>
        </div>
    );
}

export default React.memo(MobileNav);