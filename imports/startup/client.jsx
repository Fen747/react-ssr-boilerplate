import React 					from 'react';
import { hydrate } 				from 'react-dom';
import { Provider } 			from 'react-redux';
import { BrowserRouter } 		from 'react-router-dom';
import injectTapEventPlugin 	from 'react-tap-event-plugin';
import { withTracker } 			from 'meteor/react-meteor-data';

import App 						from '/imports/ui/App';
import { store } 				from '/imports/redux';

injectTapEventPlugin();

const AppWrapper = withTracker( appProps => {
	const userId = Meteor.userId();

	return ({ userId });
})( ({ userId }) => (
	<Provider store={store}>
		<BrowserRouter>
			<App userId={userId} />
		</BrowserRouter>  
	</Provider>
) );

Meteor.startup( f => {
	hydrate(
		<AppWrapper />	
	 	, document.getElementById('render-target')
	);
} );