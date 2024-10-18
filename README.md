# Проектная работа "Веб-ларек"

Интернет-магазин товаров для веб-разработчиков

Стек: HTML, SCSS, TS, Webpack
Паттерн - MVC

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура

will soon...

## Базовый код

1. **Класс API**

Осуществляет запросы на получение и добавление данных на серверную часть

Конструктор принимает такие аргументы:

1. baseURL: string - адрес запроса к серверной части
2. options: RequestInit - дополнительные параметры запроса, по умолчанию пустой обект

Класс имеет следующие методы:

* get - для получение данных с сервера
* post - для отправки данных на сервер

2. **Класс EventEmitter**

Позволяет подписываться на события и уведомлять подписчиков о наступлении события

Класс имеет методы:

* on - для подписки на события
* off - для отписки от события
* emit - для уведомления подписчиков о наступившем событии

Дополнительными методами являются:

* onAll - для подписки на все события
* offAll- для отписки от всех событий
* trigger - для генерации события

3. **Класс Controller**

Реализуют MVC паттерн и осуществляет взаимодействие между слоем предоставления и слоем данных

## Компоненты модели данных (бизнес-логика)

1. **Класс AppState**

Хранит данные приложения и осуществляет их управлением. Позволяет формировать корзмну и осуществлять заказы

Класс имеет методы:

* loadProducts - для загрузки товаров с сервера при помощи API
* orderProducts - для формирования заказа
* addProductToBasket - для добавления товара в корзину
* removeProductToBasket - для удаления товара из козины
* fillOrderInfo - для заполнения данных о способе оплаты и адресе доставки
* fillContacts - для заполнения данных о контактах покупателя

Дополнительными методами являются:

* getBasketProduct - для получения данных о состоянии корзины
* formatCurrency - для форматирования цены товара под нужную валюту
* openModal - для изменения состояния модальных окон
* setMessage - для добавления ошибки валидации

Имплиментирует интерфейс AppState:

```
interface AppState {
	products: Map<string, Product>;
	basket: Map<string, Product>;
	basketTotal: number;
	contacts: Contacts;
	orderInfo: OrderInfo;
	order: Order;
	openedModal: AppStateModals;
	isOrderReady: boolean;
	modalMessage: string | null; 
	isError: boolean; 
	loadProducts(): Promise<void>;
	orderProducts(): Promise<OrderResult>;
    addProductToBasket(id: string): void;
    removeProductToBasket(id: string): void;
    fillOrderInfo(orderInfo: OrderInfo): void;
    fillContacts(contacts: Contacts): void;
	isValid(): boolean;
	getBasketProduct(): ProductBasket | null;
	formatCurrency(value: number): string;
	openModal(modal: AppStateModals): void;
	setMessage(message: string | null, isError: boolean): void; 
}
```

2. **Класс ProductApi**

Расширяет функционал базового класса API

Класс имеет методы:

* getProducts - для получения всех продуктов с сервера
* orderProducts - для осущетсвления заказа выбранных продуктов

Имплиментирует интерфейс IProductApi:

```
interface IProductApi {
    getProducts: () => Promise<Product[]>;
    orderProducts: (order: Order) => Promise<OrderResult>;
}
```

3. **Класс AppStateEmitter**

Расширяет функционал базового класса EventEmitter и осущетсвляет подписку на события AppState


## Компоненты представления

1. **Класс UIMain**
   Отвечает за отображение элементов на всей странице
2. **Класс UIModalScreen**
   Отвечает за отображение модального окна с пустым контейнером контента
3. **Класс UIBasket**
   Отвечает за отображение корзины внутри контейнера контента в модальном окне
4. **Класс UIOrderInfo**
   Отвечает за отображение формы заполнения информации о заказе (адрес, способ оплаты) внутри контейнера контента в модальном окне
5. **Класс UIContact**
   Отвечает за отображение формы заполнения контактов внутри контейнера контента в модальном окне
6. **Класс UICardPreview**
   Отвечает за отображение данных о товаре внутри контейнера контента в модальном окне
7. **Класс UISuccess**
   Отвечает за отображение о успешном статусе осуществления заказа внутри контейнера контента в модальном окне

## Компоненты контроллера

1. **Класс MainController**
   Отвечает за взаимодействие UIMain и AppState
2. **Класс ModalScreenController**
   Отвечает за взаимодействие UIModalScreen и AppState
3. **Класс BasketController**
   Отвечает за взаимодействие UIBasket и AppState
4. **Класс OrderInfoController**
   Отвечает за взаимодействие UIOrderInfo и AppState
5. **Класс ContactController**
   Отвечает за взаимодействие UIContact и AppState
6. **Класс CardPreviewController**
   Отвечает за взаимодействие UICardPreview и AppState

## Ключевые типы данные

```
interface Product {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
}

interface OrderInfo {
    address: string;
    payment: string;
}

interface Contacts {
    email: string;
    phone: string;
}

interface Order extends OrderInfo, Contacts {
    items: Product[];
    total: number;
}

interface OrderResult extends Order {
    id: string;
}

// Состояния приложения
enum AppStateChanges {
    products = 'change:products',
	modal = 'change:modal',
	modalMessage = 'change:modalMessage', 
	basket = 'change:basket',
	order = 'change:order',
}

// Модальные окна, которые у нас есть
enum AppStateModals {
	cardPreview = 'modal:cardPreview',
	basket = 'modal:basket',
	order = 'modal:order',
	contacts = 'modal:contacts',
	success = 'modal:success',
	none = 'modal:none',
}
```
