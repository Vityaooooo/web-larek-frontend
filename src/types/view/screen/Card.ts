import { ButtonLabels } from "../..";

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export interface ICard {
    id: string;
    title: string;
    description: string;
    price: string;
    category: string;
    image: string;
    isExpended: boolean;
    isCompact: boolean;
    isAvaliable: boolean;
    buttonLabel: ButtonLabels;
}