import * as Actions from './actions';

export function loadCatalog(payload) { // загрузка каталога
	return {
		type: Actions.LOAD_CATALOG,
		payload,
	};
};

export function loadPrices(payload) { // загрузка цен (так-то нах не нужна - бо есть в каталоге по дефолту, бат лет ит би, хуле)
	return {
		type: Actions.LOAD_PRICES,
		payload,
	};
};

export function loadCategories(payload) { // загрузка категорий товара для фильтра components/ShopSidebar/left_components/wid_category
	return {
		type: Actions.LOAD_CATEGORIES,
		payload,
	};
};

export function loadColors(payload) { // загрузка цветов для фильтра components/ShopSidebar/left_components/wid_color
	return {
		type: Actions.LOAD_COLORS,
		payload,
	};
};

export function loadBrands(payload) { // загрузка брендов для фильтра components/ShopSidebar/left_components/wid_brands
	return {
		type: Actions.LOAD_BRANDS,
		payload,
	};
};

export function updateLoading(payload) { // отслеживание процесса загрузки с сервера
	return {
		type: Actions.UPDATE_LOADING,
		payload,
	};
};

export function updateSortOnPage(payload) { // сортировка отображаемых элементов в shop (Sort By)
	return {
		type: Actions.UPDATE_SORT_ON_PAGE,
		payload,
	};
};

export function updateItemOnPage(payload) {  // кол-во отображаемых элементов в shop (Viev)
	return {
		type: Actions.UPDATE_ITEM_ON_PAGE,
		payload,
	};
};

export function updateCart(payload) { // изменение содержимого корзины пользователя
	return {
		type: Actions.UPDATE_CART,
		payload,
	};
};

export function updateSum(payload) { // изменение стоимости всех товаров в корзине
	return {
		type: Actions.UPDATE_SUM,
		payload,
	};
};

export function updatePriceFilter(payload) { // изменение стоимости всех товаров в корзине
	return {
		type: Actions.UPDATE_PRICE_FILTER,
		payload,
	};
};

export function updateFuckingCrutch(payload) { // бесовский костыль, сделанный от отчаяния и не нужный в более идеальной вселенной
	return {
		type: Actions.FUCKING_CRUTCH,
		payload,
	};
};

export function paginatorEngine(payload) { // пагинируем
	return {
		type: Actions.PAGINATOR,
		payload,
	};
};

export function uploadSingleImageItem(payload) { // получаем список картинок ОДНОГО товара
	return {
		type: Actions.UPLOAD_SINGLE_IMAGE_ITEM,
		payload,
	};
};

export function uploadSingleRevievItem(payload) { // получаем отзывы к ОДНОМУ товару
	return {
		type: Actions.UPLOAD_SINGLE_REVIEV_ITEM,
		payload,
	};
};

export function activeCarouselChanger(payload) { // получаем отзывы к ОДНОМУ товару
	return {
		type: Actions.ACTIVE_IMG,
		payload,
	};
};

export function itemMemoryChecker(payload) { // получаем отзывы к ОДНОМУ товару
	return {
		type: Actions.ITEM_MEMORY,
		payload,
	};
};

export function colorFilterUpdater(payload) { // меняем фильтр цветов
	return {
		type: Actions.CURRENT_COLOR_FILTER,
		payload,
	};
};

export function currentCategoryUpdater(payload) { // меняем фильтр цветов
	return {
		type: Actions.CURRENT_CATEGORY_FILTER,
		payload,
	};
};

export function engineLoaderMazaFucker(actions, key = "") { // функционал загрузки с сервера в store

	const serverBase = [ // общий каталог url-запросов на сервер
		{
			url: `http://test-api.ipromote.ru/API/CATALOG/FIND${key}`,
			askName: "catalog",
			actions: loadCatalog,
		},
		{
			url: `http://test-api.ipromote.ru/API/CATALOG/RANGE`,
			askName: "prices",
			actions: loadPrices,
		},
		{
			url: `http://test-api.ipromote.ru/API/CATEGORY/FIND`,
			askName: "categories",
			actions: loadCategories,
		},
		{
			url: `http://test-api.ipromote.ru/API/COLOR/FIND`,
			askName: "colors",
			actions: loadColors,
		},
		{
			url: `http://test-api.ipromote.ru/API/BRAND/FIND`,
			askName: "brands",
			actions: loadBrands,
		},
		{
			url: `http://test-api.ipromote.ru/API/IMAGE/FIND${key}`,
			askName: "imageItem",
			actions: uploadSingleImageItem,
		},
		{
			url: `http://test-api.ipromote.ru/API/REVIEW/FIND${key}`,
			askName: "revievItem",
			actions: uploadSingleRevievItem,
		},
	]

	return (dispatch) => {

		for (let i = 0; i < serverBase.length; i++) {

			if (serverBase[i].askName === actions) {
				dispatch(updateLoading({ [serverBase[i].askName]: true })); // флажок начала загрузки с сервера для элемента
				const data = fetch(serverBase[i].url);
				data.then((data) => {
					return data.json();
				}).then((data) => {
					dispatch(serverBase[i].actions(data));
					dispatch(updateLoading({ [serverBase[i].askName]: false }));
				}).catch((e) => {
					dispatch(updateLoading({ [serverBase[i].askName]: false }));
					console.log("ERROR while loading data from url", e);
				});
			}
		}
	};
};