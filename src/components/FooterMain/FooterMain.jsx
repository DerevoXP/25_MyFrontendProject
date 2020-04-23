import React from 'react';
import logo from '../../assets/img/core-img/logo2.png';
import { Link } from 'react-router-dom';
import * as URL from '../../router/url';

function FooterMain(props) {

    return (
        <footer className="footer_area clearfix">
            <div className="container">
                <div className="row align-items-center">



                    <div className="col-12 col-lg-4">
                        <div className="single_widget_area">
                            <div className="footer-logo mr-50">
                                <Link to={URL.HOME}><img src={logo} alt="AmadO Furniture™" /></Link>
                            </div>
                            <p className="copywrite">
                                Copyright &copy;
                                All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i>
                                by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
                            </p>
                        </div>
                    </div>



                    <div className="col-12 col-lg-8">
                        <div className="single_widget_area">
                            <div className="footer_menu">
                                <nav className="navbar navbar-expand-lg justify-content-end">
                                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#footerNavContent" aria-controls="footerNavContent"
                                        aria-expanded="false" aria-label="Toggle navigation"><i
                                            className="fa fa-bars"></i></button>
                                    <div className="collapse navbar-collapse" id="footerNavContent">
                                        <ul className="navbar-nav ml-auto">
                                            <li className="nav-item active">
                                                <Link to={URL.HOME} className="nav-link">Home</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={URL.SHOP} className="nav-link">Shop</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={URL.CART} className="nav-link">Cart</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={URL.CHECKOUT} className="nav-link">Checkout</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </footer>
    );
}

export default React.memo(FooterMain);