import { IView } from '../../base/View';

export interface ModalData<C> {
	content: C;
	// message?: string; // Question: are we needs it?
	isActive: boolean;
	// isError?: boolean; // Question: are we needs it?
}

export interface ModalSettings<C> {
	close: string;
	content: string;
	// message: string; // Question: are we needs it?
	contentView: IView<C>;
	activeClass: string;
	// messageErrorClass: string; // Question: are we needs it?
	onOpen?: () => void;
	onClose?: () => void;
}
