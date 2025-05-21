const mockGetAll = jest.fn();
const request = require('supertest');
const { MongoClient } = require('mongodb');
const CreateApp = require('../src/app');
const { config } = require('../src/config');

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

jest.mock('../src/lib/mongo.lib.js', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

describe('Test for books endpoint', () => {
  let app = null;
  let server = null;
  let dataBase = null;
  beforeAll(async () => {
    app = CreateApp();
    server = app.listen(3000);
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    dataBase = client.db(DB_NAME);
  });

  afterAll(async () => {
    await server.close();
    await dataBase.dropDatabase();
  });

  describe('test for [GET] /api/v1/books', () => {
    test('should return an array', async () => {
      // Arrange
      const seedBook = await dataBase.collection('books').insertMany([
        {
          name: 'Book 1',
          price: 10,
          year: 2020,
          author: 'Author 1',
        },
        {
          name: 'Book 2',
          price: 20,
          year: 2021,
          author: 'Author 2',
        },
      ]);
      console.log(seedBook);
      // Act
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          // Assert
          expect(body.length).toEqual(seedBook.insertedCount);
        });
    });
  });
});
