import { IOrderInfo } from '../../../types';
import { Form } from '../common/Form';
import { IEvents } from '../../../types/base/events';
import { settings } from '../../../utils/constants';

export class Order extends Form<IOrderInfo> {
    protected _cash: HTMLButtonElement;
    protected _card: HTMLButtonElement;
    protected _address: HTMLInputElement;

    constructor(protected readonly container: HTMLFormElement, protected events: IEvents) {
        super(container, events);

        this._cash = container.querySelector(settings.orderInfoSettings.isCash)!;
        this._card = container.querySelector(settings.orderInfoSettings.isCard)!;
        this._address = container.querySelector(settings.orderInfoSettings.address)!;
    
        this._card.addEventListener('click', (evt) => {
            this.events.emit('payment:select', {payment: this._card.name})
        });

        this._cash.addEventListener('click', (evt) => {
            this.events.emit('payment:select', {payment: this._cash.name})
        });
    }

    set address(value: string) {
        this.setText(this._address, value);
    }
}