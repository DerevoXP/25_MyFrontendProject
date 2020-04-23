import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateItemOnPage, updateSortOnPage } from '../../store/action_creatores';

DropDown.propTypes = {
    itemsOnPage: PropTypes.string,
    sortOnPage: PropTypes.string,
    title: PropTypes.string.isRequired, // лэйбл выпадашки
    name: PropTypes.string,
    updateItemOnPage: PropTypes.func,
    updateSortOnPage: PropTypes.func,
};

function DropDown(props) {

    const [isOpened, setIsOpened] = useState(false); // вопрос "Нах...я так делать?" остаётся открытым. Экономии строчек кода ради, мэйби?

    const {
        itemsOnPage,
        sortOnPage,
        title,
        name,
        updateItemOnPage,
        updateSortOnPage,
    } = props;

    const sortOnPageList = ['Date', 'Newest', 'Popular'];
    const vievOnPageList = ['4', '8', '12'];
    let current;
    let lable;

    if (title === "Viev") {
        current = vievOnPageList
        lable = itemsOnPage
    } else {
        current = sortOnPageList
        lable = sortOnPage
    };

    function renderOptions() {
        return (
            <ul className="list">
                {
                    current.map((item, index) => {
                        return (
                            <li
                                key={current[index]}
                                data-id={index}
                                className={`option ${current === index && 'selected'}`}
                                onClick={(e) => { handleChange(e) }}
                            >
                                {item}
                            </li>
                        )
                    }
                    )
                }
            </ul>
        )
    };

    const handleChange = (e) => { // меняем сортирующий элемент по клику на потомке
        const index = e.target.getAttribute("data-id");
        if (name === "sortBy") {
            updateSortOnPage(sortOnPageList[index]);
        } else if (name === "Viev") {
            updateItemOnPage(vievOnPageList[index]);
        };
    };

    function handleClick(e) {

        setIsOpened(!isOpened);
    };

    return (
        <div className=" sort-by-date d-flex align-items-center mr-15">
            <p>{title}</p>
            <form action="#" method="get">
                <div
                    className={`nice-select ${isOpened && "open"}`}
                    tabIndex="0"
                    onClick={handleClick}
                >
                    <span className="current">
                        {lable}
                    </span>
                    {
                        renderOptions()
                    }
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        itemsOnPage: store.app.itemsOnPage,
        sortOnPage: store.app.sortOnPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateItemOnPage: (string) => dispatch(updateItemOnPage(string)),
        updateSortOnPage: (string) => dispatch(updateSortOnPage(string)),
    };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(DropDown));