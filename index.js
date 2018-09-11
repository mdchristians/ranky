'use strict';

const type = require('type-of');

/**
 * RANKY
 * 
 * @param  {array}   options.arr       - The array of objects to be ranked
 * @param  {string}  options.key       - The key to use to rank the data
 * @param  {String}  options.tieString - The string to be used to prefix ties
 * @param  {Boolean} options.size      - The max size of the array returned
 * @param  {String}  options.order     - Order direction (asc or desc)
 * @return {promise}                   - The final rankings
 */
function ranky({arr, key, tieString = 'T', size = false, order = 'asc' }) {
	return new Promise((resolve, reject) => {
		let rankyArr = [];
		
		// Validate arguements before sorting...
		validateArgs(...arguments);

		rankyArr = arr.sort(sortArrayByKey(key));
		rankyArr = applyTieStrings(rankyArr, key, tieString)
		rankyArr = size ? applyLimiter(rankyArr, size, order) : rankyArr;

		resolve(rankyArr);
	})
}


/**
 * Look for matching values in the array of objects so we 
 * can add the "rank" key.
 * 
 * @param  {array} arr        - The array of data to be ranked
 * @param  {string} key       - The key on each object in the array to use to rank
 * @param  {string} tieString - Used to prefix a tied ranking
 * @return {array}            - The final ranked array
 */
function applyTieStrings(arr, key, tieString) {
	for(let i = 0; i < arr.length; i++) {
		arr[i].pos = i + 1;
		arr[i].rank = i + 1;

		// Check the first value of the array
		if(i === 0 && arr[i+1][key] === arr[i][key]) {
			arr[i].rank = tieString + (i + 1);
		}

		// Check the middle of the array
		if(i !== 0  && i !== arr.length - 1) {

			// This value is a tie with the next, but not the last (A new tie)
			if(arr[i][key] !== arr[i-1][key] && arr[i][key] === arr[i+1][key]) {
				arr[i].rank = tieString + (i + 1);
			}

			// Check value against a previous tie (Not a new tie)
			if(arr[i][key] === arr[i-1][key]) {
				arr[i].rank = arr[i-1].rank;
			}
		}

		// Check the last value of the array
		if(i !== 0 && arr[i-1][key] === arr[i][key]) {
			arr[i].rank = arr[i-1]['rank'];
		}
	}

	return arr;
}

/**
 * If a size limiter was specified in the options, we use that to 
 * limit the size of the array that returns
 * 
 * @param  {array}  arr   - The array of objects to be ranked
 * @param  {number} size  - The max size of the array returned
 * @param  {string} order - Order direction (asc or desc)
 * @return {array}        - The array if the specified size
 */
function applyLimiter(arr, size, order) {
	if (order === 'asc') {
		return arr.slice(0, size);
	} 
	
	// Sort the list descending
	else {
		const start = (arr.length - 1) - size;
		const end   = arr.length - 1;

		return arr.slice(((arr.length) - size), arr.length)
	}
}

/**
 * Sorting function used in the sort prototype to compare to values 
 * of a given key
 * 
 * @param  {string} key - The key to use to rank the data
 * @return {integer}    - The result of the comparison
 */
function sortArrayByKey(key) {
	return (a, b) => ((a[key] < b[key]) ? -1 : ((a[key] > b[key]) ? 1 : 0))
}


function validateArgs({ arr, key, tieString, size, order }) {

	// ARRAY => Is an array
	if(type(arr) !== 'array') {
		throw new Error('Must include a valid array');
	}
	
	// ARRAY => Isn't empty
	if(arr.length < 1) {
		throw new Error('The array must contain items to rank');
	}
	
	// KEY => Verify it's a string
	if(type(key) !== 'string') {
		throw new Error('The key must be a valid string');
	}
	
	// SIZE => Making sure we have the default value or a number
	if(size) {
		if(type(size) !== 'number' || size !== false) {
			throw new Error('The size must be a number');
		}
	}

	// ORDER => Must be 'asc' or 'desc'
	if(order) {
		if(order !== 'asc' && order !== 'desc') {
			throw new Error('The order must be either asc or desc');
		}
	}
}

module.exports = ranky;
