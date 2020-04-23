// загрузка каталога для App.js
export const LOAD_CATALOG = 'LOAD_CATALOG';
// загрузка диапазона цен
export const LOAD_PRICES = 'LOAD_PRICES';
// загрузка категорий товара для фильтра components/ShopSidebar/left_components/wid_category
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
// загрузка цветов для фильтра components/ShopSidebar/left_components/wid_color
export const LOAD_COLORS = 'LOAD_COLORS';
// загрузка брендов для фильтра components/ShopSidebar/left_components/wid_brands
export const LOAD_BRANDS = 'LOAD_BRANDS';
// индикатор процесса загрузки с сервера
export const UPDATE_LOADING = 'UPDATE_LOADING';
// сортировка отображаемых элементов в shop (Sort By)
export const UPDATE_SORT_ON_PAGE = 'UPDATE_SORT_ON_PAGE';
// кол-во отображаемых элементов в shop (Viev)
export const UPDATE_ITEM_ON_PAGE = 'UPDATE_ITEM_ON_PAGE';
// изменение содержимого корзины пользователя
export const UPDATE_CART = 'UPDATE_CART';
// изменение стоимости всех товаров в корзине
export const UPDATE_SUM = 'UPDATE_SUM';
// изменение фильтра по ценам
export const UPDATE_PRICE_FILTER = 'UPDATE_PRICE_FILTER';
// трахнутый костыль, детерминированный самою сутью тренировочной базы и тренировочного техзадания
export const FUCKING_CRUTCH = 'FUCKING_CRUTCH';
// пагинатор. Выясняем, на сколько страниц товара у нас наберётся.
export const PAGINATOR = 'PAGINATOR';
// загрузка картинки ОДНОГО товара
export const UPLOAD_SINGLE_IMAGE_ITEM = 'UPLOAD_SINGLE_IMAGE_ITEM';
// загрузка описания ОДНОГО товара
export const UPLOAD_SINGLE_REVIEV_ITEM = 'UPLOAD_SINGLE_REVIEV_ITEM';
// номер активной картинки в карусели
export const ACTIVE_IMG = 'ACTIVE_IMG';
// запоминаем последний просмотренный элемент каталога для перезагрузки картинок и описания
export const ITEM_MEMORY = 'ITEM_MEMORY';
// фильтр по цвету
export const CURRENT_COLOR_FILTER = 'CURRENT_COLOR_FILTER';
// фильтр по категории
export const CURRENT_CATEGORY_FILTER = 'CURRENT_CATEGORY_FILTER';