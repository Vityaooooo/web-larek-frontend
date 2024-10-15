import { ProductBasketData } from '../partial/ProductBasket';

export interface BasketData {
	products: ProductBasketData[];
	isActive: boolean;
	isDisabled: boolean;
	total: string;
}

export interface BasketSettings {
	onRemove: (id: string) => void;
	onClose: () => void;
	onNext: () => void;
	onBack: () => void;
}
