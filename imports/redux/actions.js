import { ACTIONS } from './enums';

export const changePageLabel = label => ({
	type: ACTIONS.CHANGE_PAGE_LABEL,
	data: { label },
});