import { CardData } from "../partial/Card";

export enum buttonLabel {
    inBasket = 'Удалить', // Maybe do it 'В корзине'
    unavailable = 'Недоступно',
    available = 'В корзину',
}

export interface CardPreviewData {
	content: CardData;
	isActive: boolean;
	isDisabled: boolean;
    // For free product and set label button
    isUnavailable: boolean;
    isAvailable: boolean;
    inBasket: boolean;
}

export interface CardPreviewSettings {
	onChange: (data: CardData) => void;
	onClose: () => void;
}