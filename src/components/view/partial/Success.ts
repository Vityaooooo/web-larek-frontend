import { Component } from '../../base/Component';
import { ISuccess } from '../../../types/view/partial/Success';
import { IEvents } from '../../../types/base/events';
import { settings } from '../../../utils/constants';
import { AppStateEvents } from '../../..';

export class Success extends Component<ISuccess> {
    protected _close: HTMLButtonElement;
    protected _total: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);

        this._total = container.querySelector(settings.successSettings.total);
        this._close = container.querySelector(settings.successModal.button);
    
        this._close.addEventListener('click', () => {
            this.events.emit(AppStateEvents.SuccessSubmit);
        })
    }

    set total(value: string) {
        this.setText(this._total, `Списано ${value}`);
    }
}