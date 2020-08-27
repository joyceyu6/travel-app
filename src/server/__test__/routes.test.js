const request = require('supertest');
const app = require('../index');
const regeneratorRuntime = require("regenerator-runtime");

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/addWeather')
      .send({
        date: '2020-08-25',
        days: 1,
        stay:30,
        city: 'Paris',
        max_temp: 15,
        min_temp: 30,
        img: 'https://pixabay.com/get/57e0d74b4e52b10ff3d8992cc62f307a103edde74e5074407d2b7dd3944ec1_640.jpg'
      })
    expect(res.statusCode).toEqual(200);
  })
})