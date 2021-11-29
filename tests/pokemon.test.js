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
        const MOCK_WILD_POKEMON = [
            {name: "Farfetch'd"},
            {name: "Herdier"}
        ];

        let pokemonHandler;
        beforeEach(() => {
            pokemonHandler = new Pokemon(MOCK_CLIENT, MOCK_DB);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        describe("!addpokemon", () => {
            describe("user is mod", () => {
                beforeEach(async () => {
                    utils.isMod = jest.fn().mockReturnValue(true);
                    MOCK_DB.findAll.mockReturnValue(MOCK_WILD_POKEMON);
                    await pokemonHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!addpokemon Lillipup");
                });
                test("should add a pokemon", () => {
                    expect(pokemonHandler.db.create).toBeCalledWith("Pokemon", {"name": "Lillipup"});
                });

                test("should display pokemon in the wild", () => {
                    expect(pokemonHandler.db.findAll).toBeCalled();
                });
            })

            describe("user is not mod", () => {
                beforeAll(async () => {
                    utils.isMod = jest.fn().mockReturnValue(false);
                    MOCK_DB.findAll.mockReturnValue(MOCK_WILD_POKEMON);
                    await pokemonHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!addpokemon Lillipup");
                });
                test("should add a pokemon", () => {
                    expect(pokemonHandler.db.create).not.toBeCalled();
                });
            })
        });


        describe("!viewwildpokemon", () => {
            beforeEach(async () => {
                MOCK_DB.findAll.mockReturnValue(MOCK_WILD_POKEMON);
                await pokemonHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!viewwildpokemon");
            });

            test("should display pokemon in the wild", () => {
                expect(pokemonHandler.db.findAll).toBeCalledWith("Pokemon");
                expect(pokemonHandler.client.say).toBeCalledWith(
                    MOCK_CHANNEL_NAME,
                    "The following pokemon are in the wild!: Farfetch'd, Herdier"
                );
            });
        });

        describe("!removepokemon", () => {
            describe("user is mod", () => {
                beforeEach(async () => {
                    utils.isMod = jest.fn().mockReturnValue(true);
                    MOCK_DB.findAll.mockReturnValue(MOCK_WILD_POKEMON);
                    await pokemonHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!removepokemon Lillipup");
                });
                test("should remove a pokemon", () => {
                    expect(pokemonHandler.db.deleteOne).toBeCalledWith("Pokemon", {"name": "Lillipup"});
                });
            })

            describe("user is not mod", () => {
                beforeAll(async () => {
                    utils.isMod = jest.fn().mockReturnValue(false);
                    MOCK_DB.findAll.mockReturnValue(MOCK_WILD_POKEMON);
                    await pokemonHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!addpokemon Lillipup");
                });
                test("should add a pokemon", () => {
                    expect(pokemonHandler.db.deleteOne).not.toBeCalled();
                });
            })
        });

        describe("!encounter", () => {
            beforeEach(async () => {
                utils.isMod = jest.fn().mockReturnValue(true);
                MOCK_DB.findAll.mockReturnValue([{name: "Piplup"}]);
                await pokemonHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!encounter");
            });

            test("should start a pokemon encounter by announcing pokemon", () => {
                expect(pokemonHandler.client.say).toBeCalledWith(
                    MOCK_CHANNEL_NAME,
                    "A wild Piplup appeared!"
                );

                expect(pokemonHandler.encounteredPokemon).toBe("Piplup");

                expect(pokemonHandler.encounterActive).toBeTruthy();
            });

            test("should not be able to start another encounter", async () => {
                pokemonHandler.encounterActive = true;
                await pokemonHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!encounter");
                expect(pokemonHandler.client.say).toBeCalledWith(
                    MOCK_CHANNEL_NAME,
                    "BOP we are already in an encounter!"
                );

                expect(pokemonHandler.db.findAll).toBeCalledTimes(1);
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