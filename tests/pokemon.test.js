const Pokemon = require(".././pokemon.js");
const utils = require(".././utils.js");
const MOCK_CLIENT = {
  say: jest.fn(),
};

const MOCK_DB = {
  defineTable: jest.fn(),
  STRING_TYPE: "STRING",
  resetTable: jest.fn(),
  create: jest.fn(),
  deleteOne: jest.fn(),
  findAll: jest.fn(),
};

const MOCK_CHANNEL_NAME = "squizzle-mock";

describe("Pokemon", () => {
  let pokemonHandler;
  beforeAll(() => {
    pokemonHandler = new Pokemon(MOCK_CHANNEL_NAME, MOCK_CLIENT, MOCK_DB);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  describe("constructor", () => {
    it("should initialize with a client", () => {
      expect(pokemonHandler.client).toBe(MOCK_CLIENT);
    });

    it("should initialize with a database", () => {
      expect(pokemonHandler.db).toBe(MOCK_DB);
    });

    it("should initialize pokemon table", () => {
      expect(pokemonHandler.db.defineTable).toBeCalledWith(
        "Pokemon",
        "pokemon",
        {
          name: { type: MOCK_DB.STRING_TYPE },
        }
      );
    });
  });

  describe("mod commands", () => {
    describe("user is mod", () => {
      describe("bot is on", () => {
        it("should not activate bot", () => {
          expect(true).toBe(false);
        });

        it("should deactivate bot", () => {
          expect(true).toBe(false);
        });
      });

      describe("bot is off", () => {
        it("should activate bot", () => {
          expect(true).toBe(false);
        });

        it("should start encounter interval", () => {
          expect(true).toBe(false);
        });

        it("should not deactivate bot", () => {
          expect(true).toBe(false);
        });
      });

      describe("encounter in progress", () => {
        it("should not start an encounter", () => {
          expect(true).toBe(false);
        });
      });

      describe("encounter not in progress", () => {
        it("should start an encounter", () => {
          expect(true).toBe(false);
        });
      });
    });

    describe("user is not mod", () => {
      it("should not activate bot", () => {
        expect(true).toBe(false);
      });

      it("should not deactivate bot", () => {
        expect(true).toBe(false);
      });

      it("should start an encounter", () => {
        expect(true).toBe(false);
      });
    });
  });

  describe("encounters", () => {
    it("should set interval for encounters", () => {
      expect(true).toBe(false);
    });

    it("should let user throw pokeball", () => {
      expect(true).toBe(false);
    });

    it("should let user throw only 1 pokeball", () => {
      expect(true).toBe(false);
    });

    it("should store caught pokemon", () => {
      expect(true).toBe(false);
    });

    it("should say if pokemon got away", () => {
      expect(true).toBe(false);
    });
  });

  describe("pokedex", () => {
    it("should display all pokemon", () => {
      expect(true).toBe(false);
    });
  });
});
