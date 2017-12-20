import Redux from 'redux';
import reducers from './reducers';

const store = Redux.createStore( reducers, {
	appPageLabel: "Dashboard",
} );

export default store;