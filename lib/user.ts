
import * as util from './util'
import * as client from './client'

	/**
	 * Get the profile for the given user
	 * @param {string} user - The user name
	 * @param {function} [callback] - The callback
	 * @return {DiscogsClient|Promise}
	 */

export const getProfile = function(user, callback){
		return client.get('/users/'+util.escape(user), callback);
	};
	
	/**
	 * Get the inventory for the given user
	 * @param {string} user - The user name
	 * @param {object} [params] - Extra params like status, sort and sort_order, pagination
	 * @param {function} [callback] - The callback
	 * @return {DiscogsClient|Promise}
	 */

export const getInventory = function(user, params, callback){
		var path = '/users/'+util.escape(user)+'/inventory';
		if((arguments.length === 2) && (typeof params === 'function')){
			callback = params;
		}else{ // Add pagination params when present
			path = util.addParams(path, params);
		}
		return client.get(path, callback);
	};
	
	/**
	 * Copy the client getIdentity function to the user module
	 */
 
export const getIdentity = client.getIdentity;
	
	/**
	 * Expose the collection functions and pass the client instance
	 * @returns {object}
	 */
	
export * from './collection'
	/**
	 * Expose the wantlist functions and pass the client instance
	 * @returns {object}
	 */
	
export * from './wantlist'
	/**
	 * Expose the list functions and pass the client instance
	 * @returns {object}
	 */
	
export * from './list'
	
	/**
	 * Get the contributions for the given user
	 * @param {string} user - The user name
	 * @param {object} [params] - Optional pagination and sorting params
	 * @param {function} [callback] - The callback
	 * @return {DiscogsClient|Promise}
	 */
	
export const getContributions = function(user, params, callback){
		var path = '/users/'+util.escape(user)+'/contributions';
		if((arguments.length === 2) && (typeof params === 'function')){
			callback = params;
		}else{ // Add pagination params when present
			path = util.addParams(path, params);
		}
		return client.get(path, callback);
	};
	
	/**
	 * Get the submissions for the given user
	 * @param {string} user - The user name
	 * @param {object} [params] - Optional pagination params
	 * @param {function} [callback] - The callback
	 * @return {DiscogsClient|Promise}
	 */
	
export const getSubmissions = function(user, params, callback){
		var path = '/users/'+util.escape(user)+'/submissions';
		if((arguments.length === 2) && (typeof params === 'function')){
			callback = params;
		}else{ // Add pagination params when present
			path = util.addParams(path, params);
		}
		return client.get(path, callback);
	};
	
	/**
	 * Get the lists for the given user
	 * @param {string} user - The user name
	 * @param {object} [params] - Optional pagination params
	 * @param {function} [callback] - The callback
	 * @return {DiscogsClient|Promise}
	 */
	
export const getLists = function(user, params, callback){
		var path = '/users/'+util.escape(user)+'/lists';
		if((arguments.length === 2) && (typeof params === 'function')){
			callback = params;
		}else{ // Add pagination params when present
			path = util.addParams(path, params);
		}
		return client.get(path, callback);
	};