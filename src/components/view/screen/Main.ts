import { IMain } from '../../../types/view/screen/Main';
import { Component } from '../../base/Component';
import { IEvents } from '../../../types/base/events';
import { settings } from '../../../utils/constants';
import { AppStateEvents } from '../../..';

export class Main extends Component<IMain> {
    protected _catalog: HTMLElement;
    protected _counter: HTMLElement;
    protected _basket: HTMLElement;
    protected wrapper: HTMLElement;
    protected galleryItemConstructor: HTMLElement;

    constructor(protected readonly container: HTMLElement, protected events: IEvents) {
        super(container);

        this._counter = document.querySelector(settings.mainSettings.counter);
        this._basket = document.querySelector(settings.mainSettings.basket);
        this._catalog = document.querySelector(settings.gallerySelector);
        this.wrapper = document.querySelector(settings.mainSettings.wrapper);

        this._basket.addEventListener('click', () => {
            this.events.emit(AppStateEvents.BasketOpen);
        });
    }

    set counter(value: number) {
        this._counter.textContent = value.toString();
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    set isLocked(value: boolean) {
        if (value) {
            this.wrapper.classList.add(settings.mainSettings.lockedClass);
        } else {
            this.wrapper.classList.remove(settings.mainSettings.lockedClass);
        }
    }
}