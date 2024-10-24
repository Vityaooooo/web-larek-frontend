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
        error: '.form__errors',
        submit: '.order__button',
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
