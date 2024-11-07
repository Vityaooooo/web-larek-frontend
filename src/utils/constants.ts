import { Settings } from "../types/settings";

export const API_URL = `/api/weblarek`;
export const CDN_URL = `/content/weblarek`;

// Список событий
export enum appStateEvents {
	// state events
	StateUpdate = 'state:update', 
    // cards events
    CardsChanged = 'cards:changed',
    // cardPreview events
    CardPreviewOpen= 'cardPreview:open', 
    // basket events
    BasketOpen = 'basket:open',
    BasketChanged = 'basket:changed',
    BasketSubmit = 'basket:submit',
    // order events
    OrderSubmit = 'order:submit',
    PaymentSelected = 'payment:select',
    // contacts events
    ContactsSubmit = 'contacts:submit',
    // success events 
    SuccessSubmit = 'success:submit',
    // modal events
    ModalOpen = 'modal:open',
    ModalClose = 'modal:close',
}

export const appStateEventPatterns = {
    OrderInputChange: /^order\..*:change/,
    ContactsInputChange: /^contacts\..*:change/,
}


export const settings: Settings = {
    gallerySelector: '.gallery',
	gallerySettings: {
		itemClass: '.gallery__item',
	},

    cardCatalogTemplate: '#card-catalog',
    cardPreviewTemplate: '#card-preview',
    cardBasketTemplate: '#card-basket',
    cardSettings: {
        id: '.basket__item-index',
        title: '.card__title',
		category: '.card__category',
		image: '.card__image',
		description: '.card__text',
        price: '.card__price',
        delete: '.basket__item-delete',
		toBasket: '.card__button',
        compactClass: 'card_compact',
        expendedClass: 'card_full',
    },

	cardCategory: {
		soft: 'card__category_soft',
		other: 'card__category_other',
		hard: 'card__category_hard',
		button: 'card__category_button',
		additional: 'card__category_additional',
	},

	mainSelector: '.page',
	mainSettings: {
		wrapper: '.page__wrapper',
		counter: '.header__basket-counter',
		basket: '.header__basket',
		lockedClass: 'page__wrapper_locked', 
	},

	basketTemplate: '#basket',
	basketSettings: {
        itemsList: '.basket__list',
		itemClass: '.basket__item ',
        totalLabel: '.basket__price',
	},

    formSettings: {
		order_name: 'order',
		contacts_name: 'contacts',
        error: '.form__errors',
        submit_order: '.order__button',
		submit_contacts: '.contacts__button',
    },

	orderInfoTemplate: '#order',
	orderInfoSettings: {
        isCash: 'button[name=cash]',
        isCard: 'button[name=card]',
		address: 'input[name=address]',
		button_active: 'button_alt-active',
		button_unactive: 'button_alt',
	},

    contactsTemplate: '#contacts',
	contactsSettings: {
		email: 'input[name=email]',
		phone: 'input[name=phone]',
	},

    successTemplate: '#success',
    successSettings: {
        total: '.order-success__description',
    },

	modalTemplate: '#modal-container',
	modalSettings: {
		close: '.modal__close',
		content: '.modal__content',
		activeClass: 'modal_active',
	},

	cardModal: {
        button: '.card__button',
	},

	basketModal: {
		button: '.basket__button',
	},

	successModal: {
		button: '.order-success__close',
	},
};
