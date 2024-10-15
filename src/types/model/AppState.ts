import { Product, Contacts, OrderInfo, Order, OrderResult, IProductApi } from "./ProductApi";

// Краткое описание товара для отображения в корзине
export type ProductBasket = {
    id: string;
    title: string;
    price: number;
}

// Какие модальные окна у нас есть
export enum AppStateModals {
	cardPreview = 'modal:cardPreview',
	basket = 'modal:basket',
	order = 'modal:order',
	contacts = 'modal:contacts',
	success = 'modal:success',
	none = 'modal:none',
}

// Question: which kinds state we have more?
// Какие изменения состояния приложения могут происходить
export enum AppStateChanges {
    products = 'change:products',
	modal = 'change:modal',
	// modalMessage = 'change:modalMessage', // Question: can be useful?
	basket = 'change:basket',
	order = 'change:order',
}

// Модель данных приложения
export interface AppState {
	// Загружаемые с сервера данные
	products: Map<string, Product>;

	// Заполняемые пользователем данные
	basket: Map<string, Product>;
    // Question: needs new "storage" for Product like
    //  basketProducts = Product[];
	basketTotal: number;
	contacts: Contacts;
	orderInfo: OrderInfo;
	order: Order;

	// Состояние интерфейса
	openedModal: AppStateModals;
	isOrderReady: boolean;
	// modalMessage: string | null; // Question: is it needs?
	// isError: boolean; // Question: is it needs?

	// Действия с API
	loadProducts(): Promise<void>;
	orderProducts(): Promise<OrderResult>;

	// Пользовательские действия
    addProductToBasket(id: string): void;
    removeProductToBasket(id: string): void;
    fillOrderInfo(orderInfo: OrderInfo): void;
    fillContacts(contacts: Contacts): void;
	isValid(): boolean;

	// Вспомогательные методы
	getBasketProduct(): ProductBasket | null;
	formatCurrency(value: number): string;

	// Методы для работы с модальными окнами
	openModal(modal: AppStateModals): void;
	// setMessage(message: string | null, isError: boolean): void; // Question: are we needs it?
}

// Настройки модели данных
export interface AppStateSettings {
	formatCurrency: (value: number) => string;
	// Функция, которая будет вызываться при изменении состояния
	onChange: (changed: AppStateChanges) => void;
}

// Конструктор модели данных
export interface AppStateConstructor {
	new (api: IProductApi, settings: AppStateSettings): AppState;
}