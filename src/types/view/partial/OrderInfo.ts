import { IChangeable } from '../../base/View';

export interface OrderInfoData {
	isCash?: boolean;
    isCard?: boolean;
	address: string;
}

export interface OrderSettings extends IChangeable<OrderInfoData> {
	isCash?: boolean;
    isCard?: boolean;
	address: string;
}
