const mockGetAll = jest.fn();
const request = require('supertest');
const { generateManyBooks } = require('../src/fakes/book.fake');
const CreateApp = require('../src/app');

jest.mock('../src/lib/mongo.lib.js', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

describe('Test for books endpoint', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = CreateApp();
    server = app.listen(3000);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('test for [GET] /api/v1/books', () => {
    test('should return an array', () => {
      // Arrange
      const fakeBooks = generateManyBooks(3);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body.length).toEqual(fakeBooks.length);
        });
    });
  });
});
