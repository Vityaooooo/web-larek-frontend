import { IOrderInfo, Payment, Message } from '../../../types';
import { Form } from '../common/Form';
import { IEvents } from '../../../types/base/events';
import { settings } from '../../../utils/constants';
import { AppStateEvents } from '../../..';

export class Order extends Form<IOrderInfo> {
    protected _cash: HTMLButtonElement;
    protected _card: HTMLButtonElement;
    protected _address: HTMLInputElement;

    constructor(protected readonly container: HTMLFormElement, protected events: IEvents) {
        super(container, events);

        this._cash = container.querySelector(settings.orderInfoSettings.isCash)!;
        this._card = container.querySelector(settings.orderInfoSettings.isCard)!;
        this._address = container.querySelector(settings.orderInfoSettings.address)!;
    
        this._card.addEventListener('click', () => {
            this.events.emit(AppStateEvents.PaymentSelected, {payment: this._card.name})
        });

        this._cash.addEventListener('click', () => {
            this.events.emit(AppStateEvents.PaymentSelected, {payment: this._cash.name})
        });
    }

    set address(value: string) {
        this._address.value = value;
    }
    
    set payment(value: string) {
        this.toggleClass(this._card, settings.orderInfoSettings.button_active, false);
        this.toggleClass(this._cash, settings.orderInfoSettings.button_active, false);
        
        if (value === Payment.card) {
            this.toggleClass(this._card, settings.orderInfoSettings.button_active, true);
            }

        if (value === Payment.cash) {
            this.toggleClass(this._cash, settings.orderInfoSettings.button_active, true);
        }
    }
}