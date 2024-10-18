import { ContactsData } from '../partial/Contacts';

export interface ContactsFormData {
	contacts: ContactsData;
	isActive: boolean;
	isDisabled: boolean;
	message: string; 
	total: string;
	isError: boolean; 
}

export interface ContactsFormSettings {
	onChange: (data: ContactsData) => void;
	onClose: () => void;
	onNext: () => void;
	onBack: () => void;
}
