const Pokemon = require(".././pokemon.js");
const utils = require(".././utils.js");

const MOCK_CLIENT = {
    say: jest.fn()
}

const MOCK_DB = {
    defineTable: jest.fn(),
    STRING_TYPE: "STRING",
    resetTable: jest.fn(),
    create: jest.fn(),
    deleteOne: jest.fn(),
    findAll: jest.fn()
}

const MOCK_CHANNEL_NAME = "squizzle-mock";

describe("Pokemon", () => {
    describe("constructor", () => {
        let pokemonHandler;
        beforeAll(() => {
            pokemonHandler = new Pokemon(MOCK_CLIENT, MOCK_DB);
        });
        
        afterAll(() => {
            jest.clearAllMocks();
        });
        
        test("should initialize with a client", () => {
            expect(pokemonHandler.client).toBe(MOCK_CLIENT);
        });

        test("should initialize with a database", () => {
            expect(pokemonHandler.db).toBe(MOCK_DB);
        });
    });

    describe("handling messages", () => {
        describe("!addpokemon", () => {
            describe("user is mod", () => {
                test("should add a pokemon", () => {
                    expect(true).toBe(false);
                });
            })

            describe("user is not mod", () => {
                test("should not add a pokemon", () => {
                    expect(true).toBe(false);
                });
            })
        });

        describe("!removepokemon", () => {
            describe("user is mod", () => {
                test("should start a pokemon encounter", () => {
                    expect(true).toBe(false);
                });
            })

            describe("user is not mod", () => {
                test("should not start a pokemon encounter", () => {
                    expect(true).toBe(false);
                });
            })
        });

        describe("!encounter", () => {
            test("should start a pokemon encounter", () => {
                expect(true).toBe(false);
            });
        });

        describe("!pokeball", () => {
            describe("encounter is active", () => {
                test("should track that pokeball was thrown", () => {
                    expect(true).toBe(false);
                });
    
                test("should only track one pokeball per user", () => {
                    expect(true).toBe(false);
                });
            })
            describe("encounter is not active", () => {
                test("should notify chat that pokemon encounter is not in progress", () => {
                    expect(true).toBe(false);
                });
            });

        });

        describe("!pokedex", () => {
            test("should display all pokemon caught", () => {
                expect(true).toBe(false);
            });
        });
    });
});