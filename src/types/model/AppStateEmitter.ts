import { AppStateModals } from './AppState';

// Для корректной обработки событий открытия и закрытия модальных окон
// нам нужно знать предыдущее и текущее состояние.
export type ModalChange = {
	previous: AppStateModals;
	current: AppStateModals;
};
