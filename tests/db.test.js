const Db = require("db.js");

const Sequelize = require("sequelize");
jest.mock("sequelize");

describe("Db", () => {
  let mockClient;

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("constructor", () => {
      test("constructor registration should instantiate with a client", () => {
        expect(aChannel.client).toBe(MOCK_CLIENT);
      });
    })

})
