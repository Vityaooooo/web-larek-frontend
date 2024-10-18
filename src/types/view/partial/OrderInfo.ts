import { IChangeable } from '../../base/View';

type payment = 'isCard' | 'isCash';

export interface OrderInfoData {
    payment: payment;
	address: string;
}

export interface OrderSettings extends IChangeable<OrderInfoData> {
	isCash: string;
    isCard: string;
	address: string;
}
