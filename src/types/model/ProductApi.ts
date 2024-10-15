export interface Product {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
}

export interface OrderInfo {
    address: string;
    payment: string;
}

export interface Contacts {
    email: string;
    phone: string;
}

export interface Order extends OrderInfo, Contacts {
    items: Product[];
    total: number;
}

export interface OrderResult extends Order {
    id: string;
}

export interface IProductApi {
    getProducts: () => Promise<Product[]>;
    orderProducts: (order: Order) => Promise<OrderResult>;
}