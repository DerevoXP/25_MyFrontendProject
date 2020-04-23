import React from 'react';
import { connect } from 'react-redux';
import Spinner from "../components/spinner";
import { Link } from 'react-router-dom';
import * as URL from '../router/url';
import * as PropTypes from 'prop-types';
import { engineLoaderMazaFucker, activeCarouselChanger, updateCart, updateSum, itemMemoryChecker } from '../store/action_creatores';

Product.propTypes = {
    catalog: PropTypes.array,
    categories: PropTypes.array,
    match: PropTypes.object,
    catalogLoading: PropTypes.bool,
    imageItemLoading: PropTypes.bool,
    revievItemLoading: PropTypes.bool,
    categoriesLoading: PropTypes.bool,
    singleImageItem: PropTypes.array,
    singleRevievItem: PropTypes.array,
    engineLoaderMazaFucker: PropTypes.func,
    activeCarouselChanger: PropTypes.func,
    activeImg: PropTypes.number,
    itemMemory: PropTypes.string,
    itemMemoryChecker: PropTypes.func,
    cart: PropTypes.array,
    sum: PropTypes.number,
    updateCart: PropTypes.func,
    updateSum: PropTypes.func,
};

function Product(props) { // возвращаем описание ОДИНОЧНОГО товара при клике на картинку товара в shop



    const {
        catalog,
        categories,
        match,
        catalogLoading,
        imageItemLoading,
        revievItemLoading,
        categoriesLoading,
        singleImageItem,
        singleRevievItem,
        engineLoaderMazaFucker,
        activeCarouselChanger,
        activeImg,
        itemMemory,
        itemMemoryChecker,
        cart,
        sum,
        updateCart,
        updateSum,
    } = props;

    let item = {};
    let catName; // для хлебных крошек
    let cartItemBayStatus = "В КОРЗИНУ"; // надпись на кнопке

    if (singleImageItem === undefined || itemMemory !== match.params.code) {
        itemMemoryChecker(match.params.code)
        engineLoaderMazaFucker("imageItem", `?cid=${match.params.code}`);
    };

    if (singleRevievItem === undefined || itemMemory !== match.params.code) {
        itemMemoryChecker(match.params.code)
        engineLoaderMazaFucker("revievItem", `?cid=${match.params.code}`);
    };

    if (imageItemLoading || catalogLoading || revievItemLoading || categoriesLoading) {
        return (<Spinner />);
    };

    if (!catalog.find(elem => elem.id === match.params.code)) {
        return (
            <h6 style={{
                margin: "50px",
                padding: "5px",
                color: "red",
                border: "solid red 2px",
                borderRadius: "5px",
                height: "fit-content",
            }}>ОШИБКА! <br />
            Товар с таким ID отсутствует в базе данных. <br />
            Купите себе лучше обычного гуся на обычном базаре <br />
            и не выносите мозг серверу, пожалуйста. <br />
            Спасибо.</h6>
        );
    };

    if (catalog && catalog.length) {
        for (let i = 0; i < catalog.length; i++) {
            if (catalog[i].id === match.params.code) {
                item = catalog[i];
                let crutch = catalog[i].category; // во избежание "Function declared in a loop contains unsafe references to variable..."
                let cat = categories.find(element => element.id === crutch);
                catName = cat.title;
            };
        };
    };

    function carouselleItemRender() { // генерируем карусель (эксклюзивно для стула "Грустный")
        if (singleImageItem && singleImageItem.length) {
            return singleImageItem.map((item, index) => {
                return (
                    <li className={index === activeImg ? "active" : ""} data-target="#product_details_slider" data-slide-to="0"
                        style={{ backgroundImage: `http://test-api.ipromote.ru/img/${item.img_url}` }}
                        key={item.id}
                    >
                        <img
                            className="d-block"
                            src={`http://test-api.ipromote.ru/img/${item.url}`}
                            alt="First slide"
                            onClick={() => activeCarouselChanger(index)}
                            style={{
                                height: "100%",
                                margin: "auto"
                            }}
                        />
                    </li>
                );
            })
        };
    };

    function singleItemRender() { // большая такая картинка во ввесь экран. Дёрганая при заюзе карусели. Грёбаный бутстрап.
        if (singleImageItem && singleImageItem.length) {
            let item = singleImageItem[activeImg];
            return (
                <img className="d-block w-100"
                    src={`http://test-api.ipromote.ru/img/${item.url}`}
                    alt="First slide" />
            );
        } else {
            return (
                <>ОШИБКА ЗАГРУЗКИ ИЗОБРАЖЕНИЯ</>
            )
        };
    };

    function revievRender() { // генерируем отзывы
        if (singleRevievItem && singleRevievItem.length) {
            return singleRevievItem.map((item) => {
                return (
                    <div
                        className="short_overview my-5"
                        key={item.id}>
                        <p>{item.user}</p>
                        <p>{item.title}</p>
                    </div>
                );
            });
        } else {
            return (
                <div className="short_overview my-5">
                    <p>Нет отзывов. Вообще. Выш отзыв мог бы быть первым, если бы разработчик добавил опцию "оставить отзыв". Можете пока поиграться с каруселью изображений: она эксклюзивно, хотя и несколько коряво, доступна для стула "Грустный" в категории, внезапно, "СТУЛЬЯ". Он там первый, красненький. Не ошибётесь, в общем.</p>
                </div>
            );
        };
    };

    function handleAddToCart(e) { // эту функцию пришлось продублировать, ибо я слищком туп, чтобы сделать красиво и слишком стеснителен, чтобы спросить, как правильно
        if (!cart.find(elem => elem.item === e.target.name)) {
            cart.push({ item: e.target.name, amount: 1 });
            updateCart(cart);
            updateSum(Number(e.target.getAttribute("price")) + Number(sum));
            localStorage.setItem(`cartInfo`, JSON.stringify(cart));
        };
    };

    for (let i = 0; i < cart.length; i++) { // функция удаления из корзины бесплатно доступна только из меню корзины. И ниипёт.
        if (cart.find(elem => elem.item === item.id)) {
            cartItemBayStatus = "ДОБАВЛЕНО!!!";
        };
    };

    //////////////////////////// ГЛАВНЫЙ РЕНДЕР /////////////////////////////////////////////////

    return (
        <div className="single-product-area section-padding-100 clearfix">
            <div className="container-fluid">

                {/* ХЛЕБНЫЕ КРОШКИ */}

                <div className="row">
                    <div className="col-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mt-50">
                                <li className="breadcrumb-item"><Link to={URL.HOME}>HOME</Link></li>
                                <li className="breadcrumb-item"><Link to={URL.SHOP}>SHOP</Link></li>
                                <li className="breadcrumb-item"><Link to={`${URL.SHOP}/${item.category}`}>{catName}</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{item.title}</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                {/* КАРУСЕЛЬ В ГАЛЕРЕЕ */}

                <div className="row">
                    <div className="col-12 col-lg-7">
                        <div className="single_product_thumb">
                            <div id="product_details_slider" className="carousel slide" data-ride="carousel">

                                <ol className="carousel-indicators">
                                    {carouselleItemRender()}
                                </ol>

                                <div className="carousel-inner">
                                    <div className="carousel-item active"
                                        style={{ heifht: "100%" }}
                                    >
                                        {singleItemRender()}
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    {/* АПИСАНИЕ ТАВАРА */}

                    <div className="col-12 col-lg-5">
                        <div className="single_product_desc">

                            <div className="product-meta-data">
                                <div className="line"></div>
                                <p className="product-price">${item.price}</p>
                                <h6>{item.title}</h6>


                                <div className="ratings-review mb-15 d-flex align-items-center justify-content-between">
                                    <div className="ratings">
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                    </div>
                                </div>

                                <p className="avaibility"><i className="fa fa-circle"></i> In Stock {item.available}</p>
                            </div>

                            <br />
                            <br />
                            <br />

                            <form className="cart clearfix">
                                <button
                                    className="btn amado-btn"
                                    name={item.id}
                                    onClick={(e) => { handleAddToCart(e) }}
                                >
                                    {
                                        cartItemBayStatus
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div>
                    <h6>ОТЗЫВЫ УПОРОТЫХ ПОКУПАТЕЛЕЙ:</h6>
                    {revievRender()}
                </div>

            </div>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        catalog: store.app.catalog.data,
        categories: store.app.categories.data,
        catalogLoading: store.app.isLoading.catalog || false,
        imageItemLoading: store.app.isLoading.imageItem || false,
        revievItemLoading: store.app.isLoading.revievItem || false,
        categoriesLoading: store.app.isLoading.categories || false,
        singleImageItem: store.app.singleImageItem.data,
        singleRevievItem: store.app.singleRevievItem.data,
        activeImg: store.app.activeImg,
        itemMemory: store.app.itemMemory,
        cart: store.app.cart,
        sum: store.app.sum,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        engineLoaderMazaFucker: (actions, key) => dispatch(engineLoaderMazaFucker(actions, key)),
        activeCarouselChanger: (number) => dispatch(activeCarouselChanger(number)),
        updateCart: (array) => dispatch(updateCart(array)),
        updateSum: (number) => dispatch(updateSum(number)),
        itemMemoryChecker: (number) => dispatch(itemMemoryChecker(number)),
    };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Product));