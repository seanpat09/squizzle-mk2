const Db = require(".././db.js");

const Sequelize = require("sequelize");
jest.mock("sequelize");

describe("Db", () => {
  let db;

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("constructor", () => {
      test("constructor registration should instantiate with a client", () => {
        db = new Db(".test/testfile");
        Sequelize.mock.instances[0].authenticate = jest.fn().mockResolvedValue();
        expect(Sequelize).toBeCalledWith();
      });
    });
})
