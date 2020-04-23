import React from 'react';
import WidCategory from './left_components/wid_category';
import WidBrands from './left_components/wid_brands';
import WidColor from './left_components/wid_color';
import WidPrice from './left_components/wid_price';

function ShopSidebar() {

    return (
        <div className="shop_sidebar_area">
            <WidCategory />
            <WidBrands/>
            <WidColor />
            <WidPrice />
        </div>
    );
};

export default React.memo(ShopSidebar);