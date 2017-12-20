import React 				from 'react';
import { renderToString } 	from 'react-dom/server';
import StaticRouter 		from 'react-router-dom/StaticRouter';
import { onPageLoad } 		from 'meteor/server-render';
import {
	ServerStyleSheet,
	StyleSheetManager,
} 							from 'styled-components';
import { Provider } 		from 'react-redux';
import NodeCache 			from 'node-cache';
import { Helmet } 			from 'react-helmet';
import { createStore } 		from 'redux';

import App 					from '/imports/ui/App';
import reducers 			from '/imports/redux/reducers';

// Database
import '/imports/db';
import '/imports/db/publications';
import '/imports/db/hooks';

// Services
//import '/imports/api/UsersService';

// Other API
//import '/imports/api/searchSource';

// Fixtures
import '/imports/fixtures';

const SSRCache = new NodeCache({ stdTTL: 1 * 24 * 60 * 60 * 1000 });

onPageLoad( sink => {
	const sheet = new ServerStyleSheet();

	const { path } = sink.request.url;

	let htmlString = SSRCache.get( path );
	let cachedStyle = SSRCache.get( `${path}_style` );

	const store = createStore( reducers, { activePage: path } );

	if ( !htmlString || !cachedStyle ) {
	 	htmlString = renderToString(
	 		<StyleSheetManager sheet={sheet.instance}>
				<Provider store={store}>
					<StaticRouter context={{}}>
						<App userId={null} />
					</StaticRouter>  
				</Provider>
			</StyleSheetManager>
	 	);

	 	/*
	 	const { title, meta, link } = Helmet.renderStatic(); // Needs to be called after renderToString

		SSRCache.set( `${path}_title`, title.toString() );
		SSRCache.set( `${path}_meta`, meta.toString() );
		SSRCache.set( `${path}_link`, link.toString() );
	 	*/

	 	SSRCache.set( `${path}_style`, sheet.getStyleTags() );
	 	SSRCache.set( path, htmlString );

		cachedStyle = SSRCache.get( `${path}_style` );
	}

	/*
	sink.appendToHead( SSRCache.get( `${path}_title` ) );
	sink.appendToHead( SSRCache.get( `${path}_meta` ) );
	sink.appendToHead( SSRCache.get( `${path}_link` ) );
	*/
	sink.appendToHead( cachedStyle );
	sink.appendToBody(`
		<script>
			window.__PRELOADED_STATE__ = ${JSON.stringify( store.getState() ).replace(/</g, '\\u003c')}
		</script>
	`);

	sink.renderIntoElementById( 'render-target', htmlString );
});