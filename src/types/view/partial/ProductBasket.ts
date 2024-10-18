import { IClickable } from '../../base/View';

export interface ProductBasketData {
	id: string;
    title: string;
    price: number;
}

export interface ProductBasketSettings extends IClickable<ProductBasketData> {
	id: string;
	title: string;
    price: string;
	delete: string;
}