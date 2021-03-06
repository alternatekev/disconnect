
import queryString from 'querystring'

/**
 * Strip the trailing number from a Discogs artist name Artist (2) -> Artist
 * @param {string} name - The Discogs artist name
 * @return {string}
 */

export const stripVariation = function(name){
	return name.replace(/\s\(\d+\)$/, '');
};

/**
 * Add params to a given url or path
 * @param {string} url - The url to add the extra params to
 * @param {object} data - Data object containing the params
 * @returns {string}
 */

export const addParams = function(url, data){
	if(data && (typeof data === 'object') && (Object.keys(data).length > 0)){
		url = url+((url.indexOf('?')===-1) ? '?' : '&')+queryString.stringify(data);
	}
	return url;
};

/**
 * Escape a string for use in a query string
 * @param {string} str - The string to escape
 * @returns {string}
 */

export const escape = function(str){
	return queryString.escape(str);
};

/**
 * Deep merge two objects
 * @param {object} target - The target object (by reference!)
 * @param {object} source - The source object
 * @returns {object}
 */

export const merge = function merge(target, source){
	for(var key in source){
		if(source[key] && (typeof source[key] === 'object')){
			target[key] = merge((Array.isArray(source[key]) ? [] : {}), source[key]);
		}else{
			target[key] = source[key];
		}
	}
	return target;
};

/**
 * Expose the queuing class
 */
