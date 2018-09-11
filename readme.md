<div align="center">
	<br>
	<br>
	<img width="400" src="media/ranky.svg" alt="Ranky">
	<br>
	<br>
</div>

> Rank an array of objects with support for value ties and tie breakers

## Install

```
$ npm install rankyjs
```


## Usage

```js
const ranky = require('rankyjs');

// Input data
const data = [
	{ name: 'Ken Morrow', goals: 13, assists: 13, points: 26 },
	{ name: 'Mark Johnson', goals: 8, assists: 10, points: 18 },
	{ name: 'Mike Ramsey', goals: 15, assists: 6, points: 21 },
	{ name: 'Mike Eruzione', goals: 15, assists: 10, points: 25 },
	{ name: 'Dave Silk', goals: 21, assists: 8, points: 29 }
];

(async () => {
	const options = {
		arr: data,
		key: 'points'
	};

	const rankings = await ranky(options);

	console.log(rankings);
	// [
	// 	{ name: 'Mark Johnson', goals: 8, assists: 10, points: 18, pos: 1, rank: 1 },
    // 	{ name: 'Mike Ramsey', goals: 15, assists: 6, points: 21, pos: 2, rank: 2 },
    // 	{ name: 'Mike Eruzione', goals: 15, assists: 10, points: 25, pos: 3, rank: 3 },
    // 	{ name: 'Ken Morrow', goals: 13, assists: 13, points: 26, pos: 4, rank: 4 },
    // 	{ name: 'Dave Silk', goals: 21, assists: 8, points: 29, pos: 5, rank: 5 }
	// ]
})();
```

## Options

Ranky takes a single parameter that is used to specify a few options when ranking the array of data.

#### arr *(required)*
Type: `array`

The array of objects that will be ranked.

#### key *(required)*
Type: `string`

The key used for sorting the objects within the array.

####  tieString
Type: `string`
Default `T`

The string used to prefix any ties that are found within the rankings. For example, if to values of the given key are identical at 2nd place the rank given for both would be ``${tieString}2``.

####  size
Type: `number`
Default `false`

The amount of items returned in the ranked array - starting from the top of the list.  The size option only accepts a `number`.

####  order
Type: `string`
Default `asc`

Must be either `asc` or `desc`!

## License

MIT © [Matt Christians](https://matt.tc)
