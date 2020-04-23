import React from 'react';
import Spinner from '../../spinner';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { engineLoaderMazaFucker, paginatorEngine } from '../../../store/action_creatores';

function WidBrands(props) {

    function brandHandler(e) { // обновляем каталог товаров на основании фильтров по брендам
        props.paginatorEngine("0"); // сбрасываем страницу на первую при изменении фильтра цветов
        if (e.target.getAttribute("ident") === "ALL") {
            props.engineLoaderMazaFucker("catalog");
        } else {
            props.engineLoaderMazaFucker("catalog", `?brand=${e.target.getAttribute("ident")}`);
        };
    };

    function brandsCheckboxGenerator() { // генерируем чекбоксы на основе информации о брендах с сервера

        if (props.brandsLoading) {
            return (<Spinner />);
        };

        return props.brands.map((item) => {

            return (
                <div className="form-check"
                    key={item.id}
                >
                    <input
                        onChange={brandHandler}
                        className="form-check-input"
                        type="radio"
                        name="brandFilter"
                        ident={item.id}
                        id={item.title}
                        defaultChecked={false}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={item.title}>
                        {item.title}
                    </label>
                </div>
            )
        })
    };

    return (
        <div className="widget brands mb-50">
            <h6 className="widget-title mb-30">Brands</h6>

            <div className="widget-desc">

                {/* верхний чекбокс "ALL" по-умолчанию */}

                <div className="form-check">
                    <input
                        onChange={brandHandler}
                        className="form-check-input"
                        type="radio"
                        name="brandFilter"
                        ident="ALL"
                        id="ALL"
                        defaultChecked={true}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="ALL">
                        ALL
                    </label>
                    <br />
                </div>

                {brandsCheckboxGenerator()}

            </div>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        brands: store.app.brands.data,
        brandsLoading: store.app.isLoading.brands || false,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        engineLoaderMazaFucker: (actions, key) => dispatch(engineLoaderMazaFucker(actions, key)),
        paginatorEngine: (string) => dispatch(paginatorEngine(string)),
    };
};

WidBrands.propTypes = {
    brands: PropTypes.array,
    brandsLoading: PropTypes.bool,
    engineLoaderMazaFucker: PropTypes.func,
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(WidBrands));