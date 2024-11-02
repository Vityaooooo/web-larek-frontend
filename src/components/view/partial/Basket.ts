import { IEvents } from '../../../types/base/events';
import { settings } from '../../../utils/constants';
import { IBasket } from '../../../types/view/partial/Basket';
import { Component } from '../../base/Component';

export class Contacts extends Component<IBasket> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);

        this._list = container.querySelector(settings.basketSettings.itemClass)!;
        this._total = container.querySelector(settings.basketSettings.totalLabel)!;
        this._button = container.querySelector(settings.basketModal.button)!;

        this._button.addEventListener('click', () => {
            this.events.emit('basket:submit');
        });
    }

    set list(cards: HTMLElement[]) {
        this._list.replaceChildren(...cards);
    }

    set total(value: string) {
        this.setText(this._total, value);
    }

    set disable(value: boolean) {
        this.setDisabled(this._button, value);
    }
}