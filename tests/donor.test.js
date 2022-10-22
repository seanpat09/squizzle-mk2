const Donor = require(".././donor.js");
const utils = require(".././utils.js");
const MOCK_CLIENT = {
  say: jest.fn(),
};

const MOCK_DB = {
  defineTable: jest.fn(),
  STRING_TYPE: "STRING",
  DOUBLE_TYPE: "DOUBLE",
  resetTable: jest.fn(),
  create: jest.fn(),
  deleteOne: jest.fn(),
  findAll: jest.fn(),
};

const MOCK_CHANNEL_NAME = "squizzle-mock";

describe("Donor", () => {
  describe("constructor", () => {
    let donorHandler;
    beforeAll(() => {
      donorHandler = new Donor(MOCK_CLIENT, MOCK_DB);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("should initialize with a client", () => {
      expect(donorHandler.client).toBe(MOCK_CLIENT);
    });

    test("should initialize with a database", () => {
      expect(donorHandler.db).toBe(MOCK_DB);
    });

    test("should initialize villager table", () => {
      expect(donorHandler.db.defineTable).toBeCalledWith("Donor", "donors", {
        name: { type: MOCK_DB.STRING_TYPE },
        total_donations: { type: MOCK_DB.DOUBLE_TYPE },
      });
    });
  });

  describe("handling messages", () => {
    const MOCK_VILLAGERS = [{ name: "Hornsby" }, { name: "Ione" }];
    let donorHandler;
    beforeEach(() => {
      donorHandler = new Donor(MOCK_CLIENT, MOCK_DB);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("!adddonor", () => {
      describe("user is mod", () => {
        beforeAll(() => {
          utils.isMod = jest.fn().mockReturnValue(true);
        });

        describe("adding a new donor", () => {
          it("should add donor with value", () => {
            expect(true).toBe(false);
          });
        });

        describe("updating a donor", () => {
          it("should add donor with value", () => {
            expect(true).toBe(false);
          })
        });
        describe("donor amount is NaN", () => {
          it("should not add donor with value", () => {
            expect(true).toBe(false);
          })
        });
      });

      describe("user is not mod", () => {
        beforeAll(() => {
          utils.isMod = jest.fn().mockReturnValue(false);
        });
        it("should not add donor", async () => {
          expect(true).toBe(false);
        });
      });
    });

    describe("!remove", () => {
      describe("user is mod", () => {
        beforeAll(() => {
          utils.isMod = jest.fn().mockReturnValue(true);
        });

        describe("donor info is valid", () => {
          it("should remove donor", () => {
            expect(true).toBe(false);
          })
        });
      });

      describe("user is not mod", () => {
        beforeAll(() => {
          utils.isMod = jest.fn().mockReturnValue(false);
        });
        it("should not remove donor", async () => {
          expect(true).toBe(false);
        });
      });
    });

    describe("!donors", () => {
      describe("user is mod", () => {
        it("should displays donors with amounts", () => {
          expect(true).toBe(false);
        });
      });

      describe("user is not mod", () => {
        beforeEach(async () => {
          utils.isMod = jest.fn().mockReturnValue(false);
        });

        it("should displays donor amounts", () => {
          expect(true).toBe(false);
        });
      });
    });
  });
});
