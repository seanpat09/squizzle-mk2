const Db = require(".././db.js");

const Sequelize = require("sequelize");
jest.mock("sequelize");

describe("Db", () => {
  let db;
  let mockSequelizeTable = {
    sync: jest.fn()
  };
  let defineMock = jest.fn(() => mockSequelizeTable);
  const mockFileName = ".test/testfile";
  let mockAuthenticate;

  beforeEach(() => {
    mockAuthenticate = jest.fn();
    mockAuthenticate.mockResolvedValue();
    Sequelize.prototype.authenticate = mockAuthenticate;
    Sequelize.prototype.define = defineMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    test("constructor registration should instantiate with a client", () => {
      db = new Db(mockFileName);
      expect(Sequelize).toBeCalledWith(
        "database",
        process.env.DB_USER,
        process.env.DB_PASS,
        {
          host: "0.0.0.0",
          dialect: "sqlite",
          pool: {
            max: 5,
            min: 0,
            idle: 10000
          },
          storage: mockFileName
        }
      );
    });

    test("constructor should authenticate to database", () => {
      db = new Db(mockFileName);
      expect(mockAuthenticate).toBeCalled();
    });
  });

  describe("defineTable", () => {
    test("should define a table ", () => {
      db = new Db(mockFileName);
      let propertyName = "testPropertyName";
      let tableName = "testTableName";
      let columns = {
        test: {
          type: db.STRING_TYPE
        }
      };
      db.defineTable(propertyName, tableName, columns);

      expect(defineMock).toBeCalledWith(tableName, columns);
      expect(mockSequelizeTable.sync).toBeCalled();
      expect(db[propertyName]).toBe(mockSequelizeTable);
    });
  });

  describe("create", () => {
    let mockTable = {
      create: jest.fn()
    }
    
    const mockRow = { name: "testname" };
    
    db = new Db(mockFileName);
    db.TestProperty = mockTable;
    
    db.create("TestProperty", mockRow);
    expect(mockTable.create).toBeCalledWith("TestProperty", mockRow);
  });
  
  describe("resetTable", () => {
    
  });
});
