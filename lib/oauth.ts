import * as queryString from 'querystring'
import * as OAuth from 'oauth-1.0a'
import * as util from './util'
import Client, {defaultConfig as defaultClientConfig} from './client'

/**
 * Default configuration
 */

 export enum defaultConfig {
	requestTokenUrl = 'https://api.discogs.com/oauth/request_token',
	accessTokenUrl = 'https://api.discogs.com/oauth/access_token',
	authorizeUrl = 'https://www.discogs.com/oauth/authorize',
	version = '1.0', 
	signatureMethod = 'PLAINTEXT' // Or HMAC-SHA1
};

/**
 * Object constructor
 * @param {object} [auth] - Authentication object
 * @returns {DiscogsOAuth}
 */

export default function DiscogsOAuth(auth){
	this.config = util.merge({}, defaultConfig);
	this.auth = {method: 'oauth', level: 0};
	if(auth && (typeof auth === 'object') && (auth.method === 'oauth')){
		util.merge(this.auth, auth);
	}
}

/**
 * Override the default configuration
 * @param {object} customConfig - Custom configuration object for Browserify/CORS/Proxy use cases
 * @returns {DiscogsOAuth}
 */
export const setConfig = function(customConfig){
	util.merge(this.config, customConfig);
	return this;
};

/**
 * Get an OAuth request token from Discogs
 * @param {string} consumerKey - The Discogs consumer key
 * @param {string} consumerSecret - The Discogs consumer secret
 * @param {string} callbackUrl - The url for redirection after obtaining the request token
 * @param {function} [callback] - Callback function receiving the data
 * @returns {DiscogsOAuth}
 */
 
export const getRequestToken = function(consumerKey, consumerSecret, callbackUrl, callback){
	var auth = this.auth, config = this.config;
	auth.consumerKey = consumerKey;
	auth.consumerSecret = consumerSecret;
	new Client(defaultClientConfig.userAgent, auth).get({url: config.requestTokenUrl+'?oauth_callback='+OAuth.prototype.percentEncode(callbackUrl), queue: false, json: false}, function(err, data){
		if(!err && data){
			data = queryString.parse(data);
			auth.token = data.oauth_token;
			auth.tokenSecret = data.oauth_token_secret;
			auth.authorizeUrl = config.authorizeUrl+'?oauth_token='+data.oauth_token;
		}
		if(typeof callback === 'function'){ callback(err, auth); }
	});
	return this;
};

/**
 * Get an OAuth access token from Discogs
 * @param {string} verifier - The OAuth 1.0a verification code returned by Discogs
 * @param {function} [callback] - Callback function receiving the data
 * @returns {DiscogsOAuth}
 */
 
export const getAccessToken = function(verifier, callback){
	var auth = this.auth;
	new Client(defaultClientConfig.userAgent, auth).get({url: this.config.accessTokenUrl+'?oauth_verifier='+OAuth.prototype.percentEncode(verifier), queue: false, json: false}, function(err, data){
		if(!err && data){
			data = queryString.parse(data);
			auth.token = data.oauth_token;
			auth.tokenSecret = data.oauth_token_secret;
			auth.level = 2;
			delete auth.authorizeUrl;
		}
		if(typeof callback === 'function'){ callback(err, auth); }
	});
	return this;
};

/**
 * Generic function to return the auth object
 * @returns {object}
 */
export const exportAuth = function(){
	return this.auth;
};

/**
 * Parse the OAuth HTTP header content
 * @param {string} requestMethod - The upper case HTTP request method (GET, POST, etc)
 * @param {string} url - The url that is to be accessed
 * @returns {string}
 */
export const toHeader = function(requestMethod, url){
	var oAuth = new OAuth({
		consumer: {key: this.auth.consumerKey, secret: this.auth.consumerSecret},
		signature_method: this.config.signatureMethod, version: this.config.version
	}),
	authObj = oAuth.authorize({method: requestMethod, url: url}, {key: this.auth.token, secret: this.auth.tokenSecret});
	return oAuth.toHeader(authObj).Authorization;
};