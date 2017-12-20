/**
 * Local consts
 */
export const DBTimeZone = -1.00; // time zone value from database * -1
export const DBTimeZoneOffset = -60; // time zone value from database

/**
 * Chaining methods
 */
export const comp = ( ...funcs ) => ( reduce( ( res, func ) => func( res ) )( funcs ) );
export const pipe = ( funcs, init ) => ( reduce( ( res, func ) => func( res ) )( funcs )( init ) );

/**
 * Array methods
 */
export const sort = ( array, iteratee ) => array.sort( iteratee );
export const filter = ( array, iteratee ) => array.filter( iteratee );
export const push = ( array, item ) => array.push( item );
export const map = ( array, iteratee ) => array.map( iteratee );
export const each = ( array, iteratee ) => array.forEach( iteratee );
export const reduce = func => array => init => array.reduce( func, init );

/**
 * Collection methods
 */
export const find = ( coll, selector = {}, projection = {} ) => coll.find( selector, projection );
export const fetch = ( ...args ) => find.apply( this, args ).fetch();
export const count = ( ...args ) => find.apply( this, args ).count();
export const insert = ( coll, fields ) => coll.insert( fields );
export const remove = ( coll, selector ) => coll.remove( selector );
export const update = ( coll, selector = {}, modifier, multi = false ) => coll.update( selector, modifier, { multi } );
export const findOne = ( coll, selector = {}, projection ={} ) => coll.findOne( selector, projection );
export const aggregate = ( coll, pipes ) => coll.aggregate( pipes );
export const observe = ( cursor, cbks ) => cursor.observeChanges( cbks );
export const getDocsById = ( coll, _id = "", _fields = [], limit = 0, sort = { _id: -1 } ) => {
	check( coll, Mongo.Collection );
	check( _id, Match.OneOf( String, [String] ) );
	check( _fields, [String] );
	check( limit, Number );
	check( sort, Object );

    const method = (_id.length ) ? 'findOne' : 'find';
	const fields = {};

	if ( _fields ) _fields.forEach( field => { fields[ field ] = true } );

	return ( coll[ method ]( { _id }, { fields, sort, limit } ) );
};

/**
 * Text methods
 */
export const getNbWord = str => filter( split( str, /[\s\n]/ ), word => word && word != " " ).length;
export const split = ( text, pattern ) => text.split( pattern );

/**
 * Date methods
 */
export const timestamp = date => ( ( date && date.getTime() ) || now() );
export const now = f => Date.now();
export const today = ( date = new Date() ) => {
	date.setHours(0,0,0,0);
	return ( date );
};
export const getXDayBefore = ( nbDay, date = new Date() ) => {
	const newDate = new Date( date );
	newDate.setDate( date.getDate() - nbDay );
	newDate.setHours(0,0,0,0);
	return ( newDate );
};
export const startOfTheWeek = ( date = today() ) => {
	const day = date.getDay();
	const diff = date.getDate() - day;
	const firstDayOfTheWeek = new Date( date.setDate( diff ) );

	firstDayOfTheWeek.setHours(0,0,0,0);

  return ( firstDayOfTheWeek );
};
export const getDBTs = ( date = new Date() ) => ( timestamp( date ) - ( ( new Date().getTimezoneOffset() - DBTimeZoneOffset ) * 60 * 1000 ) ) - ( 3600000 ); // glutte pour gérer le temps d'été
export const getDBDate = ( date = new Date() ) => ( new Date( getDBTs( date ) ) );

global.getDBTs = getDBTs;

/**
 * Number methods
 */
export const random = Math.random;
export const floor = Math.floor;
export const isOdd = n => !!( n % 2 );
export const getPct = ( numerator, denominator ) => ( numerator / denominator );
export const fixedDec = ( number, nDec = 1 ) => Number( number.toFixed( nDec ) );

/**
 * URL methods
 */
export const withoutQueryParams = url => url.split('?')[0]

/**
 * Misc methods
 */
export const copy = arg => ( ( arg instanceof Array ) ? [...arg] : {...arg} );

/**
 * Regexp methods
 */
export const buildRegExp = searchText => {
  const words = searchText.trim().split(/[ \-\:]+/);
  const exps = words.map( word => "(?=.*" + word + ")" );
  const fullExp = exps.join('') + ".+";

  return ( new RegExp( fullExp, 'i' ) );
}

// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

export const isMobile = f => (/Mobi/.test(navigator.userAgent));