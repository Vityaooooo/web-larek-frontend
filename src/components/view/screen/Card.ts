import { ICardView, ICardActions } from '../../../types/view/screen/Card';
import { Component } from '../../base/Component';
import { settings } from '../../../utils/constants';
import { IEvents } from '../../../types/base/events';
import { ensureElement } from '../../../utils/utils';

const enum Categories {
    soft = 'софт-скил',
    hard = 'хард-скил',
    other = 'другое',
    button = 'кнопка',
    additional = 'дополнительное',
}

export class Card extends Component<ICardView> {
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _description: HTMLElement;
    protected _buttonBasket: HTMLButtonElement;
    protected _buttonDelete: HTMLButtonElement;
    protected _id: HTMLElement;

    constructor(protected readonly container: HTMLElement, protected events: IEvents, action?: ICardActions) {
        super(container);
        
        this._title = container.querySelector(settings.cardSettings.title);
        this._price = container.querySelector(settings.cardSettings.price);


        if (container.classList.contains(settings.cardSettings.compactClass)) {
            this._id = ensureElement<HTMLElement>(settings.cardSettings.id, container);
            this._buttonDelete = ensureElement<HTMLButtonElement>(settings.cardSettings.delete, container);
            // @TODO: add eventListener to button
            this._buttonBasket.addEventListener('click', () => {
                this.events.emit('basket:changed', {id: this.container.dataset.id});
            });
        } else {
            if (container.classList.contains(settings.cardSettings.expendedClass)) {
                this._description = ensureElement<HTMLElement>(settings.cardSettings.description, container);
                this._buttonBasket = ensureElement<HTMLButtonElement>(settings.cardSettings.toBasket, container);
                // @TODO: add eventListener to button
                this._buttonBasket.addEventListener('click', () => {
                    this.events.emit('basket:changed', {id: this.container.dataset.id})
                })
            } 
            this._image = ensureElement<HTMLImageElement>(settings.cardSettings.image, container);
            this._category = ensureElement<HTMLElement>(settings.cardSettings.category, container);
            // @TODO: add eventListener to button
            this.container.addEventListener('click', () => {
                this.events.emit('preview:changed', {id: this.container.dataset.id})
            })
        }
    }

    set image(value: string) {
        this.setImage(this._image, value);
    }

    set category(value: string) {
        if (value === Categories.soft) this._category.classList.add(settings.cardCategory.soft);
        if (value === Categories.hard) this._category.classList.add(settings.cardCategory.hard);
        if (value === Categories.additional) this._category.classList.add(settings.cardCategory.additional);
        if (value === Categories.other) this._category.classList.add(settings.cardCategory.other);
        if (value === Categories.button) this._category.classList.add(settings.cardCategory.button);
        
        this.setText(this._category, value);
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    set price(value: string) {
        this.setText(this._price, value);
        if (value === 'Бесценно' && this._buttonBasket) {
            this.setDisabled(this._buttonBasket, true);
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }


}