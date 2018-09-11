const ranky = require('../index');

// Input data
const data = [
	{ name: 'Ken Morrow', goals: 13, assists: 12, points: 25 },
	{ name: 'Mark Johnson', goals: 8, assists: 10, points: 18 },
	{ name: 'Mike Ramsey', goals: 15, assists: 6, points: 21 },
	{ name: 'Mike Eruzione', goals: 15, assists: 10, points: 25 },
	{ name: 'Dave Silk', goals: 21, assists: 8, points: 29 }
];

// Expected output
const expected = [
	{ name: 'Mark Johnson', goals: 8, assists: 10, points: 18, pos: 1, rank: 1 },
    { name: 'Mike Ramsey', goals: 15, assists: 6, points: 21, pos: 2, rank: 2 },
    { name: 'Ken Morrow', goals: 13, assists: 12, points: 25, pos: 3, rank: 'T3' },
    { name: 'Mike Eruzione', goals: 15, assists: 10, points: 25, pos: 4, rank: 'T3' },
    { name: 'Dave Silk', goals: 21, assists: 8, points: 29, pos: 5, rank: 5 }
];

describe('Rankings with a Single Tie', () => {
	describe('Ascending Rankings', () => {
		const baseOpts = {
			arr: data,
			key: 'points'
		};

		test('Returns an array of 5 objects in ascending order with 1 tie', async () => {
			const rankings = await ranky(baseOpts);

			expect(rankings).toHaveLength(5);
			expect(rankings).toEqual(
				expect.arrayContaining(expected)
			)
		})
	});
});