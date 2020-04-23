import { combineReducers } from "redux";
import * as Actions from "./actions";

const initialStore = {
	catalog: {}, // список ВСЕХ товаров. С Яндекс Маркетом так лучше не делать.
	prices: {}, // диапазон цен min-max
	categories: {}, // список категорий с сервера
	colors: {}, // список цветов
	brands: {}, // список брендов
	isLoading: {}, // индикатор процесса загрузки
	sortOnPage: "Date", // категория фильтра Sort By в выпадашке shop (по-умолчанию "Date")
	itemsOnPage: "4", // кол-во товаров в выпадашке Viev на странице shop (по-умолчанию "4")
	cart: [], // товары в корзине {id, amount}
	sum: 0, // сумма цен товаров в корзине
	priceFilter: [21, 110], // разброс по ценам (хз, почему я его вручную задал, потом разберусь. Какой-то головняк со слайдером)
	fuckingCrutch: false, // боже мой, боже мой, вскую мя оставил еси, сцука?
	pagination: "0", // текущая страница товара
	singleImageItem: {}, // список картинок ОДНОГО товара
	singleRevievItem: {}, // отзыв к ОДНОМУ товару
	activeImg: 0, // активная картинка карусели
	itemMemory: "", // запоминаем последний просмотренный элемент каталога для перезагрузки картинок и описания
	currentColorFilter: "ALL", // текущий фильтр по цвету
	currentCategoryFilter: "1", // и тут я обнялся и горько заплакал
};

function rootReducer(store = initialStore, action) {

	switch (action.type) {
		case Actions.LOAD_CATALOG: // обновляем каталог с сервера
			return {
				...store,
				catalog: { ...action.payload },
			};

		case Actions.LOAD_PRICES: // список диапазона цен с сервера
			return {
				...store,
				prices: { ...action.payload },
			};

		case Actions.LOAD_CATEGORIES: // список категорий с сервера
			return {
				...store,
				categories: { ...action.payload },
			};

		case Actions.LOAD_COLORS: // список цветов с сервера
			return {
				...store,
				colors: { ...action.payload },
			};

		case Actions.LOAD_BRANDS: // список брендов с сервера
			return {
				...store,
				brands: { ...action.payload },
			};

		case Actions.UPDATE_LOADING: // обновить статус загрузки для одного из ключей
			return {
				...store,
				isLoading: { ...store.isLoading, ...action.payload }
			};

		case Actions.UPDATE_SORT_ON_PAGE: // сортировка отображаемых элементов в shop (Sort By)
			return {
				...store,
				sortOnPage: action.payload,
				pagination: "0",
			};

		case Actions.UPDATE_ITEM_ON_PAGE: // кол-во отображаемых элементов в shop (Viev)
			return {
				...store,
				itemsOnPage: action.payload,
				pagination: "0",
			};

		case Actions.UPDATE_CART: // добавляем-удаляем товары из корзины
			return {
				...store,
				cart: [...action.payload],
			};

		case Actions.UPDATE_SUM: // сумма покупок в корзине
			return {
				...store,
				sum: action.payload,
			};

		case Actions.UPDATE_PRICE_FILTER: // фильтр по ценам
			return {
				...store,
				priceFilter: [...action.payload],
				pagination: "0",
			};

		case Actions.FUCKING_CRUTCH: // костыль для осознания того факта, что мы находимся на странице, где работают фильтры (shop)
			return {
				...store,
				fuckingCrutch: action.payload,
			};

		case Actions.PAGINATOR: // вычисляем, сколько кнопок для листания страниц делать в секции shop (больше двух вряд ли получится)
			return {
				...store,
				pagination: action.payload,
			};

		case Actions.UPLOAD_SINGLE_IMAGE_ITEM: // меняем список картинок для ОДНОГО товара
			return {
				...store,
				singleImageItem: { ...action.payload },
			};

		case Actions.UPLOAD_SINGLE_REVIEV_ITEM: // меняем отзыв для ОДНОГО товара
			return {
				...store,
				singleRevievItem: { ...action.payload },
			};

		case Actions.ACTIVE_IMG: // активная картинка карусели
			return {
				...store,
				activeImg: action.payload,
			};

		case Actions.ITEM_MEMORY: // последний просмотренный в индивидуальном порядке товар
			return {
				...store,
				itemMemory: action.payload,
			};

		case Actions.CURRENT_COLOR_FILTER: // фильтр по цвету
			return {
				...store,
				currentColorFilter: action.payload,
				pagination: "0",
			};

		case Actions.CURRENT_CATEGORY_FILTER: // фильтр по категории. Деградация или прогресс?
			return { // и тут мне пришло в голову сбрасывать пагинацию прямо на стороне редусера. Посмотрим, что из этого выйдет.
				...store, 
				currentCategoryFilter: action.payload,
				pagination: "0", // ОХУЕТЬ!!! РАБОТАЕТ!!!
			};

		default:
			return store;

	};
};

export default () => combineReducers({
	app: rootReducer,
});