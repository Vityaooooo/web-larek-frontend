import { OrderInfoData } from '../partial/OrderInfo';

export interface OrderFormData {
	contacts: OrderInfoData;
	isActive: boolean;
	isDisabled: boolean;
	// message: string; // Question: are we needs it?
	total: string;
	// isError: boolean; // Question: are we needs it?
}

export interface OrderFormSettings {
	onChange: (data: OrderInfoData) => void;
	onClose: () => void;
	onNext: () => void;
	onBack: () => void;
}
