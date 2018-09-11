const ranky = require('../index');

// Input data
const data = [
	{ name: 'Ken Morrow', goals: 13, assists: 12, points: 25 },
	{ name: 'Mark Johnson', goals: 8, assists: 21, points: 29 },
	{ name: 'Mike Ramsey', goals: 19, assists: 10, points: 29 },
	{ name: 'Mike Eruzione', goals: 15, assists: 10, points: 25 },
	{ name: 'Dave Silk', goals: 21, assists: 8, points: 29 }
];

// Expected output
const expected = [
	{ name: 'Ken Morrow', goals: 13, assists: 12, points: 25, pos: 1, rank: 'T1' },
    { name: 'Mike Eruzione', goals: 15, assists: 10, points: 25, pos: 2, rank: 'T1' },
    { name: 'Mark Johnson', goals: 8, assists: 21, points: 29, pos: 3, rank: 'T3' },
    { name: 'Mike Ramsey', goals: 19, assists: 10, points: 29, pos: 4, rank: 'T3' },
    { name: 'Dave Silk', goals: 21, assists: 8, points: 29, pos: 5, rank: 'T3' } 
];

describe('Rankings with Multiple Ties', () => {
	const baseOpts = {
		arr: data,
		key: 'points'
	};

	describe('Ascending Rankings', () => {
		test('Returns an array of 5 objects in ascending order with multiple ties', async () => {
			const rankings = await ranky(baseOpts);

			expect(rankings).toHaveLength(5);
			expect(rankings).toEqual(
				expect.arrayContaining(expected)
			)
		})
	});
});
