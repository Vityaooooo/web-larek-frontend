// Question: Are we need this interface?

import { IClickable } from '../../base/View';

export interface ProductBasketData {
	id: string;
    title: string;
    price: number;
}

export interface TicketSettings extends IClickable<ProductBasketData> {
	id: string;
	title: string;
    price: number;
	delete: string;
}