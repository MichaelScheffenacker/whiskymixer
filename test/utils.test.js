const utils = require('../utils');

describe('Test', () => {
    test('tt', () => {
        let result = utils.test();
        expect(result).toBe(2);
    });
});