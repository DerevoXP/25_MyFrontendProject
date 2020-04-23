import React from 'react';
import image from '../../assets/img/core-img/paypal.png';

function CheckoutCartSummary(props) {

    return (
        <div className="col-12 col-lg-4">
            <div className="cart-summary">

                <h5>Cart Total</h5>

                <ul className="summary-table">
                    <li><span>subtotal:</span> <span>$140.00</span></li>
                    <li><span>delivery:</span> <span>Free</span></li>
                    <li><span>total:</span> <span>$140.00</span></li>
                </ul>

                <div className="payment-method">

                    <div className="custom-control custom-checkbox mr-sm-2">
                        <input type="checkbox" className="custom-control-input" id="cod" checked />
                        <label className="custom-control-label" htmlFor="cod">Cash on Delivery</label>
                    </div>

                    <div className="custom-control custom-checkbox mr-sm-2">
                        <input type="checkbox" className="custom-control-input" id="paypal" />
                        <label className="custom-control-label" htmlFor="paypal">Paypal <img className="ml-15" src={image} alt="" /></label>
                    </div>

                </div>

                <div className="cart-btn mt-100">
                    <button className="btn amado-btn w-100">Checkout</button>
                </div>

            </div>
        </div>
    );
}

export default React.memo(CheckoutCartSummary);