import { IClickable } from '../../base/View';

export interface CardData {
	id: string;
	image: string;
	title: string;
	description: string;
    category: string;
    price: string;
}

export interface CardSettings extends IClickable<string> {
	image: string;
	title: string;
    category: string;
	description: string;
    price: string;
	compactClass: string;
    expendedClass: string;
	isCompact: boolean;
    isExpended: boolean;
}
