const { generateManyBooks } = require('../fakes/book.fake');
const BooksService = require('./books.service');

const mockGetAll = jest.fn();

jest.mock('../lib/mongo.lib.js', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

// eslint-disable-next-line quotes
describe("BooksService", () => {
  let service;

  beforeEach(() => {
    service = new BooksService();
    jest.clearAllMocks();
  });

  // eslint-disable-next-line quotes
  describe("test for getBooks", () => {
    test('should return a list of books', async () => {
      // Arrange
      const fakeBooks = generateManyBooks(20);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      expect(books.length).toEqual(fakeBooks.length);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith('books', {});
    });

    test('should return an list of books', async () => {
      // Arrange
      const fakeBooks = generateManyBooks(4);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      expect(books[0].name).toEqual(fakeBooks[0].name);
    });
  });
});
