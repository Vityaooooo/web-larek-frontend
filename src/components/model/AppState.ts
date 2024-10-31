import { IEvents } from '../../types/base/events';
import { ICard, Order, Message, IOrderInfo, IContacts, FormErrors } from '../../types/index';
import { IAppState } from '../../types/model/AppState';
import { Model } from '../base/Model';

export class AppState extends Model<{}> implements IAppState {
    protected cards: Map<string, ICard> = new Map();
    protected basket: Map<string, ICard> = new Map();
    protected order: Order = {
        total: 0,
        items: [],
        address: '',
        email: '',
        phone: '',
        payment: '',
    };
    protected messages: FormErrors = {}; 
    protected preview: string | null;
    
    constructor(data: Partial<{}>, protected events: IEvents) {
        super(data, events);
    }

    loadCards(cards: ICard[]) {
        cards.map(card => this.cards.set(card.id, card));
        this.emitChanges('cards:changed', this.cards.values());
    }

    getCard(id: string) {
        return this.cards.get(id)!;
    }

    addCard(id: string) {
        const card = this.getCard(id)!;
        this.basket.set(card.id, card);
        this.emitChanges('basket:changed');
        // or
        // this.basket.set(id, this.getCard(id)!);
        // this.emitChanges('basket:changed');
    }

    removeCard(id: string) {
        this.basket.delete(id);
        this.emitChanges('basket:changed');
    }

    setOrderFiedls(field: keyof IOrderInfo | keyof IContacts, value: string) {
        this.order[field] = value;

        if (this.validateOrder()) {
            this.order.items = this.getBasketCardId();
            this.order.total = this.getTotal();
            this.emitChanges('order:ready', this.order);
        }
    }

    validateOrder() {
        const error: typeof this.messages = {};

        if (!this.order.address) error.address = Message.address;
        if (!this.order.payment) error.payment = Message.payment;
        if (!this.order.email) error.email = Message.email;
        if (!this.order.phone) error.phone = Message.phone;
        
        this.messages = error;
        this.emitChanges('formErrors:change', this.messages);

        return Object.keys(this.messages).length === 0;
    }

    getBasketCardId() {
        return Array.from(this.basket.keys());
    }

    // getOrder() {
    //     this.order.items = Array.from(this.getBasketCardId());
    //     this.order.total = this.getTotal();
    //     return this.order;
    // }

    clearBasket() {
        this.basket.clear();
        this.emitChanges('basket:changed');
    }

    getTotal() {
        let total: number = 0;
        this.basket.values();
        for (let cardBasket of this.basket.values()) {
            total += cardBasket.price;
        }
        return total;
    }
    // Don't check
    setPreview(card: ICard) {
        this.preview = card.id;
        this.emitChanges('preview:changed', card);
    }

    formatCurrency(value: number) {
        if (value === null ) return 'Бесценно';
        if (value % 10 === 1 )
            return value.toString() + ' синапс';
        if (value % 10 <= 4 && value % 10 >= 2)
            return value.toString() + ' синапса';
        return value.toString() + ' синапсов';
    }
}