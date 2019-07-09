const request = require('supertest')
const app = require('../src/app')

test('Search Records Simple', () => {
    request(app).post('/records').send({
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": 3000
    }).expect(200);
});