import { CardData } from "../partial/Card";

export interface CardPreviewData {
	content: CardData;
	isActive: boolean;
	isDisabled: boolean;
    // For free product and set label button
    isUnavailable: boolean;
    isAvailable: boolean;
}

export interface OrderFormSettings {
	onChange: (data: CardData) => void;
	onClose: () => void;
}