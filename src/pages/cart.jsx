import React from 'react';
import CartProduct from '../components/cart/cart_product';
import {
    updateCart,
    updateSum,
    updateFuckingCrutch,
    engineLoaderMazaFucker,
} from '../store/action_creatores';
import { connect } from 'react-redux';
import Spinner from "../components/spinner";
import * as PropTypes from 'prop-types';

CartPage.propTypes = {
    cart: PropTypes.array,
    catalog: PropTypes.array,
    catalogLoading: PropTypes.bool,
    engineLoaderMazaFucker: PropTypes.func,
    fuckingCrutch: PropTypes.bool,
    sum: PropTypes.number,
    updateCart: PropTypes.func,
    updateFuckingCrutch: PropTypes.func,
    updateSum: PropTypes.func,
};

function CartPage(props) {

    const {
        cart,
        catalog,
        catalogLoading,
        engineLoaderMazaFucker,
        fuckingCrutch,
        sum,
        updateCart,
        updateFuckingCrutch,
        updateSum,
    } = props;

    let newSum = sum;

    if (fuckingCrutch) { // по-хорошему можно было бы запускать итерируемый рендер для одного товара, но сервер редиска и такого нам не позволяет
        engineLoaderMazaFucker("catalog"); // я уже объяснял, на кой хер эти танцы с тамбуринами, на странице src/pages/home,
        updateFuckingCrutch(false); // так что не вижу смысла повторяться. И вообще, я устал и хочу нормального секса с живой женщиной, а не этого вот.
    };

    if (catalogLoading) {
        return (<Spinner />);
    };

    SumCounter(); // вычислять сумму покупок лучше на сервере. А то мало ли, что юзер в локалсторожа запишет. Локалсторож - чисто хомячью для удобства.

    function SumCounter() { // вычисляем сумму всех покупок
        newSum = 0;
        for (let i = 0; i < cart.length; i++) {
            for (let j = 0; j < catalog.length; j++) {
                if (cart[i].item === catalog[j].id) {
                    let curSum = catalog[j].price * cart[i].amount;
                    newSum = + newSum + curSum;
                };
            };
        };
        updateSum(newSum); // обновляем сумму в state
    };

    const handlerCartQuantity = (operator, ident) => { // раньше это была не константа, а функция (some sort eggs)

        if (operator === "plus") { // увеличиваем количество товара
            let currentItem = catalog.find(elem => elem.id === ident)
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].item === ident) {
                    if (cart[i].amount < Number(currentItem.available)) {
                        cart[i].amount++;
                        updateCart(cart);
                    } else {
                        alert(`НА СКЛАДЕ ВСЕГО ${currentItem.available} ТАКИХ ТОВАРОВ!`);
                    };
                };
            };
        } else { // уменьшаем количество товара
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].item === ident) {
                    if (cart[i].amount > 1) {
                        cart[i].amount--;
                        updateCart(cart);
                    } else {
                        cart.splice(i, 1);
                        updateCart(cart);
                    };
                };
            };
        };
        localStorage.setItem(`cartInfo`, JSON.stringify(cart)); // обновляем локалсторож
    };

    return (
        <div className="cart-table-area section-padding-100">
            <div className="container-fluid">
                <div className="row">

                    <div className="col-12 col-lg-8">
                        <div className="cart-title mt-50">
                            <h2>Shopping Cart</h2>
                        </div>
                        <div className="cart-table clearfix">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <CartProduct
                                        cart={cart}
                                        catalog={catalog}
                                        onChange={handlerCartQuantity} />

                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* выводим стоимость всех товаров */}
                    <div className="col-12 col-lg-4">
                        <div className="cart-summary">
                            <h5>Cart Total</h5>
                            <ul className="summary-table">
                                <li><span>subtotal:</span> <span>${newSum}</span></li>
                                <li><span>delivery:</span> <span>Free</span></li>
                                <li><span>total:</span> <span>${sum}</span></li>
                            </ul>
                            <div className="cart-btn mt-100">
                                <a href="cart.html" className="btn amado-btn w-100">Checkout</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        sum: store.app.sum,
        cart: store.app.cart,
        catalog: store.app.catalog.data,
        catalogLoading: store.app.isLoading.catalog || false,
        fuckingCrutch: store.app.fuckingCrutch,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (array) => dispatch(updateCart(array)),
        updateSum: (number) => dispatch(updateSum(number)),
        engineLoaderMazaFucker: (actions) => dispatch(engineLoaderMazaFucker(actions)),
        updateFuckingCrutch: (bool) => dispatch(updateFuckingCrutch(bool)),
    };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(CartPage));