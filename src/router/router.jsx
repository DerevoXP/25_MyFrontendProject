import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as URL from './url';

const HomePage = lazy(() => import('../pages/home'));
const ShopPageUnique = lazy(() => import('../pages/shop'));
const ProductPage = lazy(() => import('../pages/singleProduct'));
const CartPage = lazy(() => import('../pages/cart'));
const CheckoutPage = lazy(() => import('../pages/checkout'));


export default (
	<Switch>
		<Route exact path={URL.START} component={HomePage} />
		<Route exact path={URL.HOME} component={HomePage} />
		<Route exact path={URL.SHOP} component={ShopPageUnique} />
		<Route exact path={URL.SHOP_CODE} component={ShopPageUnique} />
		<Route exact path={URL.PRODUCT} component={ProductPage} />
		<Route exact path={URL.PRODUCT_CODE} component={ProductPage} />
		<Route exact path={URL.CART} component={CartPage} />
		<Route exact path={URL.CHECKOUT} component={CheckoutPage} />
	</Switch>
);