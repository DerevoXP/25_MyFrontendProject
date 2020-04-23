import React from 'react';
import image from '../../assets/img/core-img/logo.png';
import AmadoNav from './amado_nav';
import CartMenu from './cart_menu';
import { Link } from 'react-router-dom';
import * as URL from '../../router/url';

function HeaderMain(props) {

    return (
        <header className="header-area clearfix">
            <div className="nav-close">
                <i className="fa fa-close" aria-hidden="true"></i>
            </div>

            <div className="logo">
                <Link to={URL.HOME}><img src={image} alt="AmadO Furniture™" /></Link>
            </div>

            <AmadoNav />

            <div className="amado-btn-group mt-30 mb-100">
                <button className="btn amado-btn mb-15">%Discount%</button>
                <button className="btn amado-btn active">New this week</button>
            </div>

            <CartMenu />
            <div className="social-info d-flex justify-content-between">
                <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer"> <i className="fa fa-pinterest" aria-hidden="true"></i></a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> <i className="fa fa-instagram" aria-hidden="true"></i></a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"> <i className="fa fa-facebook" aria-hidden="true"></i></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> <i className="fa fa-twitter" aria-hidden="true"></i></a>
            </div>
        </header>
    );
}

export default React.memo(HeaderMain);