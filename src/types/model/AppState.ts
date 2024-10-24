import { ICard, Order, Message, IOrderInfo, IContacts } from '../index';

export interface IAppState {
    cards: Map<string, ICard>
    basket: Map<string, ICard>
    order: Order;
    message: Message;
    isError: boolean;
    isOrderReady: boolean;
    preview: string | null;

    loadCards(): void;
    getCard(id: string): ICard;
    orderCards(order: Order): void;
    addCard(id: string): void;
    removeCard(id: string): void;
    setOrderFiedls(field: keyof IOrderInfo | IContacts, value: string);
}