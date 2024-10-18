// Алиас селектора элемента
export type SelectorElement<T> = T | string;
// Алиас коллекции селектора элемента
export type SelectorCollection<T> = string | NodeListOf<Element> | T[];

export type ElementChild = HTMLElement | HTMLElement[];

// Теги для универсальной настройки тега
export type ElementAttrs = 
    | 'textContent'
    | 'className'
    | 'src'
    | 'alt'
    | 'dataset';

// настройки элемента
export type ElementProps<T extends HTMLElement> = Partial<
	Record<keyof T, string | boolean | object>
>;

export type ElementValue<T extends HTMLElement> =
	| string
	| ElementChild
	| ElementProps<T>; 


// export type ElementCreator<T extends HTMLElement = HTMLElement> = [
// 	keyof HTMLElementTagNameMap,
// 	ElementProps<T>
// ];