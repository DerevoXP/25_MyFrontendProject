import React from 'react';
import { Link } from 'react-router-dom';
import * as URL from '../../router/url';
import { withRouter } from 'react-router';
import * as PropTypes from 'prop-types';

AmadoNav.propTypes = {
    location: PropTypes.object,
};

function AmadoNav(props) { // рендер боковых кнопок навигации по основным страницам

    const { location } = props;

    const menuElems = [
        {
            name: "Home",
            url: URL.HOME,
        },
        {
            name: "Shop",
            url: URL.SHOP,
        },
        {
            name: "Cart",
            url: URL.CART,
        },
        {
            name: "Checkout",
            url: URL.CHECKOUT,
        },
    ];

    return (
        <nav className="amado-nav">
            <ul>
                {
                    menuElems.map((item) => {
                        return (
                            <li key={item.name}
                                className={location.pathname.includes(item.url) ? "active" : "false"}>
                                <Link to={item.url}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        )
                    }
                    )
                }
            </ul>
        </nav>
    );
};

export default React.memo(withRouter(AmadoNav));
