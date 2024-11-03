import './scss/styles.scss';
import { AppState } from './components/model/AppState';
import { CardApi } from './components/model/CardApi';
import { EventEmitter } from './components/base/events';
import { mocks } from './types/mocks';
import { ICard, Order, ButtonLabels } from './types';
import { settings } from './utils/constants'
import { Main } from './components/view/screen/Main';
import { cloneTemplate } from './utils/utils';
import { Card } from './components/view/screen/Card'; 
import { ICardView } from './types/view/screen/Card';
import { Modal } from './components/view/partial/Modal';
import { Basket } from './components/view/partial/Basket';

const BASE_URL = process.env.API_ORIGIN;
const API_PATH = '/api/weblarek';
const CDN_PATH = '/content/weblarek';

const mainContainer = document.querySelector(settings.mainSelector) as HTMLTemplateElement;
const cardCatalogTemplate = document.querySelector(settings.cardCatalogTemplate) as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector(settings.cardBasketTemplate) as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector(settings.cardPreviewTemplate) as HTMLTemplateElement;
const basketTemplate = document.querySelector(settings.basketTemplate) as HTMLTemplateElement;
const orderTemplate = document.querySelector(settings.orderInfoTemplate) as HTMLTemplateElement;
const contactsTemplate = document.querySelector(settings.contactsTemplate) as HTMLTemplateElement;
const successTemplate = document.querySelector(settings.successTemplate) as HTMLTemplateElement;
const modalTemplate = document.querySelector(settings.modalTemplate) as HTMLTemplateElement;

const events = new EventEmitter();
const api = new CardApi(BASE_URL, API_PATH, CDN_PATH);
const app = new AppState({}, events);

const main = new Main(mainContainer, events);
const modal = new Modal(modalTemplate, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

type AppStateEvents = {
    cards: {
        changed: 'cards:changed',
        selected: 'cardPreview:selected',
    }
    basket: {
        changed: 'basket:changed';
        add: 'basket:add',
        remove: 'basket:remove',
        open: 'basket:open',
    }
    modal: {
        open: 'modal:open',
        close: 'modal:close',
    },
};

events.on('cards:changed', (cards: Iterable<ICard>) => {
    main.catalog = Array.from(cards).map(cardData => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), events, {
            onClick: () => events.emit('cardPreview:selected', cardData),
        });
        return card.render({
            ...cardData,
            price: app.formatCurrency(cardData.price),
        });
    })
});

events.on('cardPreview:selected', (data: {id: string}) => {
    const cardData = app.getCard(data.id);
    const buttonLabel = app.getBasketCardId().includes(data.id) ? 
        ButtonLabels.inBasket: 
        cardData.price === null ? 
            ButtonLabels.isUnvailable:
            ButtonLabels.isAvailable;
    
    modal.open();
    modal.content = new Card(cloneTemplate(cardPreviewTemplate), events, {
        onClick: () => events.emit('basket:changed', {id: data.id})
            // Think aboyt it 
        // events.emit('cardPreview:update', {id: data.id});
    }).render({
        ...cardData,
        price: app.formatCurrency(cardData.price),
        buttonLabel: buttonLabel,
    });
});

events.on('basket:changed', (data: {id: string}) => {
    if (app.getBasketCardId().includes(data.id)) {
        app.removeCard(data.id);
    } else {
        app.addCard(data.id);
    }
    main.counter = app.getBasketCardId().length;
}) 

events.on('basket:add', (data: {id: string}) => {
    // const cardData = app.getCard(data.id);
    // modal.content = new Card(cloneTemplate(cardPreviewTemplate), events, {
    //     onClick: () => events.emit('basket:changed', {id: data.id})
    // }).render({
    //     ...cardData,
    //     buttonLabel: ButtonLabels.inBasket,
    //     price: app.formatCurrency(cardData.price),
    // });
});

events.on('basket:remove', (data: {id: string}) => {
    // const cardData = app.getCard(data.id);
    // modal.content = new Card(cloneTemplate(cardPreviewTemplate), events, {
    //     onClick: () => events.emit('basket:changed', {id: data.id})
    // }).render({
    //     ...cardData,
    //     buttonLabel: ButtonLabels.isAvailable,
    //     price: app.formatCurrency(cardData.price),
    // });
});

events.on('basket:open', () => {
    modal.open();
    modal.content = basket.render({
        total: app.formatCurrency(app.getTotal()),
        disabled: app.getBasketCardId().length === 0 ? 
            true: 
            false,
        items: app.getBasketCardId().map((cardId, index) => {
            const cardData = app.getCard(cardId);
            return new Card(cloneTemplate(cardBasketTemplate), events, {
                onClick: () => events.emit('basket:changed', {id: cardData.id})
            }).render({
                title: cardData.title,
                price: app.formatCurrency(cardData.price),
                indexLabel: (index +1).toString(),
            });
        })
    });
});

events.on('modal:open', () => {
    main.isLocked = true;
});

events.on('modal:close', () => {
    main.isLocked = false;
});








api.getCards()
    .then(data => app.loadCards(data))
    .catch(err => console.log(err));



// app.loadCards(mocks);
// app.addCard('854cef69-976d-4c2a-a18c-2aa45046c390');
// // app.removeCard('854cef69-976d-4c2a-a18c-2aa45046c390');
// // console.log(app.getBasketCardId())
// // app.clearBasket()
// // console.log(app.getTotal());
// // console.log(app.formatCurrency(750));
// app.setOrderFiedls('email', '@ry');
// app.setOrderFiedls('payment', 'card');
// app.setOrderFiedls('address', '1');
// app.setOrderFiedls('phone', '8');


