/**
 * Discogs generic error
 * @param {number} [statusCode] - A HTTP status code
 * @param {string} [message] - The error message
 * @returns {DiscogsError}
 */

function DError(statusCode, message){
	Error.captureStackTrace(this, this.constructor);
	this.statusCode = statusCode||404;
	this.message = message||'Unknown error.';
}

export const DiscogsError = Object.create(Error.prototype, {
	constructor: { value: DError },
	name: { value: 'DiscogsError' },
	toString: {
		value: function () {
			return this.name + ': ' + this.statusCode + ' ' + this.message;
		}
	}
});

/**
 * Discogs authorization error
 * @returns {AuthError}
 */

export function AError(){
	Error.captureStackTrace(this, this.constructor);
}
export const AuthError = Object.create(DiscogsError.prototype, {
	constructor: {value: AError},
	name: {value: 'AuthError'},
	message: {value: 'You must authenticate to access this resource.'},
	statusCode: {value: 401}
});
