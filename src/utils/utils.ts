import { SelectorElement, SelectorCollection, ElementProps, ElementChild } from '../types/index';

/**
 * Трансформация стиля строки в Kebab
 * @param value
 */
export function pascalToKebab(value: string): string {
    return value.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Проверка на селектор (не гарантирует что это так и есть, проверяет что это строка)
 * @param x
 */
export function isSelector(x: any): x is string {
    return (typeof x === "string") && x.length > 1;
}
 
/**
 * Проверка на "пустоту"
 * @param x
 */
export function isEmpty(value: any): boolean {
    return value === null || value === undefined;
}

/**
 * Проверка на простой объект
 * @param obj
 */
export function isPlainObject(obj: unknown): obj is object {
    const prototype = Object.getPrototypeOf(obj);
    return  prototype === Object.getPrototypeOf({}) ||
        prototype === null;
}

/**
 * Проверка на логическое значение 
 * @param v
 */
export function isBoolean(v: unknown): v is boolean {
    return typeof v === 'boolean';
}

/**
 * Создание класса по методологии БЭМ
 * @param block 
 * @param element 
 * @param modifier
 */
export function bem(block: string, element?: string, modifier?: string): { name: string, class: string } {
    let name = block;
    if (element) name += `__${element}`;
    if (modifier) name += `_${modifier}`;
    return {
        name,
        class: `.${name}`
    };
}

/**
 * Для использования элемента или массива элементов в element.replaceChildren
 * @param x
 */
export function isChildElement(x: unknown): x is ElementChild {
	return x instanceof HTMLElement || Array.isArray(x);
}

/**
 * Убеждается что все элементы существуют
 * @param selectorElement
 * @param context
 */
export function ensureAllElements<T extends HTMLElement>(selectorElement: SelectorCollection<T>, context: HTMLElement = document as unknown as HTMLElement): T[] {
    if (isSelector(selectorElement)) {
        return Array.from(context.querySelectorAll(selectorElement)) as T[];
    }
    if (selectorElement instanceof NodeList) {
        return Array.from(selectorElement) as T[];
    }
    if (Array.isArray(selectorElement)) {
        return selectorElement;
    }
    throw new Error(`Unknown selector element`);
}

/**
 * Убеждается что элемент существует
 * @param selectorElement — может быть селектором, элементом или коллекцией элементов
 * @param context
 */
export function ensureElement<T extends HTMLElement>(selectorElement: SelectorElement<T>, context?: HTMLElement): T {
    if (isSelector(selectorElement)) {
        const elements = ensureAllElements<T>(selectorElement, context);
        if (elements.length > 1) {
            console.warn(`selector ${selectorElement} return more then one element`);
        }
        if (elements.length === 0) {
            throw new Error(`selector ${selectorElement} return nothing`);
        }
        return elements.pop() as T;
    }
    if (selectorElement instanceof HTMLElement) {
        return selectorElement as T;
    }
    throw new Error('Unknown selector element');
}


/**
 * Клонирует элемент из тега template
 * @param query 
 */
export function cloneTemplate<T extends HTMLElement>(query: string | HTMLTemplateElement): T {
    const template = ensureElement(query) as HTMLTemplateElement;
    return template.content.firstElementChild.cloneNode(true) as T;
}

/**
 * Получение свойств объектов
 * @param obj 
 * @param filter
 */
export function getObjectProperties(obj: object, filter?: (name: string, prop: PropertyDescriptor) => boolean): string[] {
    return Object.entries(
        Object.getOwnPropertyDescriptors(
            Object.getPrototypeOf(obj)
        )
    )
        .filter(([name, prop]: [string, PropertyDescriptor]) => filter ? filter(name, prop) : (name !== 'constructor'))
        .map(([name, prop]) => name);
}

/**
 * Устанавливает dataset атрибуты элемента
 * @param el 
 * @param data
 */
export function setElementData<T extends Record<string, unknown> | object>(el: HTMLElement, data: T) {
    for (const key in data) {
        el.dataset[key] = String(data[key]);
    }
}

/**
 * Получает типизированные данные из dataset атрибутов элемента
 * @param el 
 * @param scheme
 */
export function getElementData<T extends Record<string, unknown>>(el: HTMLElement, scheme: Record<string, Function>): T {
    const data: Partial<T> = {};
    for (const key in el.dataset) {
        data[key as keyof T] = scheme[key](el.dataset[key]);
    }
    return data as T;
}

/**
 * Фабрика DOM-элементов в простейшей реализации
 * здесь не учтено много факторов
 * в интернет можно найти более полные реализации
 * @param tagName
 * @param props
 * @param children
 */
export function createElement<
    T extends HTMLElement
    >(
    tagName: keyof HTMLElementTagNameMap,
    props?: Partial<Record<keyof T, string | boolean | object>>,
    children?: HTMLElement | HTMLElement []
): T {
    const element = document.createElement(tagName) as T;
    if (props) {
        setElementProps(element, props);
    }
    if (children) {
        setElementChildren(element, children);
    }
    return element;
}

/**
 * Устанавливает свойства элемента
 * @param element
 * @param props
 */
export function setElementProps<T extends HTMLElement>(
	element: HTMLElement,
	props: ElementProps<T>
) {
	for (const key in props) {
		const value = props[key];
		if (isPlainObject(value) && key === 'dataset') {
			setElementData(element, value);
		} else {
			// @ts-expect-error fix indexing later
			element[key] = isBoolean(value) ? value : String(value);
		}
	}
}

/**
 * Устанавливает дочерние элементы
 * @param root
 * @param children
 */
export function setElementChildren(root: HTMLElement, children: ElementChild) {
	root.replaceChildren(...(Array.isArray(children) ? children : [children]));
}