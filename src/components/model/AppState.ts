import { IEvents } from '../../types/base/events';
import { ICard, IOrder, Message, IOrderInfo, IContacts, FormErrors } from '../../types/index';
import { IAppState } from '../../types/model/AppState';
import { Model } from '../base/Model';
import { AppStates } from '../../index';
import { AppStateEvents } from '../../index';

export class AppState extends Model<{}> implements IAppState {
    protected cards: Map<string, ICard> = new Map();
    protected basket: Map<string, ICard> = new Map();
    protected order: IOrder = {
        total: 0,
        items: [],
        address: '',
        email: '',
        phone: '',
        payment: '',
    };
    protected _messages: FormErrors = {}; 
    protected preview: string | null;
    protected _state: string | null;
    
    constructor(data: Partial<{}>, protected events: IEvents) {
        super(data, events);
    }

    loadCards(cards: ICard[]) {
        cards.map(card => this.cards.set(card.id, card));
        this.emitChanges(AppStateEvents.CardsChanged, this.cards.values());
    }

    getCard(id: string) {
        return this.cards.get(id);
    }

    addCard(id: string) {
        this.basket.set(id, this.getCard(id))
        this.emitChanges(AppStateEvents.StateUpdate, {id});
    }

    removeCard(id: string) {
        this.basket.delete(id);
        this.emitChanges(AppStateEvents.StateUpdate, {id});
    }

    setOrderFiedls(field: keyof IOrderInfo | keyof IContacts, value: string) {
        this.order[field] = value;

        if (this.validateOrder()) {
            this.order.items = this.getBasketCardId();
            this.order.total = this.getTotal();
        }
    }

    validateOrder() {
        const error: typeof this._messages = {};

        if (!this.order.address) error.address = Message.address;
        if (!this.order.payment) error.payment = Message.payment;
        if (!this.order.email) error.email = Message.email;
        if (!this.order.phone) error.phone = Message.phone;
        
        this._messages = error;

        return Object.keys(this._messages).length === 0;
    }

    getBasketCardId() {
        return Array.from(this.basket.keys());
    }

    getOrder() {
        return this.order;
    }

    clearBasket() {
        this.basket.clear();
    }

    clearOrder() {
        this.order = {
            total: 0,
            items: [],
            address: '',
            email: '',
            phone: '',
            payment: '',
        };
    }

    getTotal() {
        let total: number = 0;
        this.basket.values();
        for (let cardBasket of this.basket.values()) {
            total += cardBasket.price;
        }
        return total;
    }

    setPreview(card: ICard) {
        this.preview = card.id;
        this.emitChanges(AppStateEvents.CardPreviewOpen, card);
    }

    formatCurrency(value: number) {
        if (value === null ) return 'Бесценно';
        if (value % 10 === 1 )
            return value.toString() + ' синапс';
        if (value % 10 <= 4 && value % 10 >= 2)
            return value.toString() + ' синапса';
        return value.toString() + ' синапсов';
    }

    getMessages() {
        return this._messages;
    }

    setState(value: AppStates) {
        this._state = value;
    }

    getState() {
        return this._state;
    }
}