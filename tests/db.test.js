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

  describe("database actions", () => {
    let mockTable;
    let mockRows = [{ name: "Test Row", destroy: jest.fn().mockResolvedValue() }];

    beforeEach(() => {
      mockTable = {
        create: jest.fn(),
        destroy: jest.fn(),
        findAll: jest.fn().mockResolvedValue(mockRows),
        findOne: jest.fn()
      };
      db = new Db(mockFileName);
      db.TestProperty = mockTable;
    });

    describe("create", () => {
      test("should create a row on the specified table with the passed in data", () => {
        const mockRow = { name: "testname" };
        db.create("TestProperty", mockRow);
        expect(mockTable.create).toBeCalledWith(mockRow);
      });
    });

    describe("resetTable", () => {
      test("should clear out specified table", () => {
        db.resetTable("TestProperty");
        expect(mockTable.destroy).toBeCalledWith({
          where: {},
          truncate: true
        });
      });
    });

    describe("findAll", () => {
      test("should find all rows for specified table", async () => {
        const returnedRows = await db.findAll("TestProperty");
        expect(mockTable.findAll).toBeCalled();
        expect(returnedRows).toBe(mockRows);
      });
    });

    describe("deleteOne", () => {
      describe("nothing is found", () => {
        test("it should not try to delete anything", async () => {
          mockTable.findOne.mockResolvedValue(null);
          await db.deleteOne("TestProperty", "Filter");
          expect(mockTable.findOne).toBeCalledWith({ where : "Filter" });
          expect(mockRows[0].destroy).not.toBeCalled();
        });
      });
      
      describe("a row is found", () => {
        test("it should delete the row", async () => {
          mockTable.findOne.mockResolvedValue(mockRows[0]);
          await db.deleteOne("TestProperty", "Filter");
          expect(mockTable.findOne).toBeCalledWith({ where : "Filter" });
          expect(mockRows[0].destroy).toBeCalled();
        });
      });
    })
  });
});
