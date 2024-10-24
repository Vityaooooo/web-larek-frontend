# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

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

Проект реализован на основе паттерна MVP (Model-View-Presenter)

* Model (Модель) - хранит данные и управляет бизнес-логикой приложения
* View (Представление) - отвечает за отображение данных на интерфейсе пользователя
* Presenter - осуществляет взаимодействие между Model и View

## Базовый код

1. **Класс API**

Осуществляет запросы на получение и добавление данных на серверную часть

Конструктор принимает следующие аргументы:

1. ```baseURL: string``` - адрес запроса к серверной части
2. ```options: RequestInit``` - дополнительные параметры запроса, по умолчанию пустой объект

Класс имеет следующие методы:

* ```get``` - для получение данных с сервера
* ```post``` - для отправки данных на сервер

2. **Класс EventEmitter**

Позволяет подписываться на события и уведомлять подписчиков о наступлении события
Presenter использует *класс EventEmitter* для обработки событий, которые произошли в слоях Представления (View) и Модели (Model)

Класс имплементируется от интерфейса *IEvents*:
```
interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```

В соответсвии ему, в классе имеются следующие основные методы:

1. ```on``` - для подписки на события
2. ```off``` - для отписки от события
3. ```emit``` - для уведомления подписчиков о наступившем событии

Дополнительными методами являются:

- ```onAll``` - для подписки на все события
- ```offAll```- для отписки от всех событий
- ```trigger``` - для генерации события

3. **Класс Component**

Содержит инструментарий для работы с DOM в дочерних компонентах

Конструктор принимает:

* ```container: HTMLElement``` - контейнер элемента
* ```events: IEvents``` - экземпляр *класса EventEmitter* 

Класс имеет методы:

* ``` toggleClass(element: HTMLElement, className: string, force?: boolean)``` - для перключения класса у element
* ```setText(element: HTMLElement, value: unknown)``` - для изменения текстового содержания у element
* ```setDisabled(element: HTMLElement, state: boolean)``` - для изменения статуса блокировки у element
* ```setHidden(element: HTMLElement)``` - для скрытия элемента
* ```setVisible(element: HTMLElement)``` - для отображения отображения элемента
* ```setImage(element: HTMLImageElement, src: string, alt?: string)``` - для установки изображения с альтернативным текстом
* ```render(data?: Partial<T>): HTMLElement``` - для отображения element
* ```emitChanges(event: string, payload?: object)``` - для установки событий о том что компонент поменялся

4. **Класс Model**

Базовая модель, чтобы можно было отличить ее от простых объектов с данными

Конструктор принимает:

* ```data: Partial<T>``` - данные для экземпляров класса
* ```events: IEvents``` - экземпляр *класса EventEmitter* 

Класс имеет методы:

* ```emitChanges(event: string, payload?: object)``` - для установки событий о том что модель поменялась

## Компоненты модели данных (бизнес-логика)

1. **Класс AppState**

Хранит данные приложения и осуществляет их управлением. Позволяет формировать корзину и осуществлять заказы

Конструктор принимает следующие аргументы:

* ```events: Events``` - экземпляр класса *EventEmitter*. Позволяет осущеcтвлять эмитирование событий моделью

Атрибуты класса:

* ```cards: Map<string, ICard>``` - данные всех карточек товара, представленные в приложении
* ```basket: Map<string, ICard>``` - карточки товаров, которые были добавлены в корзину
* ```order: Order``` - данные для осуществления заказа: (Contacts: контакты пользователя - email и phone, OrderInfo: информацию о заказе - payment и address)
* ```message: string | null``` - сообщение об ошибки в данных для атрибута *order*
* ```isError: boolean``` - наличие ошибки в данных для атрибута *order*
* ```isOrderReady: boolean``` - состояние заказа
* ```preview: string | null``` - id карточки для отображения в модальном окне

Класс имеет методы:

* ```loadCards(): void``` - для загрузки товаров с сервера при помощи API
* ```getCard(id: string): ICard``` - для получения карточки по id
* ```orderCards(order: Order): void``` - для формирования заказа
* ```addCard(id: string): void``` - для добавления товара в корзину
* ```removeCard(id: string): void``` - для удаления товара из козины
* ```setOrderFiedls(field: keyof IOrderInfo | IContacts, value: string)``` - для заполнения данных для осуществления заказа

Дополнительными методами являются:

* ```getBasketProduct(): ICard[]``` - для получения данных о состоянии корзины
* ```formatCurrency((value: number): string``` - для форматирования цены товара под нужную валюту
* ```clearBasket(): void``` - для очистки всей корзины
* ```getTotal(): number``` - получения всей суммы заказа
* ```setPreview(card: ICard): void  ``` - для изменения данных об открытой карточке
* ```validateOrder(): boolean``` - для проверки заказа на валидность

Является наследником *Класса Model*

Имплиментирует *интерфейс IAppState*


2. **Класс CardApi**

Расширяет функционал базового класса API. используется для получения данных о карточках с сервера, а также отправления заказана сервер

Класс имеет методы:

* ```getCards(): Promise<ICard[]>``` - для получения всех продуктов с сервера
* ```orderCards(order: Order): Promise<OrderResult>``` - заказа выбранных продуктов

Является наследником *Класса API*

Имплиментирует *интерфейс ICardApi*:

```
interface ICardApi {
    getCards: () => Promise<ICard[]>;
    orderCards: (order: Order) => Promise<OrderResult>;
}
```

## Компоненты представления

1. **Класс Main**
   
Отвечает за отображение элементов на странице

Конструктор принимает:

* ```container: HTMLElement``` - контейнер страницы, в котором будут размещаться карточки
* ```events: IEvents``` - экземпляр *класса EventEmitter* 

Содержит следующие атрибуты:
   
* ```counter: HTMLElement``` - содержит HTMLElement для отображения счетчика товаров в корзине
* ```catalog: HTMLElement``` - содержит HTMLElement для отображения карточек
* ```basket: HTMLElement``` - содержит HTMLElement корзины на главной странице
* ```wrapper: HTMLElement``` - содержит HTMLElement обертку для страницы

Содержит сеттеры для отображения:
* счетчика корзины
* каталога карточек
* установки состояния блокировки 

Является наследником *Класса Component*

2. **Класс Modal**

Отвечает за отображение модального окна

Конструктор принимает:

* ```container: HTMLElement``` - контейнер модального окна
* ```events: IEvents``` - экземпляр *класса EventEmitter* 

Содержит следующие атрибуты:
   
* ```closeButton: HTMLButtonElement``` - содержит HTMLButtonElement для закрытия модального окна
* ```content: HTMLElement``` - содержит HTMLElement для контента внутри модального окна

Содержит сеттер для размещения контента 

Класс имеет методы:

* ```open(): void``` - для открытия модального окна
* ```close(): void``` - для закрытия модальноо окна 
* ```render(data: IModalData): HTMLElement``` - для рендера модального окна

Является наследником *Класса Component*

3. **Класс Basket**

Отвечает за отображение корзины внутри контейнера контента в модальном окне

Конструктор принимает:

* ```container: HTMLElement``` - контейнер корзины на основе template из index.html
* ```events: IEvents``` - экземпляр *класса EventEmitter* 

Содержит следующие атрибуты:
   
* ```list: HTMLElement``` - содержит HTMLElement для отображения всех карточек, добавленных в корзину
* ```total: HTMLElement``` - содержит HTMLElement для общей суммы покупки
* ```button: HTMLElement``` - содержит HTMLElement для осуществления оформления заказа

Содержит сеттеры для отображения:
* карточек, добавленных в корзину
* изменения статуса блокировки
* отображения общей суммы заказа

Является наследником *Класса Component*

4. **Класс Form**

Компонент формы

Конструктор принимает:

* ```container: HTMLFormElement``` - контейнер для формы на основе template из index.html
* ```events: IEvents``` - экземпляр *класса EventEmitter* 

Содержит следующие атрибуты:

* ```error: HTMLElement``` - содержит HTMLlement для осуществлениядля вывода сообщений об ошибках валидации в форме
* ```valid: boolean```: boolean - хранит валидность формы
* ```submit: HTMLButtonElement``` - содержит HTMLButtonElement для осуществления перехода к следующему этапу оформления заказа

Содержит сеттеры для:

* изменяет активность кнопки подтверждения
* отображения ошибки валидации

Класс имеет методы:

* ```reset(): void``` - для очистки формы
* ```render(state: Partial<T> & IFormState): HTMLFormElement``` - для рендера формы

Является наследником *Класса Component*

5. **Класс Order**

Отвечает за отображение формы заполнения информации о заказе (адрес, способ оплаты) внутри контейнера контента в модальном окне

Конструктор принимает:

* ```container: HTMLFormElement``` - контейнер для формы на основе template из index.html
* ```events: IEvents``` - экземпляр *класса EventEmitter* 

Содержит следующие атрибуты:
   
* ```cash: HTMLButtonElement``` - содержит HTMLButtonElement для выбора оплаты "При получении"
* ```card: HTMLButtonElement``` - содержит HTMLButtonElement для выбора оплаты "Картой"
* ```address: HTMLInputElement``` - содержит HTMLInputElement для ввода адреса доставки

Содержит сеттеры для:
* установки адреса доставки
* установки способа оплаты

Является наследником *Класса Form*

6. **Класс Contact**

Отвечает за отображение формы заполнения контактов внутри контейнера контента в модальном окне

Конструктор принимает:

* ```container: HTMLFormElement``` - контейнер для формы на основе template из index.html
* ```events: IEvents``` - экземпляр *класса EventEmitter* 

Содержит следующие атрибуты:
   
* ```email: HTMLInputElement``` - содержит HTMLInputElement для ввода email
* ```phone: HTMLInputElement``` - содержит HTMLInputElement для ввода номера телефона

Содержит сеттеры для:
* установки номера телефона
* установки email

Является наследником *Класса Form*

7. **Класс Success**

Отвечает за отображение карточки 

Конструктор принимает:

* ```container: HTMLElement``` - контейнер для карточки на основе template из index.html
* ```events: IEvents``` - экземпляр *класса EventEmitter* 

Содержит следующие атрибуты:
   
* ```close: HTMLElement``` - содержит HTMLElement для закрытия модального окна 
* ```total: HTMLElement``` - содержит сумму заказа

8. **Класс Card**

Отвечает за отображение карточки 

Конструктор принимает:

* ```container: HTMLElement``` - контейнер для карточки на основе template из index.html
* ```events: IEvents``` - экземпляр *класса EventEmitter* 
* ```action?: ICardAction``` - обработчики событий для осуществления пользовательского взаимодействия с карточкой

Содержит следующие атрибуты:
   
* ```image: HTMLImageElement``` - содержит HTMLImageElement для отображения обложки карточки
* ```category: HTMLElement``` - содержит HTMLElement для отображения категории карточки
* ```title: HTMLElement``` - содержит HTMLElement для отображения названия карточки
* ```description: HTMLElement``` - содержит HTMLElement для отображения описания карточки
* ```price: HTMLElement``` - содержит HTMLElement для отображения цены карточки
* ```buttonBasket: HTMLButtonElement``` - содержит HTMLButtonElement для пользовательского взаимодействия в модальном окне карточки
* ```buttonDelete: HTMLButtonElement``` - содержит HTMLButtonElement для пользовательского взаимодействия в корзине для удаления карточки
* ```id: HTMLElement``` - содержит HTMLElement для отображения номера карточки в корзине

Содержит сеттеры для:
* установки обложки
* установки категории
* установки заголовка
* установки описания
* установки цены
* установки доступности покупки

Является наследником *Класса Component*

## Presenter

Отвечает за взаимодействие слоев Model и View между собой на основе событий, которые были сгенерированы с помощью брокера и обработчиков этих событий:

* Принимает событие от View
* Изменяет состояние Model и обновляет View в зависимости от изменений в Model
* Осуществляет управление запросами к серверу с помощью API

Код Presenter описан в ```index.ts```

## Ключевые данные 

Интерфейс данных карточек в Model
```
interface ICard {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
    isAvaliable: boolean;
}
```

Интерфейс информационных данных о заказе в Model
```
interface IOrderInfo {
    address: string;
    payment: string;
}
```

Интерфейс данных о контактах в Model
```
interface IContacts {
    email: string;
    phone: string;
}
```

Интерфейс данных о заказе в Model
```
interface Order extends IOrderInfo, IContacts {
    items: ICard[];
    total: number;
}
```

Интерфейс данных о результате обработки заказа в Model
```
interface OrderResult extends Order {
    id: string;
}
```

## Основные события

* ```cards: changed``` - изменение элементов каталога
* ```card: select``` - изменение отображения карточки для просмотра в модальном окне
* ```modal: open``` - открытие модального окна
* ```modal: close``` - закрытие модального окна
* ```preview:changed``` - открытие выбранной карточки
* ```order: submit``` - отправка формы заказа
* ```formErrors:change``` - изменение состояния валидации формы
* ```basket: open``` - открытие корзины
* ```basket: changed``` - изменение состояния корзины (при удалении или добавлении товара в коризну)
* ```orderInfo: open``` - открытие формы для внесения данных о заказе
* ```orderContacts: open``` - открытие формы для внесения контактов
* ```/^order\..*:change/``` - изменение полей ввода в форме
* ```payment: select``` - изменение выбора способа оплаты


