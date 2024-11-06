import { AppStates } from '../..';
import { ICard, IOrderInfo, IContacts, IOrder, Message, FormErrors } from '../index';

export interface IAppState {
    loadCards(cards: ICard[]): void
    getCard(id: string): ICard
    addCard(id: string): void;
    removeCard(id: string): void;
    setOrderFiedls(field: keyof IOrderInfo | keyof IContacts, value: string): void;
    getBasketCardId(): string[];
    getOrder(): IOrder;
    clearOrder(): void;
    formatCurrency(value: number): string;
    clearBasket(): void;
    getTotal(): number;
    setPreview(card: ICard): void;
    validateOrder(): boolean;
    setState(value: AppStates): void;
    getState(): string;
    getMessages(): FormErrors;
}