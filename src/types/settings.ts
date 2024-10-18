// Типизированные настройки
export interface Settings {
    // views settings
	gallerySelector: string;
	gallerySettings: {
		itemClass: string;
	};

    cardCatalogTemplate: string;
    cardPreviewTemplate: string;
    cardBasketTemplate: string;
    cardSettings: {
        id: string;
        image: string;
	    title: string;
        category: string;
        description: string;
        price: string;
        delete: string;
	    compactClass: string;
        expendedClass: string;
    };

	pageSelector: string;
	pageSettings: {
		wrapper: string;
	    counter: string;
	    basket: string;
	    lockedClass: string; 
	};

	basketTemplate: string;
	basketSettings: {
		activeItemClass: string;
		itemClass: string;
        totalLabel: string;
	};

	orderInfoTemplate: string;
	orderInfoSettings: {
        isCash: string;
        isCard: string;
		address: string;
	};

    contactsTemplate: string;
	contactsSettings: {
		email: string;
		phone: string;
	};

    // modals settings
	modalTemplate: string;
	modalSettings: {
		close: string;
		content: string;
		activeClass: string;
	};
	cardModal: {
        buttonLabel: string;
	};
	basketModal: {
		totalLabel: string;
	};
	orderModal: {
        errorLabel: string;
	};
    contactsModal: {
        errorLabel: string;
	};
	successModal: {
		text: string;
	};

    // model settings
	appState: {
		formatCurrency: (value: number) => string;
    }
}