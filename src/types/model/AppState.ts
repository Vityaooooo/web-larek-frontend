import { ICard, IOrderInfo, IContacts } from '../index';

export interface IAppState {
    loadCards(): void
    getCard(id: string): ICard
    addCard(id: string): void;
    removeCard(id: string): void;
    setOrderFiedls(field: keyof IOrderInfo | IContacts, value: string);
    getBasketCardId(): string[];
    formatCurrency(value: number): string;
    clearBasket(): void;
    getTotal(): number;
    setPreview(card: ICard): void;
    validateOrderInfo(): boolean;
    validateContacts(): boolean;
    validateOrder(): boolean;
}