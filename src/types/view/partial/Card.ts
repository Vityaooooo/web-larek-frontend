import { IClickable } from '../../base/View';

export interface CardData {
	id: string; // Question: Why we have here id?
	image: string;
	title: string;
    category: string;
    price: string;
}

// Question: it is rigth?
export interface CardSettings extends IClickable<string> {
	image: string;
	title: string;
    category: string;
    price: string;
	compactClass: string;
    expendedClass: string;
	isCompact: boolean;
    isExpended: boolean;
}
