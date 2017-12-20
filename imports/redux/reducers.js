import { ACTIONS } from './enums';

const reducers = function( state, { type, data } ){
	switch ( type ) {
		case ACTIONS.CHANGE_PAGE_LABEL: {
			const { label } = data;

			return ({...state, appPageLabel: label });
		}
	}

	return ( state );
};

export default reducers;
