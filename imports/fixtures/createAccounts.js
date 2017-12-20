import {
	USERS_COUNT,
} from './config';

import { Users } from '/imports/db';

const createAdminUsers = () => {
	console.log( "::: create admin users" );

	const _id = Accounts.createUser({
		email: "user@txm.com",
		password: "txm",
	});

	Roles.addUsersToRoles( _id, ['support', 'admin'] );
};

const createUsers = ( users_count = 0 ) => {
	console.log( `::: create ${users_count} users` );

	// create users here
};

const runAccountsFixtures = () => {
	console.log( "[FIXTURES] Run accounts fixtures..." );
	
	if ( !Users.find().count() ) {
		createUsers( USERS_COUNT );
		createAdminUsers();
	}
};

export default runAccountsFixtures;