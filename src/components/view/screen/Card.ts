import { ICardView, ICardActions } from '../../../types/view/screen/Card';
import { Component } from '../../base/Component';
import { settings } from '../../../utils/constants';
import { IEvents } from '../../../types/base/events';
import { ensureElement } from '../../../utils/utils';
import { ButtonLabels } from '../../../types';

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
            this._id = ensureElement<HTMLElement>(settings.cardSettings.id,this.container);
            this._buttonDelete = ensureElement<HTMLButtonElement>(settings.cardSettings.delete, this.container);
            this._buttonDelete.addEventListener('click', action.onClick);
        } else {
            this._image = ensureElement<HTMLImageElement>(settings.cardSettings.image, this.container);
            this._category = ensureElement<HTMLElement>(settings.cardSettings.category, this.container);
            if (container.classList.contains(settings.cardSettings.expendedClass)) {
                this._description = ensureElement<HTMLElement>(settings.cardSettings.description, this.container);
                this._buttonBasket = ensureElement<HTMLButtonElement>(settings.cardSettings.toBasket, this.container);
                this._buttonBasket.addEventListener('click', action.onClick);
            } else {
                this.container.addEventListener('click', action.onClick);
            }
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

    set buttonLabel(value: ButtonLabels) {
        this._buttonBasket.textContent = value;
        if (value === ButtonLabels.isUnvailable) 
            this.setDisabled(this._buttonBasket, true);
    }

    set indexLabel(value: string) {
        this.setText(this._id, value);
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    set price(value: string) {
        this.setText(this._price, value);
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }
}