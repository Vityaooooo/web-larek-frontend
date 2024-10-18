import { IView } from '../../base/View';

export interface ModalData<C> {
	content: C;
	isActive: boolean;
}

export interface ModalSettings<C> {
	close: string;
	content: string;
	contentView: IView<C>;
	activeClass: string;
	onOpen?: () => void;
	onClose?: () => void;
}
