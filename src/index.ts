import './scss/styles.scss';
import { AppState } from './components/model/AppState';
import { CardApi } from './components/model/CardApi';
import { EventEmitter } from './components/base/events';
import { ICard, ButtonLabels, Message, IOrderInfo, IContacts } from './types';
import { settings } from './utils/constants'
import { Main } from './components/view/screen/Main';
import { cloneTemplate } from './utils/utils';
import { Card } from './components/view/screen/Card';
import { Modal } from './components/view/partial/Modal';
import { Basket } from './components/view/partial/Basket';
import { Order } from './components/view/partial/Order';
import { Contacts } from './components/view/partial/Contacts';
import { Success } from './components/view/partial/Success';

const BASE_URL = process.env.API_ORIGIN;
const API_PATH = '/api/weblarek';
const CDN_PATH = '/content/weblarek';

// const API_PATH = process.env.API_PATH;
// const CDN_PATH = process.env.CDN_PATH;

// Шаблоны
const mainContainer = document.querySelector(settings.mainSelector) as HTMLTemplateElement;
const cardCatalogTemplate = document.querySelector(settings.cardCatalogTemplate) as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector(settings.cardBasketTemplate) as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector(settings.cardPreviewTemplate) as HTMLTemplateElement;
const basketTemplate = document.querySelector(settings.basketTemplate) as HTMLTemplateElement;
const orderTemplate = document.querySelector(settings.orderInfoTemplate) as HTMLTemplateElement;
const contactsTemplate = document.querySelector(settings.contactsTemplate) as HTMLTemplateElement;
const successTemplate = document.querySelector(settings.successTemplate) as HTMLTemplateElement;
const modalTemplate = document.querySelector(settings.modalTemplate) as HTMLTemplateElement;

// Классы слоя данных
const events = new EventEmitter();
const api = new CardApi(BASE_URL, API_PATH, CDN_PATH);
const app = new AppState({}, events);

// Классы слоя представления
const main = new Main(mainContainer, events);
const modal = new Modal(modalTemplate, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);

// Список состояния
export const enum AppStates {
    basketOpened = 'basket',
    cardPreviewOpened = 'cardPreview',
    orderOpened = 'orderForm',
    orderSent = 'orderSent',
    noOpened = '',
}

// Список событий
export const enum AppStateEvents {
    // state events
    StateUpdate = 'state:update',
    // cards events
    CardsChanged = 'cards:changed',
    // cardPreview events
    CardPreviewOpen= 'cardPreview:open', // было cardPreview:selected
    CardPreviewUpdate = 'cardPreview:update',
    // basket events
    BasketOpen = 'basket:open',
    BasketChanged = 'basket:changed',
    BasketUpdate = 'basket:update',
    BasketSubmit = 'basket:submit',
    // order events
    OrderUpdate = 'order:update',
    OrderSubmit = 'order:submit',
    PaymentSelected = 'payment:select',
    // contacts events
    ContactsSubmit = 'contacts:submit',
    // success events 
    SuccessOpen = 'success:open',
    SuccessSubmit = 'success:submit',
    // modal events
    ModalOpen = 'modal:open',
    ModalClose = 'modal:close',

}

const AppStateEventPatterns = {
    OrderInputChange: /^order\..*:change/,
    ContactsInputChange: /^contacts\..*:change/,
}

/**
 * Обрабатывает изменение списка карточек в каталоге в model
 * 
 * @event AppStateEvents.CardsChanged
 * @param {Iterable<ICard>} cards - Итератор с обновленным списком карточек товаров
 * 
 * При вызове обновляет каталог в слое View, создавая новые экземпляры карточек на основе шаблона
 */
events.on(AppStateEvents.CardsChanged, (cards: Iterable<ICard>) => {
    main.catalog = Array.from(cards).map(cardData => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), events, {
            onClick: () => app.setPreview(cardData),
        });
        return card.render({
            ...cardData,
            price: app.formatCurrency(cardData.price),
        });
    })
});


/**
 * Открывает предпросмотр карточки товара в модальном окне
 * 
 * @event AppStateEvents.CardPreviewOpen
 * @param {Object} data - Объект с информацией о карточке товара
 * 
 */
events.on(AppStateEvents.CardPreviewOpen, (data: {
    id: string, 
    title: string,
    description: string;
    image: string;
    category: string;
    price: number;
})  => {
    app.setState(AppStates.cardPreviewOpened);
    
    const buttonLabel = app.getBasketCardId().includes(data.id) ? 
        ButtonLabels.inBasket: 
        data.price === null ? 
            ButtonLabels.isUnvailable:
            ButtonLabels.isAvailable;
    
    modal.open();
    modal.content = new Card(cloneTemplate(cardPreviewTemplate), events, {
        onClick: () => events.emit(AppStateEvents.BasketChanged, {id: data.id})
    }).render({
        ...data,
        price: app.formatCurrency(data.price),
        buttonLabel: buttonLabel,
    });
});

/**
 * Обрабатывает изменение модального окна с предпросмотром карточки товара
 * 
 * @event AppStateEvents.CardPreviewUpdate
 * @param {Object} data - Объект с информацией о карточке товара
 * @param {string} data.id - Идентификатор карточки товара для получения ее данных
 * 
 * При вызове создает новый экземпляр карточки для предпросмотра в модальном
 * окне в соответствии с действиями пользователя (товар добавлен в корзину или
 * убран из нее)
 */
events.on(AppStateEvents.CardPreviewUpdate, (data: {id: string}) => {
    const cardData = app.getCard(data.id);
    // Нужно ли каждый раз заново создавать или можно вызывать метод рендер с новыми параметрами
    
    modal.content = new Card(cloneTemplate(cardPreviewTemplate), events, {
        onClick: () => events.emit(AppStateEvents.BasketChanged, {id: data.id})
    }).render({
        ...cardData,
        buttonLabel: app.getBasketCardId().includes(data.id)?
            ButtonLabels.inBasket:
            ButtonLabels.isAvailable,
        price: app.formatCurrency(cardData.price),
    });
});

/**
 * Обрабатывает состояния корзины
 * 
 * @event AppStateEvents.BasketChanged
 * @param {Object} data - Объект с информацией о карточке товара
 * @param {string} data.id - Идентификатор карточки товара для получения ее данных
 * 
 * При вызове выполняет добавление товара в корзину или его удаление
 */
events.on(AppStateEvents.BasketChanged, (data: {id: string}) => {
    if (app.getBasketCardId().includes(data.id)) {
        app.removeCard(data.id);
    } else {
        app.addCard(data.id);
    }
})

/**
 * Изменяет отображение корзины
 * 
 * @event AppStateEvents.BasketUpdate
 * 
 * При вызове выполняет ререндер компонента "Basket" 
 * в соответствии с внесенными изменениям 
 */
events.on(AppStateEvents.BasketUpdate, () => {
    basket.render({
        total: app.formatCurrency(app.getTotal()),
        disabled: app.getBasketCardId().length === 0 ? 
            true: 
            false,
        items: app.getBasketCardId().map((cardId, index) => {
            const cardData = app.getCard(cardId);
            return new Card(cloneTemplate(cardBasketTemplate), events, {
                onClick: () => events.emit(AppStateEvents.BasketChanged, {id: cardData.id})
            }).render({
                title: cardData.title,
                price: app.formatCurrency(cardData.price),
                indexLabel: (index + 1).toString(),
            });
        })
    });
});

/**
 * Отвечает за отображение корзины
 * 
 * @event AppStateEvents.BasketOpen
 * 
 * При вызове выполняет рендер компонента "Basket" и отображает
 * его содержимое в модальном окне
 */
events.on(AppStateEvents.BasketOpen, () => {
    app.setState(AppStates.basketOpened);
    
    app.clearOrder();
    modal.open();
    modal.content = basket.render({
        total: app.formatCurrency(app.getTotal()),
        disabled: app.getBasketCardId().length === 0 ? 
            true: 
            false,
        items: app.getBasketCardId().map((cardId, index) => {
            const cardData = app.getCard(cardId);
            return new Card(cloneTemplate(cardBasketTemplate), events, {
                onClick: () => events.emit(AppStateEvents.BasketChanged, {id: cardData.id})
            }).render({
                title: cardData.title,
                price: app.formatCurrency(cardData.price),
                indexLabel: (index +1).toString(),
            });
        })
    });
});

/**
 * Отвечает за отображение формы заполнения информации о заказе
 * 
 * @event AppStateEvents.BasketSubmit
 * 
 * При вызове выполняет рендер компонента "Order" и отображает
 * его содержимое в модальном окне
 */
events.on(AppStateEvents.BasketSubmit, () => {
    app.setState(AppStates.orderOpened);
    app.clearOrder();

    modal.content = order.render({
        payment: app.getOrder().payment,
        address: app.getOrder().address,
        valid: !(app.getOrder().payment && app.getOrder().address),
        error: (app.getMessages().payment === undefined && app.getMessages().address === undefined)?
                    Message.form:
                    app.getMessages().payment !== undefined?
                        Message.payment:
                        app.getMessages().address !== undefined?
                            Message.address:
                            Message.no,        
    })
})

/**
 * Отвечает за добавление данных в заказ в Model из формы
 * заполнения информации о заказе
 * 
 * @event AppStateEventPatterns.OrderInputChange
 * @param {Object} data - Объект с информацией о input
 * @param {keyof IOrderInfo} data.field - Имя поля ввода
 * @param {string} data.value - Внесенные данные в поле ввода
 * 
 * При вызове выполняет заполнение данных об заказе в Model в соответствии с именем поля ввода
 * и внесенным значением
 */
events.on(AppStateEventPatterns.OrderInputChange, (data: { field: keyof IOrderInfo, value: string }) => {
    app.setOrderFiedls(data.field, data.value);
    events.emit(AppStateEvents.StateUpdate, {field: data.field});
})

/**
 * Изменяет отображение форм заполнения информации о заказе и заполнения контактов
 * 
 * @event AppStateEvents.OrderUpdate
 * @param {Object} data - Объект с информацией о input
 * @param {keyof IOrderInfo | keyof IContacts} data.field - Имя поля ввода
 * 
 * Выполняет ререндер форм в соответствии с внесенными данными
 */
events.on(AppStateEvents.OrderUpdate, (data: {field: keyof IOrderInfo | keyof IContacts}) => {
    order.render({
        payment: app.getOrder().payment,
        address: app.getOrder().address,
        valid: !(app.getOrder().payment && app.getOrder().address),
        error: (app.getMessages().payment !== undefined && app.getMessages().address !== undefined)?
                    Message.form:
                    app.getMessages().payment !== undefined?
                        Message.payment:
                        app.getMessages().address !== undefined?
                            Message.address:
                            Message.no,        
    })

    contacts.render({
        email: app.getOrder().email,
        phone: app.getOrder().phone,
        valid: !(app.getOrder().email && app.getOrder().phone),
        error: (app.getMessages().email !== undefined && app.getMessages().phone !== undefined)?
                    Message.form:
                    app.getMessages().email !== undefined?
                        Message.email:
                        app.getMessages().phone !== undefined?
                            Message.phone:
                            Message.no,     
    })

    if (data && data.field) {
        if (data.field in order) {
            order.focus = data.field as keyof IOrderInfo;
        } else if (data.field in contacts) {
            contacts.focus = data.field as keyof IContacts;
        }
    }
})

/**
 * Отвечает за изменения способа выбора оплаты в Model
 * 
 * @event AppStateEvents.PaymentSelected
 * @param {Object} data - Объект с информацией о способе оплаты
 * @param {keyof IOrderInfo} data.payment - Название способа оплаты
 */
events.on(AppStateEvents.PaymentSelected, (data: {payment: keyof IOrderInfo}) => {
    app.setOrderFiedls('payment', data.payment);
    events.emit(AppStateEvents.StateUpdate);
})

/**
 * Отвечает за отображение формы заполнения контактов пользователя
 * 
 * @event AppStateEvents.OrderSubmit
 * При вызове выполняет рендер компонента "Contacts" и отображает
 * его содержимое в модальном окне
 */
events.on(AppStateEvents.OrderSubmit, () => {
    modal.content = contacts.render({
        email: app.getOrder().email,
        phone: app.getOrder().phone,
        valid: !(app.getOrder().email && app.getOrder().phone),
        error: (app.getMessages().email !== undefined && app.getMessages().phone !== undefined)?
                    Message.form:
                    app.getMessages().email !== undefined?
                        Message.email:
                        app.getMessages().phone !== undefined?
                            Message.phone:
                            Message.no,     
    })
})

/**
 * Отвечает за добавление данных в заказ в Model из формы
 * заполнения контактов пользователя
 * 
 * @event AppStateEventPatterns.OrderInputChange
 * @param {Object} data - Объект с информацией о input
 * @param {keyof IContacts} data.field - Имя поля ввода
 * @param {string} data.value - Внесенные данные в поле ввода
 * 
 * При вызове выполняет заполнение данных об заказе в Model в соответствии с именем поля ввода
 * и внесенным значением
 */
events.on(AppStateEventPatterns.ContactsInputChange, (data: { field: keyof IContacts, value: string }) => {
    app.setOrderFiedls(data.field, data.value);
    events.emit(AppStateEvents.StateUpdate, {field: data.field});
})

/**
 * Отвечает за отправку данных на сервер после нажатия пользователя
 * на кнопку оформления заказа
 * 
 * @event AppStateEvents.ContactsSubmit
 * При вызове выполняется отправка заказа на сервер
 */
events.on(AppStateEvents.ContactsSubmit, () => {
    app.setState(AppStates.orderSent);
    api.orderCards(app.getOrder())
        .then(data => events.emit(AppStateEvents.StateUpdate, {total: data.total}))
        .catch(err => console.log(err))
})

/**
 * Отвечает за отображение статуса об успешном оформлении заказа
 * 
 * @event AppStateEventPatterns.SuccessOpen
 * @param {Object} data - Объект с информацией о заказе
 * @param {number} data.total - Сумма заказа
 * 
 * При вызове выполняет рендер компонента "Success" и отображает
 * его содержимое в модальном окне
 */
events.on(AppStateEvents.SuccessOpen, (data: {total: number}) => {
    modal.content = success.render({
        total: app.formatCurrency(data.total),
    })
})

/**
 * Отвечает за закрытие окна с информацией об успешном оформлении заказа
 * 
 * @event AppStateEvents.SuccessSubmit
 */
events.on(AppStateEvents.SuccessSubmit, () => {
    modal.close();
})

/**
 * Отвечает за отображение модального окна на странице
 * 
 * @event AppStateEvents.ModalOpen
 */
events.on(AppStateEvents.ModalOpen, () => {
    main.isLocked = true;
});

/**
 * Отвечает за скрытие модального окна со страницы
 * 
 * @event AppStateEvents.ModalClose
 */
events.on(AppStateEvents.ModalClose, () => {
    app.setState(AppStates.noOpened);
    main.isLocked = false;
    events.emit(AppStateEvents.StateUpdate);
});

/**
 * Отвечает за изменение состояния приложения 
 * 
 * @event AppStateEvents.StateUpdate
 * @param {Object} data - Объект с данными для изменения состояния
 * @param {string} data.id - id карточки
 * @param {keyof IOrderInfo | keyof IContacts} data.total - Имя поля ввода
 * @param {number} data.total - Сумма заказа
 */
events.on(AppStateEvents.StateUpdate, (data?: {
    id: string, 
    field: keyof IOrderInfo | keyof IContacts,
    total: number 
}) => {
    if (app.getState() === AppStates.cardPreviewOpened) {
        events.emit(AppStateEvents.CardPreviewUpdate, {id: data.id});
        main.counter = app.getBasketCardId().length;
    }
    if (app.getState() === AppStates.basketOpened) {
        events.emit(AppStateEvents.BasketUpdate);
        main.counter = app.getBasketCardId().length;
    }
    if (app.getState() === AppStates.orderOpened) {
        (data && 'field' in data)?
            events.emit(AppStateEvents.OrderUpdate, {field: data.field}):
            events.emit(AppStateEvents.OrderUpdate);
    }
    if (app.getState() === AppStates.orderSent) {
        app.clearOrder();
        app.clearBasket();
        events.emit(AppStateEvents.SuccessOpen, {total: data.total});
    }
    if (app.getState() === AppStates.noOpened) {
        main.counter = app.getBasketCardId().length;
    }
})

/**
 * Загрузка всех карточек товаров с сервера
 */
api.getCards()
    .then(data => app.loadCards(data))
    .catch(err => console.log(err));

