import { ICard, Order, OrderResult } from '../index';


interface ICardApi {
    getCards: () => Promise<ICard[]>;
    orderCards: (order: Order) => Promise<OrderResult>;
}