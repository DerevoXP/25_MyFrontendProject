import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { engineLoaderMazaFucker, updateCart } from './store/action_creatores'; // для пропсов
import pageElements from './router/router'; // это все загружаемые страницы из роутера
import Spinner from './components/spinner';
import MobileNav from './components/MobileNav/mobile_nav';
import HeaderMain from './components/HeaderMain/HeaderMain';
import NewsletterMain from './components/NewsletterMain/NewsletterMain';
import FooterMain from './components/FooterMain/FooterMain';

class App extends React.Component {

    componentDidMount() {

        this.props.engineLoaderMazaFucker("catalog");
        this.props.engineLoaderMazaFucker("brands");
        this.props.engineLoaderMazaFucker("colors");
        this.props.engineLoaderMazaFucker("prices");
        this.props.engineLoaderMazaFucker("categories");

        if (localStorage.length === 0) {
            localStorage.setItem(`cartInfo`, JSON.stringify([])); // если новая машина и локалсторож пуст
        } else {
            this.props.updateCart(JSON.parse(localStorage.getItem('cartInfo'))); // иначе копируем корзину локалсторожа в state
        }       
    }

    render() {
        return (
            <BrowserRouter>
                <div className="main-content-wrapper d-flex clearfix">
                    <MobileNav />
                    <HeaderMain />
                    <Suspense fallback={<Spinner />}>
                        { pageElements }
                    </Suspense>
                </div>
                <NewsletterMain />
                <FooterMain />
            </BrowserRouter>
        );
    }
};

const mapStateToProps = (store) => {
    return {
        // в душе не пенетрирую, почему оно ничего не ретурнит, но если его закомментить, то всё сыпется.
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        engineLoaderMazaFucker: (actions) => dispatch(engineLoaderMazaFucker(actions)),
        updateCart: (cart) => dispatch(updateCart(cart)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);