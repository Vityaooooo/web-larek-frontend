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
        
        // Сделать условие если контейнер содержит класс full или compact то нужно добавить необходимые атрибуты
        // this._id = ensureElement<HTMLElement>(settings.cardSettings.id, container);
        // this._buttonDelete = ensureElement<HTMLButtonElement>(settings.cardSettings.delete, container);
        // this._buttonBasket = ensureElement<HTMLButtonElement>(settings.cardSettings.toBasket, container);
        this._image = ensureElement<HTMLImageElement>(settings.cardSettings.image, container);
        this._category = ensureElement<HTMLElement>(settings.cardSettings.category, container);
        // this._description = ensureElement<HTMLElement>(settings.cardSettings.description, container);

        this._title = container.querySelector(settings.cardSettings.title);
        this._price = container.querySelector(settings.cardSettings.price);
    
        // Добавить лисанеры на кнопки если они существуют (IF)

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