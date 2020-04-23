import React from 'react';
import Spinner from "../spinner";
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { paginatorEngine } from '../../store/action_creatores';

Paginator.propTypes = {
    catalog: PropTypes.array,
    itemCode: PropTypes.string,
    itemsOnPage: PropTypes.string,
    pagination: PropTypes.string,
    paginatorEngine: PropTypes.func,
    priceFilter: PropTypes.array,
};

function Paginator(props) {

    const {
        catalog,
        itemCode,
        itemsOnPage,
        pagination,
        priceFilter,
        paginatorEngine,
        catalogLoading,
    } = props;

    let allItemCounter = 0; // счётчик ВСЕХ товаров, подходящих под фильтры для пагинации

    if (catalogLoading) {
        return (<Spinner />);
    };

    for (let i = 0; i < catalog.length; i++) { // вычислятор необходимого кол-ва кнопок для листания страниц
        if (
            catalog[i].category === itemCode // фильтр по категориям
            && priceFilter[0] <= catalog[i].price // вилка фильтра > по цене
            && priceFilter[1] >= catalog[i].price // вилка фильтра < по цене
        ) {
            allItemCounter++;
        };
    };

    let pageCount = Math.ceil(allItemCounter / itemsOnPage); // кол-во страниц

    let pagesNumbersArray = []; // генерируем массив с номерами страниц для paginatorRender
    for (let i = 0; i < pageCount; i++) {
        pagesNumbersArray.push(i + 1);
    };

    function paginatorRender() {

        return pagesNumbersArray.map((item, index) => {
            return (
                <li className={index === Number(pagination) ? "page-item active" : "page-item"}
                key={item}
                >
                    <button className="page-link"
                        name={index}
                        onClick={(e) => { paginatorEngine(e.target.getAttribute("name")) }}
                        style={{
                            width: "40px",
                            height: "40px",
                            border: "none",
                            fontSize: "16px",
                            fontWeight: "400",
                            lineHeight: "40px",
                            padding: "0",
                            textAlign: "center",
                            color: "#242424",
                        }}
                    >
                        {item}
                    </button>
                </li>
            )
        })
    };

    return (
        <div className="row">
            <div className="col-12">
                <nav aria-label="navigation">
                    <ul className="pagination justify-content-end mt-50">
                        {
                            paginatorRender()
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        catalog: store.app.catalog.data,
        pagination: store.app.pagination, // хз, где лучше приведением типов заниматься... Лучше б вообще мешанины не допускать.
        itemsOnPage: store.app.itemsOnPage,
        priceFilter: store.app.priceFilter,
        catalogLoading: store.app.isLoading.catalog || false,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        paginatorEngine: (number) => dispatch(paginatorEngine(number)),
    };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Paginator));