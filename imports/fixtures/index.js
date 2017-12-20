import runAccountsFixtures from './createAccounts';

const debug = Meteor.isDevelopment;

if ( debug ) {
	console.log( "[FIXTURES] Debug mode detected, starting fixtures" );
	runAccountsFixtures();
}
