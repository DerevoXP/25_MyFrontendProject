import React from 'react';
import * as PropTypes from 'prop-types';
import * as URL from '../../router/url';
import { Link } from 'react-router-dom';

CartProduct.propTypes = {
    cart: PropTypes.array,
    catalog: PropTypes.array,
    onChange: PropTypes.func,
};

function CartProduct(props) {

    const {
        cart,
        catalog,
        onChange,
    } = props;

    let image;
    let title;
    let price;
    let quantity; // кол-во товара в корзине (default=1)
    let id;
    let key;

    function CartQuantity(e) { // передаём в родителя значение кликнутого элемента
        const operator = e.currentTarget.getAttribute("operator");
        const ident = e.currentTarget.getAttribute("ident");
        onChange(operator, ident);
    }

    return cart.map((item) => { // генерим товары на основании количества записей в store-cart

        quantity = item.amount;

        for (let i = 0; i < catalog.length; i++) {
            if (catalog[i].id === item.item) {
                image = catalog[i].img_url;
                title = catalog[i].title;
                price = catalog[i].price;
                id = catalog[i].id;
                key = catalog[i].id
            };
        };

        return (
            <tr key={key}>
                <td className="cart_product_img">
                    <Link to={`${URL.PRODUCT}/${id}`}>
                        <img src={`http://test-api.ipromote.ru/img/${image}`} alt="Product" />
                    </Link>
                </td>

                <td className="cart_product_desc">
                    <h5>{title}</h5>
                </td>

                <td className="price">
                    <span>${price}</span>
                </td>

                <td className="qty">
                    <div className="qty-btn d-flex">
                        <p>Qty</p>

                        <div className="quantity">

                            {/* кнопка минуса */}
                            <span className="qty-minus"
                                onClick={CartQuantity}
                                operator="minus"
                                ident={id}>
                                <i
                                    className="fa fa-minus"
                                    aria-hidden="true"
                                >
                                </i>
                            </span>

                            {/* индикатор количества товаров */}
                            <input
                                type="number"
                                className="qty-text"
                                value={quantity}
                                style={{ userSelect: "none" }}
                                readOnly={true}
                            />


                            {/* кнопка плюса */}
                            <span
                                className="qty-plus"
                                onClick={CartQuantity}
                                operator="plus"
                                ident={id}>
                                <i
                                    className="fa fa-plus"
                                    aria-hidden="true"
                                >
                                </i>
                            </span>

                        </div>
                    </div>
                </td>
            </tr>
        )
    });
};

export default React.memo(CartProduct); // этим пользуется компонент src/pages/cart.jsx