import { OrderInfoData } from '../partial/OrderInfo';

export interface OrderInfoFormData {
	orderInfo: OrderInfoData;
	isActive: boolean;
	isDisabled: boolean;
	message: string; 
	total: string;
	isError: boolean; 
}

export interface OrderFormSettings {
	onChange: (data: OrderInfoData) => void;
	onClose: () => void;
	onNext: () => void;
	onBack: () => void;
}
