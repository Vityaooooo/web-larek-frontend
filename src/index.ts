import './scss/styles.scss';
import { AppState } from './components/model/AppState';
import { CardApi } from './components/model/CardApi';
import { EventEmitter } from './components/base/events';
import { mocks } from './types/mocks';
import { ICard, Order } from './types';
import { settings } from './utils/constants'
import { Main } from './components/view/screen/Main';
import { cloneTemplate } from './utils/utils';
import { Card } from './components/view/screen/Card'; 
import { ICardView } from './types/view/screen/Card';

const BASE_URL = process.env.API_ORIGIN;
const API_PATH = '/api/weblarek';
const CDN_PATH = '/content/weblarek';

const mainContainer = document.querySelector(settings.mainSelector) as HTMLTemplateElement;
const cardCatalogTemplate = document.querySelector(settings.cardCatalogTemplate) as HTMLTemplateElement;

const events = new EventEmitter();
const api = new CardApi(BASE_URL, API_PATH, CDN_PATH);
const app = new AppState({}, events);

const main = new Main(mainContainer, events);

events.on('cards:changed', (cards: Iterable<ICard>) => {
    main.catalog = Array.from(cards).map(cardData => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), events, {
            onClick: () => events.emit('card:selected', cardData),
        });

        return card.render({
            ...cardData,
            price: app.formatCurrency(cardData.price),
        });
    })
})

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


