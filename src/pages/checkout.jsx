import React from 'react';
import CheckoutDetails from '../components/checkout/checkout_details';
import CheckoutCartSummary from '../components/checkout/checkout_cart_summary';

function CheckoutPage(props) {

    return (
        <>
            <div className="cart-table-area section-padding-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <div className="checkout_details_area mt-50 clearfix">
                                <div className="cart-title">
                                    <h2>Checkout</h2>
                                </div>

                                <CheckoutDetails />

                            </div>
                        </div>

                        <CheckoutCartSummary />

                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(CheckoutPage);