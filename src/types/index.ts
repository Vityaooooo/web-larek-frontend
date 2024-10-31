export interface ICard {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
}

export interface IOrderInfo {
    address: string;
    payment: string;
}

export interface IContacts {
    email: string;
    phone: string;
}

export interface Order extends IOrderInfo, IContacts {
    items: string[];
    total: number;
}

export interface OrderResult {
    id: string;
    total: number;
}

export type Payment = 'cash' | 'card';

export enum Message {
    phone = 'Укажите номер телефона',
    email = 'Укажите почту',
    payment = 'укажите способ оплаты',
    address = 'Укажите адресс доставки',
    form = 'Заполните поля',
    no = '',
}

export enum ButtonLabels {
    isAvailable = 'В корзину',
    inBasket = 'В корзине',
    isUnavailable = 'Недоступно',
}

export type FormErrors = Partial<Record<keyof IOrderInfo | keyof IContacts, string>>;