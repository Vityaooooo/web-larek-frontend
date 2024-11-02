import { Component } from '../../base/Component';
import { IModal } from '../../../types/view/partial/Modal';
import { IEvents } from '../../../types/base/events';
import { settings } from '../../../utils/constants';

export class Modal extends Component<IModal> {
    protected _content: HTMLElement;
    protected _closeButton: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);

        this._content = container.querySelector(settings.modalSettings.content)!;
        this._closeButton = container.querySelector(settings.modalSettings.close)!;

        this._closeButton.addEventListener('click', () => this.close());
        this.container.addEventListener('click', () => this.close());
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.toggleClass(this.container, settings.modalSettings.activeClass);
        this.events.emit('modal:open');
    }

    close() {
        this.toggleClass(this.container, settings.modalSettings.activeClass);
        // Question
        // this.content = null;
        this.events.emit('modal:close');
    }

    render(data: IModal): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}