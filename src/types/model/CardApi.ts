import { ICard, Order, OrderResult } from '../index';

export interface ICardApi {    
    getCards: () => Promise<ICard[]>;
    orderCards: (order: Order) => Promise<OrderResult>;
}