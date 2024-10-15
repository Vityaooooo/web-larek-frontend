import { IClickable } from '../../base/View';

export interface PageData {
	counter: number;
	// isLocked: boolean; // Question: can be useful?
}

export interface PageSettings extends IClickable<never> {
	wrapper: string;
	counter: string;
	basket: string;
	// lockedClass: string; // Question: can be useful?
}
