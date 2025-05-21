const request = require('supertest');

const CreateApp = require('../src/app');

describe('Test for hello endpoint', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = CreateApp();
    server = app.listen(3000);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('test for [GET] /', () => {
    test('should return "Hello World!"', () => request(app)
      .get('/')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual('Hello World!');
      }));
  });
});
