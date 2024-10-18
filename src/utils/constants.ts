import { Settings } from "../types/settings";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

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
        compactClass: '.card_compact',
        expendedClass: '.card_full',
    },

	pageSelector: '.page',
	pageSettings: {
		wrapper: '.page__wrapper',
		counter: '.header__basket-counter',
		basket: '.header__basket',
		lockedClass: 'page__wrapper_locked', 
	},

	basketTemplate: '#basket',
	basketSettings: {
		activeItemClass: '',
		itemClass: '.basket__item ',
        totalLabel: '.basket__price',
	},

	orderInfoTemplate: '#order',
	orderInfoSettings: {
        isCash: 'button[name=cash]',
        isCard: 'button[name=card]',
		address: 'input[name=address]',
	},

    contactsTemplate: '#contacts',
	contactsSettings: {
		email: 'input[name=email]',
		phone: 'input[name=phone]',
	},
	modalTemplate: '#modal-container',
	modalSettings: {
		close: '.modal__close',
		content: '.modal__content',
		activeClass: 'modal_active',
	},
	cardModal: {
        buttonLabel: '.card__button',
	},
	basketModal: {
		totalLabel: '.basket__price',
	},
	orderModal: {
		errorLabel: '.form__errors',
	},
    contactsModal: {
		errorLabel: '.form__errors',
	},
	successModal: {
		text: '.order-success__description',
	},
    appState: {
		formatCurrency: (value: number) => `${value} синапсов`,
    }
};
