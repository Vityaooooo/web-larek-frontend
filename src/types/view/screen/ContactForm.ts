import { ContactsData } from '../partial/Contacts';

export interface OrderFormData {
	contacts: ContactsData;
	isActive: boolean;
	isDisabled: boolean;
	// message: string; // Question: are we needs it?
	total: string;
	// isError: boolean; // Question: are we needs it?
}

export interface ContactsFormSettings {
	onChange: (data: ContactsData) => void;
	onClose: () => void;
	onNext: () => void;
	onBack: () => void;
}
