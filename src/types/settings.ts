// Типизированные настройки
export interface Settings {
    // views settings
	gallerySelector: string;
	gallerySettings: {
		itemClass: string;
	};

    // cardGalleryTemplate: string; // Question: how call better?
	// cardGallerySettings: {
    //     category: string;
	// 	title: string;
	// 	image: string;
    //     price: string;
	// };

    // Question: how call better?
    cardCatalogTemplate: string;
    cardPreviewTemplate: string;
    cardBasketTemplate: string;
	productSettings: {
		title: string;
		category: string;
		image: string;
		description: string;
        price: string;
        comapactClass: string;
        expandedClass: string;
	};

	pageSelector: string;
	pageSettings: {
		wrapper: string;
		counter: string;
		basket: string;
		// lockedClass: string; // Question: can be useful?
	};

	basketTemplate: string;
	basketSettings: {
		activeItemClass: string;
		itemClass: string;
        totalLabel: string;
	};

	orderTemplate: string;
	orderSettings: {
		// payment: string;
        isCash: string;
        isCard: string;
		address: string;
	};

    contactsTemplate: string;
	contactsSettings: {
		email: string;
		phone: string;
	};

    // Question: can be useful for error order?
	// messageTemplate: string;
	// messageSettings: {
	// 	title: string;
	// 	description: string;
	// 	action: string;
	// };

    // modals settings
	modalTemplate: string;
	modalSettings: {
		close: string;
		content: string;
		activeClass: string; // Question
	};
	cardModal: {
        buttonLabel: string;
        // blockedLabel: string;
        // nextLabel: string;
		// nextSettings: ElementCreator;
	};
	basketModal: {
		// nextLabel: string;
		// nextSettings: ElementCreator;
		totalLabel: string;
	};
	orderModal: {
		// nextLabel: string;
		// nextSettings: ElementCreator;
        errorLabel: string;
	};
    contactsModal: {
        errorLabel: string;
		// nextLabel: string;
		// nextSettings: ElementCreator;
	};
    // Question: why succes looks like this
    // but before we don't use fields of modal
	successModal: {
		// title: string;
		text: string;
		// action: string;
	};

    // model settings
	appState: {
		formatCurrency: (value: number) => string;
    }
}