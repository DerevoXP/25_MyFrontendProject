// npm install --save rc-slider // устанавливаем библиотеку слайдера, потому что мы {вписать нужное}, чтоб родить её самостоятельно
import React from 'react';
import Spinner from '../../spinner';
import { connect } from 'react-redux';
import { updatePriceFilter } from '../../../store/action_creatores';
import * as PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';

function WidPrice(props) {

    if (props.pricesLoading) {
        return (<Spinner />);
    };

    const {
        priceMin,
        priceMax,
    } = props.prices[0]

    const priceFilter = props.priceFilter;

    let mine = priceFilter[0];
    let maxe = priceFilter[1];

    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);

    function sliderChange(e) {
        mine = e[0];
        maxe = e[1];
    }

    function checkerModify() {
        props.updatePriceFilter([mine, maxe])
    }

    return (
        <div className="widget price mb-50">
            <h6 className="widget-title mb-30">Price</h6>

            <div className="widget-desc">
                <div className="slider-range">

                    <div>
                        <div
                            onMouseLeave={(e) => checkerModify(e)} // это пиздец, товарищи
                            onMouseUp={(e) => checkerModify(e)} // и это тоже пиздец. ИМХО
                        >
                            <Range
                                min={parseInt(priceMin)}
                                max={parseInt(priceMax)}
                                defaultValue={[`${priceFilter[0]}`, `${priceFilter[1]}`]}
                                tipFormatter={value => `${value}$`}
                                onChange={(e) => sliderChange(e)}

                            />
                        </div>
                    </div>

                    <div className="range-price">
                        ${priceFilter[0]} - ${priceFilter[1]}
                    </div>

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (store) => {
    return {
        prices: store.app.prices.data,
        priceFilter: store.app.priceFilter,
        pricesLoading: store.app.isLoading.prices || false,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePriceFilter: (array) => dispatch(updatePriceFilter(array)),
    };
};

WidPrice.propTypes = {
    prices: PropTypes.array,
    pricesLoading: PropTypes.bool,
    priceFilter: PropTypes.array,
    updatePriceFilter: PropTypes.func,
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(WidPrice));