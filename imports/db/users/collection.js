import UserSchema from './schema';

const Users = Meteor.users;
const debug = Meteor.isDevelopment;

Users.attachSchema( UserSchema );

if ( debug ) {
	global.Users = Users;
}

export default Users;